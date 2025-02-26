import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

type RegisterForm = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      await axios.post('http://localhost:5005/api/auth/register', data)
      navigate('/login') // Başarılı olunca login sayfasına yönlendir
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.')
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
          Create an Account
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
