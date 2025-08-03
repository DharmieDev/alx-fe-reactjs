import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);          // successful result
  const [loading, setLoading] = useState(false);   // loading state
  const [error, setError] = useState('');          // error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setError('');
    if (!input.trim()) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchUserData(input);
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {/* Conditional rendering */}
      {loading && <p className="text-gray-700">Loading...</p>}

      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-2">
          <p>{error}</p>
        </div>
      )}

      {user && !loading && (
        <div className="border rounded p-4 shadow flex gap-4 items-start">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {user.name || user.login}
            </h2>
            {user.bio && <p className="text-sm mb-1">{user.bio}</p>}
            <p className="text-sm">
              <span className="font-semibold">Followers:</span> {user.followers} &nbsp;
              <span className="font-semibold">Following:</span> {user.following}
            </p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-500 hover:underline"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
