# 🧠 StudyMate — AI-Powered Study Notes App

A full-stack study notes app where you can create, search, and manage notes, get AI-generated summaries, and even manage notes directly from Claude Desktop via a custom MCP server.

## Tech Stack

- **Landing page:** HTML, CSS, vanilla JavaScript
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI Integration:** Google Gemini (`gemini-2.5-flash`)
- **MCP Server:** Node.js MCP server (stdio transport) for Claude Desktop integration

> **Note on AI provider:** This project uses Google Gemini instead of Claude/OpenAI for the summarize feature, due to Anthropic/OpenAI account credit constraints during development. The code is structured so swapping back to Claude (Anthropic SDK) or OpenAI only requires changing the API client and model call in `server/server.js` — the rest of the app (schema, routes, frontend) is provider-agnostic.

## Project Structure
studymate/
├── landing/ # Part 1 — HTML/CSS/JS landing page
│ ├── index.html
│ ├── style.css
│ └── script.js
├── client/ # Part 2 — React frontend
│ └── src/
│ ├── components/
│ │ ├── NoteForm.jsx
│ │ └── NoteCard.jsx
│ ├── App.jsx
│ └── App.css
├── server/ # Parts 3 & 4 — Express + MongoDB + AI
│ ├── server.js
│ └── .env.example
├── mcp-server/ # Part 5 — MCP server
│ └── index.js
└── README.md

## Setup Instructions

### 1. Backend (`server/`)

```bash
cd server
npm install
```

Create a `.env` file (see `.env.example`) with:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
Run the server:
```bash
node server.js
```
Server runs on `http://localhost:5000`.

### 2. Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```
App runs on `http://localhost:5173`.

### 3. Landing Page (`landing/`)

Open `landing/index.html` directly in your browser — no server required.

### 4. MCP Server (`mcp-server/`)

```bash
cd mcp-server
npm install
```

Make sure the Express server (`server/`) is running first, since the MCP server calls its API.

To connect it to Claude Desktop, add this to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "studymate": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO/studymate/mcp-server/index.js"]
    }
  }
}
```

Restart Claude Desktop, then ask: *"What notes do I have?"* or *"Add a note about React hooks"*.

## Features

- **Landing page** with hero section, feature cards, and a dark mode toggle
- **Notes CRUD**: create, view, search, and delete notes
- **AI Summarize**: generates a 3-bullet summary + 1 quiz question per note
- **MCP tools**: `list_notes` and `create_note`, usable from Claude Desktop

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/notes` | Fetch all notes |
| POST | `/api/notes` | Create a note |
| DELETE | `/api/notes/:id` | Delete a note |
| POST | `/api/notes/:id/summarize` | Generate AI summary + quiz question |

## Screenshots

_<img width="1920" height="1080" alt="Screenshot (577)" src="https://github.com/user-attachments/assets/1da23974-087d-4995-ae37-64c50dc61205" />
<img width="1920" height="1080" alt="Screenshot (578)" src="https://github.com/user-attachments/assets/01649469-b1aa-4e69-8d26-8913fa80b8e3" />

