import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional, from .env

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
  },
  timeout: 10000,
});

// Centralized error handling: unwrap GitHub errors into friendly messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, headers, data } = error.response;
      if (status === 404) {
        return Promise.reject(new Error("Looks like we can't find the user"));
      }
      if (status === 403 && headers['x-ratelimit-remaining'] === '0') {
        return Promise.reject(new Error('Rate limit exceeded. Try again later or add a token.'));
      }
      if (data && data.message) {
        return Promise.reject(new Error(data.message));
      }
      return Promise.reject(new Error(`GitHub API error: ${status}`));
    }
    // Network or other
    return Promise.reject(new Error(error.message || 'Network error'));
  }
);

/**
 * Fetch GitHub user data by username.
 * @param {string} username
 * @returns {Promise<Object>} user data
 */
export async function fetchUserData(username) {
  if (!username || !username.trim()) {
    throw new Error('Username is required');
  }
  const encoded = encodeURIComponent(username.trim());
  const response = await apiClient.get(`/users/${encoded}`);
  return response.data; // axios auto-parses JSON
}