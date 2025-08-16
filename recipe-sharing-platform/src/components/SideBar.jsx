import { NavLink } from "react-router-dom"

const SideBar = () => {
  return (
    <div>
      <h2 className="font-bold m-2 font-Mozilla">Recipe Sharing App</h2>
      <nav>
        <ul>
            <li className="m-2 hover:bg-gray-200 rounded active:bg-gray-200 focus:bg-gray-200 rounded rounded">
                <NavLink to="/" end>Home</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
