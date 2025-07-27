import { useState } from "react"
import useRecipeStore from "./recipeStore";



const EditRecipeForm = ({recipe}) => {
    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    const updateRecipe = useRecipeStore(state => state.updateRecipe);

    const handleSumbit = (event) => {
        event.preventDefult();
        updateRecipe({ id: recipe.id, title, description});
        alert("Recipe updated!");
    }

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <h3>Edit Recipe</h3>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  )
}

export default EditRecipeForm
