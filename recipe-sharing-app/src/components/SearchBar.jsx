import React from 'react'
import useRecipeStore from "./recipeStore"

const SearchBar = () => {
    const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (

    <div>
      <input type="text" placeholder="Search recipes...." 
      onChange={(e) => setSearchTerm(e.target.value)} style={{
        width: '400px',
        height: '30px',
        borderRadius: '10px',
        padding: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px'}} />
    </div>
  )
}

export default SearchBar
