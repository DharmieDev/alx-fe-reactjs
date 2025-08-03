import { create } from 'zustand'
import { fetchGitHubUser } from '../services/githubService'

export const useUserStore = create((set, get) => ({
  // ✏️ state
  username: '',
  userData: null,
  error: '',
  isLoading: false,

  // 🖋 setters
  setUsername: (name) => set({ username: name }),
  clear: () => set({ userData: null, error: '', isLoading: false }),

  setError: (msg) => set({ error: msg }),

  setUserData: (data) => set({ userData: data }),

  setLoading: (loading) => set({ isLoading: loading }),

  // 🚀 async action
  fetchUser: async () => {
    const { username, setError, setUserData, setLoading } = get()
    if (!username) {
      setError('Please enter a username.')
      return
    }

    try {
      setLoading(true)
      setError('')            // clear previous errors
      const data = await fetchGitHubUser(username)
      setUserData(data)
    } catch (err) {
      setUserData(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  },
}))