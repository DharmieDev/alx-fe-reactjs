import useRecipeStore from "./recipeStore"
import { useNavigate } from "react-router-dom";


const DeleteRecipeButton = ({recipeId}) => {
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteRecipe(recipeId);
        alert("Recipe deleted!");
        navigate("/");
    }

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '400px',
        margin: 'auto',
    }}>
      <button onClick={handleDelete} style={{
          padding: '10px 20px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width:'40%',
        marginTop: '10px',
        }}>Delete Recipe</button>
    </div>
  )
}

export default DeleteRecipeButton
