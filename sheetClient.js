const { google } = require("googleapis");
const key = require("./secrets.json");

const SHEET_ID = "1e0LVQGWxSNtwtIaGRIqnBXFttMY5sNbo_Dd8H9A5rtY";
module.exports = SHEET_ID;

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize();

const sheets = google.sheets({ version: "v4", auth: client });

module.exports = sheets;
