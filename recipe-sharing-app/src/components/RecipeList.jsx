import { Link } from 'react-router-dom';
import useRecipeStore  from './recipeStore';
import SearchBar from './SearchBar';


const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
    const favorites = useRecipeStore(state => state.favorites);
   const addFavorite = useRecipeStore(state => state.addFavorite);
   const removeFavorite = useRecipeStore(state => state.removeFavorite);

   const isFavorite = (id) => favorites.includes(id);

  return (
    <div>
      <h2>Recipes</h2>
      <SearchBar />
      <button style={{ 
        padding: '10px 20px',
        backgroundColor: 'black',
        border: 'none',
        borderRadius: '5px',
        
      }}>
        <Link to="/add" style={{
          textDecoration: 'none', color: 'white',}}>Add New Recipe</Link>
      </button>
      <ul>
        {filteredRecipes.length > 0 ? (filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
             <button
                onClick={() =>
                  isFavorite(recipe.id)
                    ? removeFavorite(recipe.id)
                    : addFavorite(recipe.id)
                }
                style={{
                  padding: '5px 10px',
                  backgroundColor: isFavorite(recipe.id) ? 'crimson' : 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {isFavorite(recipe.id) ? 'Unfavorite' : 'Favorite'}
              </button>
          </li>
        ))
      ) : (<li>No Recipe found</li>)
      }
      </ul>
    </div>
  )
}

export default RecipeList


