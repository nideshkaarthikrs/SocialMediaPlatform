import { useEffect, useState } from 'react'
import axiosInstance from '../axiosCalls/axios.js'
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
  const { username } = useParams()
  const [userData, setUserData] = useState(null)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      setLoader(true)
      setError('')

      try {
        const { data } = await axiosInstance.get(`/users/profile/${username}`)
        setUserData(data.user)
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load this profile.')
      } finally {
        setLoader(false)
      }
    }

    fetchProfile()
  }, [username])

  const initials = userData?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <main className="min-h-svh bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-violet-300"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-violet-950/20">
          <div className="relative h-36 overflow-hidden bg-slate-900 sm:h-44">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.5),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.3),transparent_50%)]" />
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full border border-violet-400/20" />
            <div className="absolute -bottom-48 -left-12 h-72 w-72 rounded-full border border-cyan-400/10" />
          </div>

          {loader && (
            <div className="space-y-5 px-6 pb-8 pt-16 sm:px-10">
              <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-800" />
              <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-slate-800" />
            </div>
          )}

          {!loader && error && (
            <div className="px-6 py-12 text-center sm:px-10">
              <p className="text-lg font-medium text-white">Profile unavailable</p>
              <p className="mt-2 text-sm text-slate-400">{error}</p>
            </div>
          )}

          {!loader && !error && userData && (
            <div className="relative px-6 pb-8 sm:px-10">
              <div className="-mt-14 flex flex-col items-start gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-8 border-slate-900 bg-gradient-to-br from-violet-500 to-cyan-500 text-3xl font-bold text-white shadow-xl shadow-violet-950/40 sm:h-32 sm:w-32">
                  {initials || '?'}
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  Active member
                </span>
              </div>

              <div className="mt-5">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  {userData.name}
                </h1>
                <p className="mt-1 text-slate-400">@{userData.username}</p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                  Welcome to {userData.name}&apos;s profile. Connect, follow along, and
                  share what matters.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 divide-x divide-slate-800 rounded-2xl border border-slate-800 bg-slate-950/50 py-4 sm:max-w-lg">
                <div className="px-4 text-center">
                  <p className="text-2xl font-semibold text-white">
                    {userData.posts?.length ?? 0}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    Posts
                  </p>
                </div>
                <div className="px-4 text-center">
                  <p className="text-2xl font-semibold text-white">
                    {userData.followers?.length ?? 0}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    Followers
                  </p>
                </div>
                <div className="px-4 text-center">
                  <p className="text-2xl font-semibold text-white">
                    {userData.followings?.length ?? 0}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    Following
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  @
                </span>
                <span>{userData.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Profile