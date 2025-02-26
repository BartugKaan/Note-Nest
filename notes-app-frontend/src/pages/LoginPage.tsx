import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email('Invalid Email Address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
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
        'http://localhost:5005/api/auth/login',
        data
      )
      localStorage.setItem('token', response.data.token) // Save Token with Local Storage
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center">📒</h2>
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Welcome to NoteNest
        </h2>
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Login
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
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
