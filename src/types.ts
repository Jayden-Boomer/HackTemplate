export type RGBColor = { r: number, g: number, b: number };//`rgb(${number}, ${number}, ${number})`;
export type userData = { color: RGBColor };
export type usersCSVLine = { username: string, password: number, data: userData };
