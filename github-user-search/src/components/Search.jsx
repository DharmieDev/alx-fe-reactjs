import { useEffect } from 'react';
import { useGitHubUserStore } from '../store/useGitHubUserStore';

export default function Search() {
  const input     = useGitHubUserStore((s) => s.input);
  const user      = useGitHubUserStore((s) => s.user);
  const loading   = useGitHubUserStore((s) => s.loading);
  const error     = useGitHubUserStore((s) => s.error);
  const setInput  = useGitHubUserStore((s) => s.setInput);
  const searchUser = useGitHubUserStore((s) => s.searchUser);
  const clear     = useGitHubUserStore((s) => s.clear);

  // optional: auto-focus or debug
  useEffect(() => {
    // debug: console.log({ input, user, loading, error });
  }, [input, user, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUser();
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
          {loading ? 'Loading...' : 'Search'}
        </button>
        <button
          type="button"
          onClick={clear}
          className="ml-2 border px-4 py-2 rounded"
        >
          Clear
        </button>
      </form>

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

