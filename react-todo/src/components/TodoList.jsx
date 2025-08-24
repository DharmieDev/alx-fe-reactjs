import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
const initialTodos = [
{ id: 1, text: "Buy groceries", completed: false },
{ id: 2, text: "Walk the dog", completed: true },
{ id: 3, text: "Read a book", completed: false },
];


export default function TodoApp() {
const [todos, setTodos] = useState(initialTodos);


// Add a new todo to state
const addTodo = (text) => {
const newTodo = {
id: Date.now(),
text,
completed: false,
};
setTodos((prev) => [newTodo, ...prev]);
};


// Toggle a todo's completed state
const toggleTodo = (id) => {
setTodos((prev) =>
prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
);
};


// Delete a todo by id
const deleteTodo = (id) => {
setTodos((prev) => prev.filter((todo) => todo.id !== id));
};


return (
<div style={{ maxWidth: "400px", margin: "0 auto", padding: "16px" }}>
<h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Todo List</h1>


{/* Form to add todos */}
<AddTodoForm onAdd={addTodo} />


{/* List of todos */}
<ul style={{ marginTop: "16px", listStyle: "none", padding: 0 }}>
{todos.map((todo) => (
<li
key={todo.id}
onClick={() => toggleTodo(todo.id)}
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "8px",
border: "1px solid #ddd",
borderRadius: "4px",
cursor: "pointer",
marginBottom: "8px",
backgroundColor: "#fff",
}}
>
<span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#888" : "#000" }}>
{todo.text}
</span>


<button
onClick={(e) => {
e.stopPropagation();
deleteTodo(todo.id);
}}
style={{
marginLeft: "8px",
color: "#dc2626",
background: "none",
border: "none",
cursor: "pointer",
}}
aria-label={`Delete ${todo.text}`}
>
Delete
</button>
</li>
))}
</ul>


<p style={{ fontSize: "14px", marginTop: "16px" }}>
Completed: {todos.filter((t) => t.completed).length} / {todos.length}
</p>
</div>
);
}