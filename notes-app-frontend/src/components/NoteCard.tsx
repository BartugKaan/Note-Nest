import Note from '../types/Note'

type NoteCardProps = {
  note: Note
  onDelete: (id: number) => void
  onEdit: (note: Note) => void
}

const NoteCard = ({ note, onDelete, onEdit }: NoteCardProps) => {
  return (
    <div className="p-4 bg-yellow-300 text-gray-800 rounded-lg shadow-md transform hover:scale-105 transition relative">
      <h3 className="text-xl font-semibold">{note.title}</h3>
      <p className="text-sm mt-2">{note.content}</p>
      <p className="text-xs text-gray-600 mt-4">
        Created: {new Date(note.createdAt).toLocaleDateString('en-GB')}
      </p>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onEdit(note)}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard
