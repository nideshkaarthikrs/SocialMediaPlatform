import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-svh bg-slate-950 p-6 text-slate-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-violet-500 hover:bg-slate-800"
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default Home