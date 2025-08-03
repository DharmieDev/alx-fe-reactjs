const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;

export async function fetchGitHubUser(username) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/users/${username}`, { headers });

  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
}