import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import type { RGBColor, usersCSVLine, userData } from "../../public_facing/src/types";


export const serverApp = express();
serverApp.use(cors());
serverApp.use(express.json());
const PORT = process.env.SERVER_PORT ?? 3000;
const SERVER_BASE_URL = process.env.SERVER_BASE_URL ?? "/api"
// Middleware to parse JSON bodies
// app.use(bodyParser.json());

// Serve static files from the "public" folder
// app.use(express.static("public"));

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the users CSV file
const csvFilePath = path.join(__dirname, "users.csv");

// Ensure CSV file exists with headers
if (!fs.existsSync(csvFilePath)) {
	fs.writeFileSync(csvFilePath, "Username,Password,Data\n", "utf8");
}

function getRandomColor(): RGBColor {
	return {
		r: Math.round(Math.random() * 255),
		g: Math.round(Math.random() * 255),
		b: Math.round(Math.random() * 255),
	};
}

async function getFormattedUserCSVLines(
	filePath: string
): Promise<usersCSVLine[]> {
	const fileContent = fs.readFileSync(filePath, "utf8");
	return new Promise((resolve, reject) => {
		parse(fileContent, {
				columns: true, // Treat the first row as column headers
				skip_empty_lines: true,
			},
			(err, records: usersCSVLine[]) => {
				if (err) return reject(err);
				resolve(records);
			}
		);
	});
}

async function parseCSV(
	filePath: string,
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(filePath).pipe(
			parse({
				columns: true,
				skip_empty_lines: true,
			})
		)
		.on("data", (row: usersCSVLine) => {
			// parameter function (onData) here
		})
		.on("end", () => {
			// parameter function (onEnd) here
		})
		.on("error", (err: Error) => {
			// parameter function (onError) here
		});
	});
}



async function csvContainsUsername(
	filePath: string,
	targetUsername: string
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(filePath).pipe(
			parse({
				columns: true,
				skip_empty_lines: true,
			})
		)
		.on("data", (row: usersCSVLine) => {
			if (row.username === targetUsername) {
				// Stop reading the file early
				stream.destroy();
				resolve(true);
			}
		})
		.on("end", () => {
			resolve(false); // username not found
		})
		.on("error", (err: Error) => {
			reject(err);
		});
	});
}

export function makeEndpointURL(endpointName: string): string {
	return `${SERVER_BASE_URL}/${endpointName}`
}

// Sign Up Endpoint: Add user if they do not already exist.
serverApp.post(makeEndpointURL("signup"), async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Username and password are required" });
	}

	if (await csvContainsUsername(csvFilePath, username)) {
		return res.status(409).json({ error: "User already exists" });
	}

	const randomColor: RGBColor = getRandomColor();
	const userData: userData = { color: randomColor };
	// Enclose the color in quotes to avoid comma issues in CSV
	const csvLine = `${username},${password},${userData}\n`;
	// Inside your /signup endpoint after writing to the CSV file
	fs.appendFile(csvFilePath, csvLine, (err) => {
		if (err) {
			console.error("Error writing to CSV file:", err);
			return res.status(500).json({ error: "Internal server error" });
		}
	});

	res.json({
		message: "User signed up successfully",
	});

	// Read the CSV file to check for existing user
	// fs.readFile(csvFilePath, "utf8", (err, data) => {
	// 	if (err) {
	// 		console.error("Error reading CSV file:", err);
	// 		return res.status(500).json({ error: "Internal server error" });
	// 	}

	// 	const lines = data.split("\n").slice(1); // get an array of file lines, excluding the header
	// 	for (const line of lines) {
	// 		if (!line.trim()) continue; // Skip empty lines
	// 		// Since the color field contains commas, only split the first two commas
	// 		const parts = line.split(",");
	// 		const fileUsername = parts[0];
	// 		if (fileUsername === username) {
	// 			return res.status(409).json({ error: "User already exists" });
	// 		}
	// 	}

	// 	const randomColor = getRandomColor();
	// 	// Enclose the color in quotes to avoid comma issues in CSV
	// 	const csvLine = `${username},${password},"${randomColor}"\n`;
	// 	// Inside your /signup endpoint after writing to the CSV file
	// 	fs.appendFile(csvFilePath, csvLine, (err) => {
	// 		if (err) {
	// 			console.error("Error writing to CSV file:", err);
	// 			return res.status(500).json({ error: "Internal server error" });
	// 		}
	// 	});

	// 	res.json({
	// 		message: "User signed up successfully",
	// 		color: randomColor,
	// 	});
	// });
});

