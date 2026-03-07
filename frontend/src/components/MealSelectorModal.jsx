import { useNavigate } from "react-router-dom";
import { featuredRecipes } from "../data/featuredRecipes";

export default function MealSelectorModal({ onClose, onSelect }) {

  const navigate = useNavigate();

  const handleSelect = async (recipe) => {

  // get real recipes from backend
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);
  const recipes = await res.json();

  const realRecipe = recipes.find(
    r => r.title.toLowerCase() === recipe.title.toLowerCase()
  );

  if (!realRecipe) {
    console.error("Recipe not found in DB:", recipe.title);
    return;
  }

  onSelect(realRecipe);
  onClose();
};

  return (
    <div className="modal-overlay">

      <div className="modal-card planner-modal">

        <div className="modal-header">
          <h3>Choose a meal</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-grid">

          {featuredRecipes.map(recipe => (

            <div
              key={recipe.id}
              className="modal-recipe-card"
              onClick={() => handleSelect(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} />

              <h4>{recipe.title}</h4>

              <p>{recipe.description}</p>

              <span>{recipe.calories} kcal</span>

            </div>

          ))}

          {/* Browse all */}

          <div
            className="modal-recipe-card browse-all"
            onClick={() => {
              onClose();
              navigate("/recipes");
            }}
          >
            <span>Browse all recipes →</span>
          </div>

        </div>

      </div>

    </div>
  );
}