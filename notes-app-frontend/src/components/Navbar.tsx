import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        NoteNest 📒
      </Link>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="text-gray-700 p-3 hover:text-indigo-500 transition"
        >
          Log-in
        </Link>
        <Link
          to="/register"
          className="text-white-700 bg-indigo-600 p-3 hover:text-indigo-200 transition rounded"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}
export default Navbar
