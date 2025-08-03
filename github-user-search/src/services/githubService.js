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
export async function searchUsers({ username = '', 
    location = '', 
    minRepos = 0, 
    page = 1, 
    per_page = 30 }) {
  // Build the `q` parameter with qualifiers
  let qualifiers = [];
  if (username.trim()) {
    qualifiers.push(`${username.trim()} in:login`);
  }
  if (location.trim()) {
    qualifiers.push(`location:${location.trim()}`);
  }
  if (minRepos > 0) {
    qualifiers.push(`repos:>=${minRepos}`);
  }
  // If nothing specified, fallback to a broad query to avoid empty q
  if (qualifiers.length === 0) {
    qualifiers.push('type:user');
  }
  const q = qualifiers.join(' ');

  const response = await apiClient.get('/search/users', {
    params: {
      q,
      page,
      per_page,
    },
  });

  return {
    total_count: response.data.total_count,
    items: response.data.items,
    // GitHub doesn't give total pages directly; caller can infer from total_count/per_page
  };
}