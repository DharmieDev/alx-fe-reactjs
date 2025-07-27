import { useState } from "react";
import useRecipeStore from "./recipeStore";


const AddRecipeForm = () => {
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const [title, setTitle] =useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addRecipe({ id: Date.now(), title, description});
        setTitle("");
        setDescription("");
    }

  return (
    <div style={{
      
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: 'auto',
      }}>
        <input type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" style={{
          height: '30px',
          borderRadius: '10px',
          padding: '5px',
          border: '1px solid #ccc',
        }}/>
        <textarea value={description} 
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description" style={{
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
        }}>Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm

