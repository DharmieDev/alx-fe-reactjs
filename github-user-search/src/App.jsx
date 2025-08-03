import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home'; // Importing the Home component 
import NavBar from './components/NavBar';  // Importing the NavBar component
import Search from './components/Search';   // Importing the SearchResults component

export default function App() {
  return (
    <Router>                            {/* Enables client-side routing */}
      <NavBar />                         {/* Always visible navigation bar */}
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />           {/* “/” → Home page */}
          <Route path="/search" element={<Search />} /> {/* “/search” → Search page */}
        </Routes>
      </main>
    </Router>
  );
}
