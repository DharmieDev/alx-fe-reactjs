import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, newRecipe];
    set({
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      ),
    });
  },

  setRecipes: (recipes) => set({ recipes }),

  deleteRecipe: (id) => {
    const updatedRecipes = get().recipes.filter(recipe => recipe.id !== id);
    set({
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      ),
    });
  },

  updateRecipe: (updatedRecipe) => {
    const updatedRecipes = get().recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    set({
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      ),
    });
  },

  setSearchTerm: (term) => {
    const { recipes } = get();
    set({
      searchTerm: term,
      filteredRecipes: recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      ),
    });
  },
}));

export default useRecipeStore;
