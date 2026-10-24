import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddToPlannerModal from "../components/AddToPlannerModal";
import "../styles/recipeDetail.css"
import { apiFetch } from "../utils/api";

export default function RecipeDetail() {

const { id } = useParams();
const navigate = useNavigate();

const [recipe,setRecipe] = useState(null);
const [notFound,setNotFound] = useState(false);
const [showPlannerModal,setShowPlannerModal] = useState(false);

/* ================= FETCH RECIPE ================= */

useEffect(()=>{

apiFetch(`/api/recipes/${id}`)
.then(res=>{
if(!res.ok) throw new Error("Recipe not found");
return res.json();
})
.then(setRecipe)
.catch(()=>setNotFound(true));

},[id]);


/* ================= LOADING ================= */

if(notFound){
return <div className="loading-state">Recipe not found.</div>;
}

if(!recipe){
return <div className="loading-state">Loading recipe...</div>;
}

return(

<div className="recipe-detail-page">


{/* ================= SPLIT LAYOUT ================= */}

<div className="recipe-split">


{/* LEFT IMAGE */}

<div className="recipe-left">

<span onClick={()=>navigate("/recipes")}>
← Back to Recipes
</span>

<img src={recipe.image} alt={recipe.title}/>

</div>



{/* RIGHT CONTENT */}

<div className="recipe-right">

<div className="recipe-inner">


{/* TAGS */}

<div className="recipe-tags">

{recipe.tags?.map(tag=>(
<span key={tag}>{tag}</span>
))}

</div>


<h1>{recipe.title}</h1>


<p className="recipe-desc">
{recipe.description}
</p>


{/* META */}

<div className="recipe-meta">

<div>
<span>Calories</span>
<p>{recipe.calories} kcal</p>
</div>

{recipe.protein && (
<div>
<span>Protein</span>
<p>{recipe.protein} g</p>
</div>
)}

</div>


{/* INGREDIENTS */}

<section className="recipe-section">

<h2>Ingredients</h2>

<ul className="recipe-ingredients">

{recipe.ingredients?.map((item,i)=>(
<li key={i}>{item}</li>
))}

</ul>

</section>


{/* METHOD */}

<section className="recipe-section">

<h2>Method</h2>

<ol className="recipe-method">

{recipe.instructions?.map((step,i)=>(
<li key={i}>{step}</li>
))}

</ol>

</section>


<button
className="plan-btn"
onClick={()=>setShowPlannerModal(true)}
>
Add to Planner
</button>


</div>

</div>


</div>



{/* ================= MODAL ================= */}

{showPlannerModal && (

<AddToPlannerModal
recipe={{
_id:recipe._id,
title:recipe.title,
image:recipe.image,
calories:recipe.calories
}}
onClose={()=>setShowPlannerModal(false)}
/>

)}




</div>

);

}