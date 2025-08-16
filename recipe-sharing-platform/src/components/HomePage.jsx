import React, { useEffect, useState } from 'react'
import Recipes from '../data.json'


const HomePage = () => {
    // Create state to hold recipes
    const [recipes, setRecipes] = useState([]);

    // To load data when the component mounts
    useEffect(() => {
        // fetch data from the JSON file
        {setRecipes(Recipes)}
    }, [])


  return (
      <div className='bg-gray-100'>
          <div className='m-6 flex flex-row flex-wrap gap-6 justify-center'>
              {recipes.map((recipe) => (
                <div key={recipe.id}
                    className='block w-80 h-auto rounded-xl bg-white overflow-hidden shadow-md
                    hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'
                    >
                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className='w-80 h-48 object-cover'
                  />
                  <div className='m-2 p-2'>
                    <h3 className='font-semibold mb-1'>{recipe.title}</h3>
                    <p className='text-sm text-gray-500'>{recipe.summary}</p>
                  </div>
              </div>
              ))}
          </div>
      </div>
  )
}

export default HomePage
