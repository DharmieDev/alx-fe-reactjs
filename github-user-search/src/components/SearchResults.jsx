import { useUserStore } from '../store/useUserStore'

export default function SearchResults() {
  // ✅ subscribe to only the pieces you need
  const username   = useUserStore((s) => s.username)
  const userData   = useUserStore((s) => s.userData)
  const error      = useUserStore((s) => s.error)
  const isLoading  = useUserStore((s) => s.isLoading)

  // ✅ grab setters & actions
  const setUsername = useUserStore((s) => s.setUsername)
  const fetchUser   = useUserStore((s) => s.fetchUser)

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUser()
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="border p-4 rounded shadow">
          {/* …same rendering as before… */}
        </div>
      )}
    </div>
  )
}