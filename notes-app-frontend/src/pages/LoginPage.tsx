import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      )
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="text-white">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center text-white p-12">
          <h2 className="text-4xl font-extrabold">Welcome Back!</h2>
          <p className="text-lg text-center mt-4 max-w-md">
            Log in to continue managing your notes efficiently.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              User Login
            </h2>

            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={isPasswordHidden ? 'password' : 'text'}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                    className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                  >
                    {isPasswordHidden ? 'Show' : 'Hide'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
