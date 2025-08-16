import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail'
import SideBar from './components/SideBar'

function App() {

  return (
    <Router>
      <div className="block md:grid grid-cols-[200px_1fr]">
        <SideBar />
        <div>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/recipe/:id' element={<RecipeDetail />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
