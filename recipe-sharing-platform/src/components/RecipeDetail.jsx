import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Recipes from '../data.json'

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const found = Recipes.find((r) => r.id === parseInt(id));
        setRecipe(found);
    }, [id])
    
    if (!recipe) return <p>Recipe not found</p>

  return (
    <div className='bg-gray-100 w-full min-h-screen p-10'>
      <div className='inline-block w-[600px] h-auto bg-white rounded-xl shadow-md overflow-hidden'>
        <img src={recipe.image} 
        alt={recipe.title}
        className='w-[600px] h-[300px] object-cover' 
        />
        <div className='p-6'>
            <h2 className='font-semibold mb-1'>{recipe.title}</h2>
            <p className='text-base text-gray-500'>{recipe.summary}</p>
            <span className='block'>Cook Time: {recipe.cookTime}</span>
            <span>Servings: {recipe.servings}</span>
            <ul>
                <h3 className='font-semibold mt-4'>Ingredients:</h3>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className='text-sm text-gray-700'>{ingredient}</li>
                ))}
            </ul>
            <ul>
                <h3 className='font-semibold mt-4'>Instructions:</h3>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index} className='text-sm text-gray-700'>{instruction}</li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
