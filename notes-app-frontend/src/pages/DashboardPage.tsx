import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import NoteForm from '../components/NoteForm'
import NoteCard from '../components/NoteCard'

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
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)
  const token = localStorage.getItem('token')

  const handleAddNote = async (title: string, content: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setNotes((prev) => [response.data, ...prev])
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }

  const handleUpdateNote = async (
    title: string,
    content: string,
    id?: number
  ) => {
    if (!id) return

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? response.data : n))
      )
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes((prev) => prev.filter((note) => note.id !== id))
    } catch (error) {
      console.log('Failed to delete note:', error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setUser(userResponse.data)
      } catch (error) {
        console.log('Failed to fect User', error)
      }
    }
    fetchUser()

    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
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
          Welcome, {user?.name}🖖 <br /> Your Notes
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
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={(note) => {
                  setSelectedNote(note)
                  setShowEditForm(true)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <NoteForm
          mode="create"
          onSubmit={(title, content) => {
            handleAddNote(title, content)
            setShowForm(false)
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Form */}
      {showEditForm && selectedNote && (
        <NoteForm
          mode="edit"
          note={selectedNote}
          onSubmit={(title, content, id) => {
            handleUpdateNote(title, content, id)
            setShowEditForm(false)
            setSelectedNote(null)
          }}
          onClose={() => {
            setShowEditForm(false)
            setSelectedNote(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard
