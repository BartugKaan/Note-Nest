import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../assets/hero_Animation.json'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-row justify-center items-center text-center mx-5">
        <div className="flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">
            Organize Your Notes Easily 📝
          </h2>
          <p className="text-gray-600 max-w-xl mb-8">
            Capture your ideas, organize your tasks, and acess your notes
            securely anytime and anywhere.
          </p>
        </div>
        <Player autoplay loop src={animationData} className="w-80 h-80 my-6" />
      </div>
    </div>
  )
}

export default LandingPage
