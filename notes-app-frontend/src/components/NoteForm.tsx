import { useState } from 'react'

type NoteFormProps = {
  onSubmit: (title: string, content: string) => void
  onClose: () => void
}

const NoteForm = ({ onSubmit, onClose }: NoteFormProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!title || !content) return
    onSubmit(title, content)
    setTitle('')
    setContent('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-600">Add New Note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Note Title"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Note
        </button>
      </div>
    </div>
  )
}

export default NoteForm
