import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
  },
  timeout: 10000,
});

// Normalize errors into friendly messages
apiClient.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response) {
      const { status, headers, data } = error.response;
      if (status === 422) {
        return Promise.reject(new Error('Invalid search parameters.'));
      }
      if (status === 403 && headers['x-ratelimit-remaining'] === '0') {
        return Promise.reject(new Error('Rate limit exceeded. Try again later or add a token.'));
      }
      if (status === 404) {
        return Promise.reject(new Error('User not found'));
      }
      if (data && data.message) {
        return Promise.reject(new Error(data.message));
      }
      return Promise.reject(new Error(`GitHub API error: ${status}`));
    }
    return Promise.reject(new Error(error.message || 'Network error'));
  }
);

/**
 * Get a specific user by username.
 * Equivalent to: GET https://api.github.com/users/{username}
 */
export async function fetchUserData(username) {
  if (!username || !username.trim()) {
    throw new Error('Username is required');
  }
  const encoded = encodeURIComponent(username.trim());
  const response = await apiClient.get(`/users/${encoded}`);
  return response.data;
}

/**
 * Advanced search: users filtered by username (partial), location, and minimum repos.
 * Uses: GET https://api.github.com/search/users?q={qualifiers}
 *
 * @param {Object} params
 * @param {string} params.username - partial or full login to match
 * @param {string} params.location - location qualifier
 * @param {number} params.minRepos - minimum repo count
 * @param {number} params.page - page number (1-based)
 * @param {number} params.per_page - results per page
 */
export async function searchUsers({
  username = '',
  location = '',
  minRepos = 0,
  page = 1,
  per_page = 30,
}) {
  // Build qualifier string
  const qualifiers = [];
  if (username.trim()) {
    // search login field
    qualifiers.push(`${username.trim()} in:login`);
  }
  if (location.trim()) {
    qualifiers.push(`location:${location.trim()}`);
  }
  if (minRepos > 0) {
    qualifiers.push(`repos:>=${minRepos}`);
  }
  if (qualifiers.length === 0) {
    qualifiers.push('type:user'); // fallback so q is non-empty
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
  };
}