// Sign In Endpoint: Validate user credentials and return stored color.
serverApp.post(makeEndpointURL("signin"), async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ error: "Username and password are required" });
	}


	fs.createReadStream(csvFilePath).pipe(
			parse({
				columns: true,
				skip_empty_lines: true,
			})
		)
		.on("data", (row: usersCSVLine) => {
			if (row.username === username) {
				if (row.password === password) {
					// Stop reading the file early
					return res.json({
						message: "User signed in successfully"
					});
				}
				return res.status(401).json({ error: "Incorrect password" });
			}
		})
		.on("end", () => {
			return res.status(401).json({ error: "User not found" });
		})
		.on("error", (err: Error) => {
			return res.status(500).json({ error: 'Internal server error' });
		});

	// fs.readFile(csvFilePath, "utf8", (err, data) => {
	// 	if (err) {
	// 		console.error("Error reading CSV file:", err);
	// 		return res.status(500).json({ error: "Internal server error" });
	// 	}

	// 	const lines = data.split("\n").slice(1); // Skip header
	// 	let userFound = false;
	// 	let userColor = "";

	// 	for (const line of lines) {
	// 		if (!line.trim()) continue; // Skip empty lines
	// 		// Split only on the first two commas; the rest belongs to the color field
	// 		const parts = line.split(",");
	// 		const fileUsername = parts[0];
	// 		const filePassword = parts[1];
	// 		// Join the rest back in case the color field contained commas
	// 		const fileColorRaw = parts.slice(2).join(",").trim();
	// 		// Remove enclosing quotes from the color field if present
	// 		const fileColor = fileColorRaw.replace(/^"|"$/g, "");

	// 		if (fileUsername === username && filePassword === password) {
	// 			userFound = true;
	// 			userColor = fileColor;
	// 			res.json({
	// 				message: "User signed in successfully",
	// 				color: userColor,
	// 			});
	// 			return;
	// 		}
	// 	}

	// 	res.status(401).json({ error: "Invalid username or password" });
	// });
});

serverApp.post(makeEndpointURL("chatbot-submit"), (req, res) => {
	const { message } = req.body;
	if (!message) {
		return res
			.status(400)
			.json({ error: "Please enter something into the chat" });
	}

	res.json({ message: "Successfully submitted chat" });
});

serverApp.post(makeEndpointURL("echo"), (req, res) => {
  res.json({ youSent: req.body });
});

// app.post("/upload-file", async (req, res) => {
// 	const { fileContents, userName, category } = req.body;
// 	if (!fileContents || !userName || !category) {
// 		return res.status(400).json({
// 			error: "fileContents, userName, and category are required.",
// 		});
// 	}
// 	try {
// 		const uploadResult = await pinataFunctions.uploadUserFile(
// 			fileContents,
// 			userName,
// 			category
// 		);
// 		res.json({ message: "File uploaded successfully", uploadResult });
// 	} catch (error) {
// 		console.error("Upload error:", error);
// 		res.status(500).json({ error: "File upload failed" });
// 	}
// });

// app.get("/get-file", async (req, res) => {
// 	const { userName, category } = req.query;
// 	if (!userName || !category) {
// 		return res
// 			.status(400)
// 			.json({ error: "userName and category are required." });
// 	}
// 	try {
// 		const fileData = await pinataFunctions.fetchFileByUserNameAndCategory(
// 			userName,
// 			category
// 		);
// 		if (fileData) {
// 			res.json({ message: "File fetched successfully", fileData });
// 		} else {
// 			res.status(404).json({ message: "File not found" });
// 		}
// 	} catch (error) {
// 		console.error("Fetch error:", error);
// 		res.status(500).json({ error: "Error fetching file" });
// 	}
// });

serverApp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`);
});
