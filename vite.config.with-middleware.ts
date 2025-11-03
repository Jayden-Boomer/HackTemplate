import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import type { RGBColor, usersCSVLine, userData } from './src/types.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Path to the users CSV file
const csvFilePath = path.join(__dirname, 'users.csv')

// Ensure CSV file exists with headers
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, 'Username,Password,Data\n', 'utf8')
}

function getRandomColor(): RGBColor {
  return {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
  }
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
    .on('data', (row: usersCSVLine) => {
      if (row.username === targetUsername) {
        stream.destroy()
        resolve(true)
      }
    })
    .on('end', () => {
      resolve(false)
    })
    .on('error', (err: Error) => {
      reject(err)
    })
  })
}

// Vite plugin that adds API routes via middleware
function apiPlugin() {
  return {
    name: 'api-routes',
    configureServer(server) {
      // Create Express app for API routes
      const apiApp = express()
      apiApp.use(bodyParser.json())

      // Sign Up Endpoint
      apiApp.post('/signup', async (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
          return res
            .status(400)
            .json({ error: 'Username and password are required' })
        }

        if (await csvContainsUsername(csvFilePath, username)) {
          return res.status(409).json({ error: 'User already exists' })
        }

        const randomColor: RGBColor = getRandomColor()
        const userData: userData = { color: randomColor }
        const csvLine = `${username},${password},${userData}\n`
        
        fs.appendFile(csvFilePath, csvLine, (err) => {
          if (err) {
            console.error('Error writing to CSV file:', err)
            return res.status(500).json({ error: 'Internal server error' })
          }
        })

        res.json({
          message: 'User signed up successfully',
        })
      })

      // Sign In Endpoint
      apiApp.post('/signin', async (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
          return res
            .status(400)
            .json({ error: 'Username and password are required' })
        }

        fs.createReadStream(csvFilePath).pipe(
          parse({
            columns: true,
            skip_empty_lines: true,
          })
        )
        .on('data', (row: usersCSVLine) => {
          if (row.username === username) {
            if (row.password === password) {
              return res.json({
                message: 'User signed in successfully'
              })
            }
            return res.status(401).json({ error: 'Incorrect password' })
          }
        })
        .on('end', () => {
          return res.status(401).json({ error: 'User not found' })
        })
        .on('error', (err: Error) => {
          return res.status(500).json({ error: 'Internal server error' })
        })
      })

      // GPT Submit Endpoint
      apiApp.post('/gpt-submit', (req, res) => {
        const { message } = req.body
        if (!message) {
          return res
            .status(400)
            .json({ error: 'Please enter something into the chat' })
        }

        res.json({ message: 'Successfully submitted chat' })
      })

      // Use the Express app as Vite middleware
      server.middlewares.use(apiApp)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), apiPlugin()],
})

