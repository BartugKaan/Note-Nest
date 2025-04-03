import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogin(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogin(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link
        to={isLogin ? '/dashboard' : '/'}
        className="text-2xl font-bold text-indigo-600"
      >
        NoteNest 📒
      </Link>
      {isLogin ? <LogoutButton onLogout={handleLogout} /> : <LoginButtons />}
    </nav>
  )
}

const LoginButtons = () => {
  return (
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
  )
}

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="flex space-x-4 text-white">
      <button
        onClick={onLogout}
        className="text-white-700 bg-red-800 p-3 hover:bg-red-500 transition rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
