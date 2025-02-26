import Navbar from '../components/Navbar'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../assets/hero_Animation.json'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-16">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Organize Your <span className="text-yellow-300">Notes</span> Easily
            📝
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Capture your ideas, structure your tasks, and access your notes
            securely anytime, anywhere.
          </p>
        </div>

        <div className="m:flex-1 lg:block">
          <Player autoplay loop src={animationData} className="w-96 h-96" />
        </div>
      </div>

      <div className="py-16 px-6 bg-white text-gray-800">
        <h3 className="text-3xl font-bold text-center mb-8">
          Why Choose Notes App? 🤔
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Fast & Secure</h4>
            <p className="text-gray-600">
              Your notes are securely stored and can be accessed quickly
              whenever you need them.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Easy to Use</h4>
            <p className="text-gray-600">
              Simple and user-friendly interface makes note-taking a breeze.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2">Access Anywhere</h4>
            <p className="text-gray-600">
              Sync your notes across multiple devices and never lose your ideas.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-8">How It Works? 🔥</h3>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">1. Sign Up</h4>
            <p className="text-gray-300">
              Create an account in just a few seconds.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">2. Add Notes</h4>
            <p className="text-gray-300">
              Start organizing your thoughts and tasks.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">3. Stay Organized</h4>
            <p className="text-gray-300">
              Access and manage your notes from anywhere.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>&copy; {new Date().getFullYear()} NoteNest. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
