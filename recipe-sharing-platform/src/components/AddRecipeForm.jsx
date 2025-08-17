import { useState } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  const [errors, setErrors] = useState({}); // 

  // helper to split textarea into arrays
  const parseList = (text) => {
    return text
      .split(/\r?\n|,/g)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // ✅ validation function
  const validate = () => {
    const errs = {};

    const ingredients = parseList(ingredientsText);
    const steps = parseList(stepsText);

    if (!title.trim()) errs.title = "Title is required.";
    if (ingredients.length < 2) errs.ingredients = "At least 2 ingredients required.";
    if (steps.length < 1) errs.steps = "At least 1 preparation step required.";

    setErrors(errs);
    return Object.keys(errs).length === 0; // true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // ❌ stop if invalid

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      ingredients: parseList(ingredientsText),
      instructions: parseList(stepsText),
    };

    if (onAddRecipe) onAddRecipe(newRecipe);

    // reset form
    setTitle("");
    setIngredientsText("");
    setStepsText("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-xl border bg-white p-6 shadow md:max-w-2xl lg:max-w-3xl sm:p-6 md:p-8 shadow"
    >
      <h2 className="mb-6 text-2xl font-bold sm:text-2xl md:text-3xl">Add a New Recipe</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-2"
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Ingredients</label>
        <textarea
          rows={5}
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="One ingredient per line"
        />
        {errors.ingredients && (
          <p className="text-red-600 text-sm">{errors.ingredients}</p>
        )}
      </div>

      {/* Steps */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Preparation Steps</label>
        <textarea
          rows={6}
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="One step per line"
        />
        {errors.steps && (
          <p className="text-red-600 text-sm">{errors.steps}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 sm:w-auto"
      >
        Add Recipe
      </button>
    </form>
  );
}

