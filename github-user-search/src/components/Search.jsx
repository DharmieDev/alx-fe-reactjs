import { useState } from 'react';
import { searchUsers } from '../services/githubService';

export default function Search() {
  // form fields
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);

  // results & pagination
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 30;

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // perform a fresh search
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setPage(1);
    setTotalCount(0);

    try {
      setLoading(true);
      const { items, total_count } = await searchUsers({
        username,
        location,
        minRepos,
        page: 1,
        per_page: perPage,
      });
      setResults(items);
      setTotalCount(total_count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // load next page
  const loadMore = async () => {
    if (results.length >= totalCount) return;
    const nextPage = page + 1;
    setError('');
    try {
      setLoading(true);
      const { items } = await searchUsers({
        username,
        location,
        minRepos,
        page: nextPage,
        per_page: perPage,
      });
      setResults((prev) => [...prev, ...items]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = results.length < totalCount;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced GitHub User Search</h1>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username (partial OK)
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., octocat"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="minRepos" className="block text-sm font-medium mb-1">
            Min Repos
          </label>
          <input
            id="minRepos"
            type="number"
            min={0}
            value={minRepos}
            onChange={(e) => setMinRepos(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-3 flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={() => {
              setUsername('');
              setLocation('');
              setMinRepos(0);
              setResults([]);
              setTotalCount(0);
              setPage(1);
              setError('');
            }}
            className="border px-4 py-2 rounded"
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Status */}
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {results.length > 0 && (
        <div className="mb-2 text-sm text-gray-600">
          Showing {results.length} of {totalCount} users.
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        {results.map((user) => (
          <div
            key={user.login}
            className="flex gap-4 border rounded p-3 bg-white shadow-sm"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{user.login}</h2>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Profile
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">GitHub ID: {user.id}</p>
              <p className="text-xs text-gray-500">
                Score: {Math.round(user.score * 100) / 100}
              </p>
              {/* If you want more details (location/repos), fetch individual user profile on-demand */}
            </div>
          </div>
        ))}

        {!loading && results.length === 0 && !error && (
          <div className="text-gray-600">No users found with those criteria.</div>
        )}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
