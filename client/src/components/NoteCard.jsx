import { useState } from 'react';

const API_URL = 'http://localhost:5000/api/notes';

function NoteCard({ note, onDelete, onSummaryUpdate }) {
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState(note.summary || '');

  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      const res = await fetch(`${API_URL}/${note._id}/summarize`, {
        method: 'POST',
      });
      const data = await res.json();
      setSummary(data.summary);
      if (onSummaryUpdate) onSummaryUpdate(note._id, data.summary);
    } catch (err) {
      console.error('Failed to summarize:', err);
      alert('Failed to generate summary. Check your API key / server logs.');
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p className="note-subject">{note.subject}</p>
      <p className="note-content">{note.content}</p>

      <button onClick={handleSummarize} disabled={summarizing} className="summarize-btn">
        {summarizing ? 'Summarizing...' : '✨ Summarize'}
      </button>

      {summary && (
        <div className="note-summary">
          <pre>{summary}</pre>
        </div>
      )}

      <button onClick={() => onDelete(note._id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
}

export default NoteCard;