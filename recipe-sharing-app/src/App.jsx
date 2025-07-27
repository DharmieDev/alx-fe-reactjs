import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'

function App() {


  return (
    <>
      <div>
       <Router>
         <Routes>
           <Route path='/' element={<RecipeList />} />
           <Route path='/add' element={<AddRecipeForm />} />
           <Route path='/recipe/:id' element={<RecipeDetails />} />
         </Routes>
       </Router>
      </div>
    </>
  )
}

export default App
