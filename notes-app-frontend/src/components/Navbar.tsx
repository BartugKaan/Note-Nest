import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600"> Note App 📒</h1>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-indigo-500 transitiyon"
        >
          Log-in
        </Link>
        <Link
          to="/register"
          className="text-gray-700 hover:text-indigo-500 transitiyon"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}
export default Navbar
