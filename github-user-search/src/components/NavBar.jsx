import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">GitHub User Search</Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
      </nav>
    </header>
    </div>
  )
}

export default NavBar
