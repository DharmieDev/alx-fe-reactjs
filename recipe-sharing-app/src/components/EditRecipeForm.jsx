import { useState } from "react"
import useRecipeStore from "./recipeStore";



const EditRecipeForm = ({recipe}) => {
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

    const handleSumbit = (event) => {
        event.preventDefault();
        updateRecipe({ id: recipe.id, title, description});
        alert("Recipe updated!");
    }

  return (
    <div>
      <form onSubmit={handleSumbit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: 'auto',
      }}>
        <h3>Edit Recipe</h3>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{
          height: '30px',
          borderRadius: '10px',
          padding: '5px',
          border: '1px solid #ccc',
        }}/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{
          height: '50px',
          borderRadius: '10px',
          padding: '5px',
          border: '1px solid #ccc'
          
        }}/>
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width:'40%',
          margin: 'auto',
        }}>Update Recipe</button>
      </form>
    </div>
  )
}

export default EditRecipeForm
