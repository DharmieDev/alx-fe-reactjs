import { NavLink } from "react-router-dom"

const SideBar = () => {
  return (
    <div>
      <h2 className="font-bold m-2 font-Mozilla">Recipe Sharing App</h2>
      <nav>
        <ul>
            <li className="m-2 hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded">
                <NavLink to="/" end>Home</NavLink></li>
            <li className="m-2 hover:bg-gray-200 active:bg-gray-200 rounded">
                <NavLink to="/add-recipe" end className='active:bg-gray-200'>Add Recipe</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
