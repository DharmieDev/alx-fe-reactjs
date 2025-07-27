import { Link } from 'react-router-dom';
import useRecipeStore  from './recipeStore';


const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>All Recipes</h2>
      <Link to="/add">Add New Recipe</Link>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeList
