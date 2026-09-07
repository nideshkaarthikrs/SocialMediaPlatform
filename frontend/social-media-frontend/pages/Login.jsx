import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../axiosCalls/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {

    const [form, setForm] = useState({
        email: "", 
        password: ""
    })

    const [err, setErr] = useState("")

    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const { setUser } = useAuth()

    const handleChange = (e) => {
        setForm((prevData) => ({...prevData, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")
        setLoader(true)

        try {
            const { data } = await axiosInstance.post("/users/login", form)
            setUser(data.user)
            navigate('/home')
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Login failed"
            setErr(message)
        } finally {
            setLoader(false)
        }
    }

  return (
    <main className="min-h-svh bg-slate-950 text-slate-100">
      <div className="grid min-h-svh lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.35),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.2),transparent_40%)]" />
          <div className="relative">
            <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Pulse</p>
          </div>
          <div className="relative max-w-md space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Welcome back to your circle.
            </h1>
            <p className="text-lg leading-relaxed text-slate-300">
              Pick up conversations, share what is happening, and stay close to the people who matter.
            </p>
          </div>
          <p className="relative text-sm text-slate-400">A quieter place to be social.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Pulse</p>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">Log in</h2>
            <p className="mt-2 text-slate-400">Enter your details to continue.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  value={form.email}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={form.password}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                />
              </label>

              {err && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                >
                  {err}
                </p>
              )}

              <button
                type="submit"
                disabled={loader}
                className="w-full rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loader ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-8 text-center text-slate-400">
              No account, then{' '}
              <Link
                to="/signup"
                className="font-medium text-violet-300 underline-offset-4 transition hover:text-violet-200 hover:underline"
              >
                sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
