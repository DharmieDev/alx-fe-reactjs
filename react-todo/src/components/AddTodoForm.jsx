import { useState } from "react";


export default function AddTodoForm({ onAdd }) {
const [value, setValue] = useState("");


const handleSubmit = (e) => {
e.preventDefault();
const trimmed = value.trim();
if (!trimmed) return;


onAdd(trimmed);
setValue("");
};


return (
<form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
<input
value={value}
onChange={(e) => setValue(e.target.value)}
placeholder="Add a new todo..."
style={{
flex: 1,
border: "1px solid #ccc",
padding: "8px",
borderRadius: "4px",
}}
aria-label="New todo"
/>
<button
type="submit"
style={{
padding: "8px 16px",
borderRadius: "4px",
backgroundColor: "#2563eb",
color: "white",
border: "none",
cursor: "pointer",
}}
>
Add
</button>
</form>
);
}