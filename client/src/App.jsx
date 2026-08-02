import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import './App.css';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Fetch notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const newNote = await res.json();
      setNotes([newNote, ...notes]);
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🧠 StudyMate</h1>
      <p className="tagline">Your AI-powered study notes app</p>

      <NoteForm onAddNote={handleAddNote} />

      <input
        type="text"
        placeholder="Search by title or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {loading ? (
        <p className="status-msg">Loading notes...</p>
      ) : filteredNotes.length === 0 ? (
        <p className="status-msg">No notes yet — add your first one!</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;