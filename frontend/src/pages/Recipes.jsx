import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LegalFooter from "../components/LegalFooter";
import "../styles/recipes.css";

export default function Recipes() {

const location = useLocation();
const navigate = useNavigate();

const [recipes,setRecipes] = useState([]);


/* ================= FETCH RECIPES ================= */

useEffect(()=>{

fetch(`${import.meta.env.VITE_API_URL}/api/recipes`)
.then(res=>res.json())
.then(data=>setRecipes(data))
.catch(err=>console.error(err));

},[]);


/* ================= URL FILTER ================= */

const queryParams = new URLSearchParams(location.search);
const typeFromURL = queryParams.get("type");

const formatMeal = (meal)=>{
if(!meal) return "All";
return meal.charAt(0).toUpperCase()+meal.slice(1).toLowerCase();
};

const activeMeal = formatMeal(typeFromURL);


/* ================= FILTER ================= */

const filteredRecipes =
activeMeal === "All"
? recipes
: recipes.filter(r => r.mealType === activeMeal);


/* ================= RENDER ================= */

return (

<div className="recipes-page">

{/* HERO */}

<section className="recipes-hero">

<div className="recipes-hero-overlay">

<h1>Cook with intention</h1>

<p>
Thoughtfully curated recipes designed to simplify everyday cooking
and bring structure to your food routine.
</p>

</div>

</section>


{/* FILTER */}

<section className="recipes-controls">

<div className="filter-row">

<span className="filter-label">Meal Type</span>

{["All","Breakfast","Lunch","Dinner","Snacks"].map(meal=>(
<button
key={meal}
className={activeMeal===meal ? "active-filter" : ""}
onClick={()=>navigate(`/recipes?type=${meal.toLowerCase()}`)}
>
{meal}
</button>
))}

</div>

</section>


{/* GRID */}

<section className="recipes-grid-medium">

{filteredRecipes.map(recipe => (

<div
key={recipe._id}
className="recipe-card-medium"
onClick={()=>navigate(`/recipes/${recipe._id}`)}
>

<img src={recipe.image} alt={recipe.title}/>

<div className="recipe-card-info">

<h3>{recipe.title}</h3>

<p>
{recipe.cuisine} · {recipe.time} · {recipe.calories} kcal
</p>

</div>

<div className="recipe-card-hover">

<span>View Recipe</span>

</div>

</div>

))}

</section>


</div>

);

}