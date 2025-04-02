import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import NoteForm from '../components/NoteForm'

type Note = {
  id: number
  title: string
  content: string
  createdAt: string
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('token')

  const handleAddNote = async (title: string, content: string) => {
    try {
      const response = await axios.post(
        'http://localhost:5005/api/notes',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setNotes((prev) => [response.data, ...prev])
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setNotes(response.data)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Your Notes
        </h2>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow-md transition"
          >
            + Add Note
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-600">
            You have no notes yet. Start adding some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-yellow-300 text-gray-800 rounded-lg shadow-md transform hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p className="text-sm mt-2">{note.content}</p>
                <p className="text-xs text-gray-600 mt-4">
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NoteForm Modal */}
      {showForm && (
        <NoteForm
          onSubmit={(title, content) => {
            handleAddNote(title, content)
            setShowForm(false)
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
