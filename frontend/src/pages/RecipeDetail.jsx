import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddToPlannerModal from "../components/AddToPlannerModal";
import "../styles/recipeDetail.css"

export default function RecipeDetail() {

const { id } = useParams();
const navigate = useNavigate();

const [recipe,setRecipe] = useState(null);
// const [user,setUser] = useState(null);
const [showPlannerModal,setShowPlannerModal] = useState(false);
const [showLogoutConfirm,setShowLogoutConfirm] = useState(false);

/* ================= FETCH USER ================= */

// useEffect(()=>{

// fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`,{
// credentials:"include"
// })
// .then(res=>res.json())
// .then(setUser)
// .catch(()=>setUser(null));

// },[]);


/* ================= FETCH RECIPE ================= */

useEffect(()=>{

fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`)
.then(res=>res.json())
.then(setRecipe);

},[id]);


/* ================= LOADING ================= */

if(!recipe){
return <div className="loading-state">Loading recipe...</div>;
}

/* =================== LOGOUT ================ */
const handleLogout = async()=>{

await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
method:"POST",
credentials:"include"
});

navigate("/auth");

};


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

{showLogoutConfirm && (

<div className="logout-modal-overlay">

<div className="logout-modal">

<p>Are you sure you want to logout?</p>

<div className="logout-actions">

<button
className="cancel-btn"
onClick={()=>setShowLogoutConfirm(false)}
>
Cancel
</button>

<button
className="confirm-btn"
onClick={handleLogout}
>
Sign out
</button>

</div>

</div>

</div>

)}


</div>

);

}