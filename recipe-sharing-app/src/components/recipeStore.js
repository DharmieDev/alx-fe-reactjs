import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

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
      favorites: get().favorites.filter((favId) => favId !== id),
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

  addFavorite: (recipeId) => {
    const { favorites } = get();
    if (!favorites.includes(recipeId)) {
      set({ favorites: [...favorites, recipeId] });
    }
  },

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (r) =>
        !favorites.includes(r.id) && favorites.some((id) =>
          r.title.toLowerCase().includes(
            recipes.find((f) => f.id === id)?.title.split(" ")[0].toLowerCase()
          )
        )
    );
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;
