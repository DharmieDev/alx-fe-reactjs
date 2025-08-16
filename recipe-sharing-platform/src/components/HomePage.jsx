import React, { useEffect, useState } from 'react'
import Recipes from '../data.json'
import { Link } from 'react-router-dom'


const HomePage = () => {
    // Create state to hold recipes
    const [recipes, setRecipes] = useState([]);

    // To load data when the component mounts
    useEffect(() => {
        // fetch data from the JSON file
        setRecipes(Recipes)
    }, [])


  return (
      <div className='bg-gray-100 w-full min-h-screen p-2'>
          <div className='m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {recipes.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                    <div key={recipe.id}
                        className='block w-60 h-auto rounded-xl bg-white overflow-hidden shadow-md
                        hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'
                        >
                      <img
                      src={recipe.image}
                      alt={recipe.title}
                      className='w-60 h-48 object-cover'
                      />
                      <div className='m-2 p-2'>
                        <h3 className='font-semibold mb-1'>{recipe.title}</h3>
                        <p className='text-sm text-gray-500'>{recipe.summary}</p>
                      </div>
                    </div>
                </Link>
              ))}
          </div>
      </div>
  )
}

export default HomePage
