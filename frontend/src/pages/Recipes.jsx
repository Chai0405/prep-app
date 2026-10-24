import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/recipes.css";
import { apiFetch } from "../utils/api";
import LoadingState from "../components/LoadingState";
import RecipeRequestForm from "../components/RecipeRequestForm";

export default function Recipes() {

const location = useLocation();
const navigate = useNavigate();

const [recipes,setRecipes] = useState([]);
const [status,setStatus] = useState("loading"); // loading | ready | error
const requestRef = useRef(null);
const requestedName = new URLSearchParams(location.search).get("request") || "";


/* ================= FETCH RECIPES ================= */

useEffect(()=>{

apiFetch("/api/recipes")
.then(res=>{
if(!res.ok) throw new Error(`Recipes request failed (${res.status})`);
return res.json();
})
.then(data=>{
setRecipes(Array.isArray(data) ? data : []);
setStatus("ready");
})
.catch(err=>{
console.error(err);
setStatus("error");
});

},[]);


/* ================= FROM SEARCH: "Request this recipe" ================= */

useEffect(()=>{
if(status === "ready" && requestedName){
requestRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
}
},[status, requestedName]);


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

{status === "loading" && <LoadingState label="Loading recipes..." />}

{status === "error" && (
<div className="loading-state-box" role="alert">
<p>Recipes couldn't be loaded. Please check your connection and try again.</p>
<button className="active-filter" onClick={()=>window.location.reload()}>Try again</button>
</div>
)}

<section className="recipes-grid-medium">

{filteredRecipes.map(recipe => (

<div
key={recipe._id}
className="recipe-card-medium"
onClick={()=>navigate(`/recipes/${recipe._id}`)}
>

<img loading="lazy" decoding="async" src={recipe.image} alt={recipe.title}/>

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

{/* REQUEST A RECIPE */}

{status === "ready" && (
<div ref={requestRef}>
<RecipeRequestForm key={requestedName} initialName={requestedName} />
</div>
)}

</div>

);

}