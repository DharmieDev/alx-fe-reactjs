import { create } from 'zustand';
import { fetchUserData } from '../services/githubService';

export const useGitHubUserStore = create((set, get) => ({
  // state
  input: '',          // the current input value
  user: null,         // fetched user data
  loading: false,
  error: '',

  // setters
  setInput: (value) => set({ input: value }),
  clear: () => set({ input: '', user: null, loading: false, error: '' }),

  // action: perform search
  searchUser: async () => {
    const { input } = get();
    // reset previous
    set({ user: null, error: '' });

    if (!input || !input.trim()) {
      set({ error: 'Please enter a username.' });
      return;
    }

    set({ loading: true, error: '' });
    try {
      const data = await fetchUserData(input);
      set({ user: data });
    } catch (err) {
      set({ user: null, error: err.message || "Looks like we can't find the user" });
    } finally {
      set({ loading: false });
    }
  },
}));
