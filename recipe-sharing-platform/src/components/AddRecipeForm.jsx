import { useMemo, useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  
  // 1) Controlled input state
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  // Track what's been touched so we only show errors after the user interacts
  const [touched, setTouched] = useState({
    title: false,
    ingredients: false,
    steps: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // 2) Helpers to parse the textarea text into arrays
  // Ingredients: allow either newline OR comma separation
  const parseList = (text, { allowComma = false } = {}) => {
    const parts = allowComma ? text.split(/\r?\n|,/g) : text.split(/\r?\n/g);
    return parts.map((s) => s.trim()).filter(Boolean); // trim & remove empties
  };

  const ingredients = useMemo(
    () => parseList(ingredientsText, { allowComma: true }),
    [ingredientsText]
  );

  const steps = useMemo(() => parseList(stepsText, { allowComma: false }), [stepsText]);

  // 3) Validation rules
  // - Title required
  // - At least 2 ingredients
  // - At least 1 step
  const errors = useMemo(() => {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (ingredients.length === 0) {
      e.ingredients = "Write your ingredients (one per line or comma‑separated).";
    } else if (ingredients.length < 2) {
      e.ingredients = "Add at least two ingredients.";
    }
    if (steps.length === 0) e.steps = "Write the preparation steps (one per line).";
    return e;
  }, [title, ingredients, steps]);

  const isValid = Object.keys(errors).length === 0;
  const showError = (field) => touched[field] || submitted;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // 4) Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // if invalid, this reveals all errors
    if (!isValid) return;

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      ingredients,
      instructions: steps,
    };

    // Send data upward (or to an API later)
    if (onAddRecipe) onAddRecipe(newRecipe);

    // Clear the form
    setTitle("");
    setIngredientsText("");
    setStepsText("");
    setTouched({ title: false, ingredients: false, steps: false });
    setSubmitted(false);
  };

  // 5) Tailwind utility classes (basic)
  const inputBase =
    "mt-1 w-full rounded-lg border p-3 outline-none focus:ring";
  const invalidRing = "border-red-500 focus:ring-red-500";
  const validRing = "border-gray-300 focus:ring-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border bg-white p-6 shadow"
      noValidate
    >
      <h2 className="mb-6 text-2xl font-bold">Add a New Recipe</h2>

      {/* Title */}
      <div className="mb-5">
        <label htmlFor="title" className="block text-sm font-medium">
          Recipe Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur("title")}
          className={`${inputBase} ${
            showError("title") && errors.title ? invalidRing : validRing
          }`}
          placeholder="e.g., Jollof Rice"
          aria-invalid={!!(showError("title") && errors.title)}
          aria-describedby="title-error"
        />
        {showError("title") && errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>

      {/* Ingredients */}
      <div className="mb-5">
        <label htmlFor="ingredients" className="block text-sm font-medium">
          Ingredients <span className="text-gray-500">(one per line or comma‑separated)</span>
        </label>
        <textarea
          id="ingredients"
          rows={6}
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          onBlur={() => handleBlur("ingredients")}
          className={`${inputBase} align-top ${
            showError("ingredients") && errors.ingredients ? invalidRing : validRing
          }`}
          placeholder={`2 cups long-grain rice
1 onion
2 red bell peppers
salt, pepper`}
          aria-invalid={!!(showError("ingredients") && errors.ingredients)}
          aria-describedby="ingredients-error ingredients-help"
        />
        <div id="ingredients-help" className="mt-1 text-xs text-gray-500">
          {ingredients.length} item{ingredients.length === 1 ? "" : "s"}
        </div>
        {showError("ingredients") && errors.ingredients && (
          <p id="ingredients-error" className="mt-1 text-sm text-red-600">
            {errors.ingredients}
          </p>
        )}
      </div>

      {/* Steps / Preparation */}
      <div className="mb-6">
        <label htmlFor="steps" className="block text-sm font-medium">
          Preparation Steps <span className="text-gray-500">(one step per line)</span>
        </label>
        <textarea
          id="steps"
          rows={8}
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          onBlur={() => handleBlur("steps")}
          className={`${inputBase} align-top ${
            showError("steps") && errors.steps ? invalidRing : validRing
          }`}
          placeholder={`Blend tomatoes, peppers, and onion.
Fry the paste with tomato paste until reduced.
Add stock, seasonings, and rice; cook until tender.`}
          aria-invalid={!!(showError("steps") && errors.steps)}
          aria-describedby="steps-error steps-help"
        />
        <div id="steps-help" className="mt-1 text-xs text-gray-500">
          {steps.length} step{steps.length === 1 ? "" : "s"}
        </div>
        {showError("steps") && errors.steps && (
          <p id="steps-error" className="mt-1 text-sm text-red-600">
            {errors.steps}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!isValid}
          className={`rounded-lg px-4 py-2 font-medium text-white transition
            ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 opacity-60"}
          `}
          title={isValid ? "Submit recipe" : "Fill all fields first"}
        >
          Add Recipe
        </button>
        <span className="text-sm text-gray-500">All fields required. At least 2 ingredients.</span>
      </div>
    </form>
  );
}


export default AddRecipeForm
