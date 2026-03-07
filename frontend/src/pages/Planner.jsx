// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MealSelectorModal from "../components/MealSelectorModal";
import "../styles/planner.css";

const DAYS = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
];

const MEALS = ["Breakfast","Lunch","Dinner","Snacks"];

const dayMap = {
  Monday:"monday",
  Tuesday:"tuesday",
  Wednesday:"wednesday",
  Thursday:"thursday",
  Friday:"friday",
  Saturday:"saturday",
  Sunday:"sunday"
};

const getWeekStart = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0,0,0,0);
  return monday.toISOString();
};

export default function Planner(){

// const navigate = useNavigate();

const [planner,setPlanner] = useState({});
const [activeDay,setActiveDay] = useState("Monday");
const [activeMeal,setActiveMeal] = useState("Breakfast");
const [showMealModal,setShowMealModal] = useState(false);

const weekStart = getWeekStart();
const location = useLocation();

/* ================= FETCH PLANNER ================= */

useEffect(()=>{

const token = localStorage.getItem("token");

fetch(`${import.meta.env.VITE_API_URL}/api/planner?weekStart=${weekStart}`,{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(data=>{

const emptyPlanner = {
monday:{},
tuesday:{},
wednesday:{},
thursday:{},
friday:{},
saturday:{},
sunday:{}
};

if(data?.meals){
setPlanner({
...emptyPlanner,
...data.meals
});
}else{
setPlanner(emptyPlanner);
}

});

},[weekStart, location.pathname]);

/* ================= CURRENT MEALS ================= */

const mealList =
planner?.[dayMap[activeDay]]?.[activeMeal.toLowerCase()] || [];

/* ================= CONVERT TO IDS ================= */

const convertPlannerToIds = (plannerData)=>{

const result = {};

Object.entries(plannerData).forEach(([day,meals])=>{

result[day] = {};

Object.entries(meals || {}).forEach(([mealType,recipes])=>{

result[day][mealType] =
(recipes || [])
.map(r=>r._id)
.filter(Boolean);

});

});

return result;

};

/* ================= SAVE MEAL ================= */

const saveMeal = async(recipe,day = activeDay,meal = activeMeal)=>{

const currentMeals =
planner?.[dayMap[day]]?.[meal.toLowerCase()] || [];

const exists =
currentMeals.some(m=>m._id === recipe._id);

if(exists) return;

const updatedPlanner = {
...planner,
[dayMap[day]]:{
...planner[dayMap[day]],
[meal.toLowerCase()]:[
...currentMeals,
recipe
]
}
};

setPlanner(updatedPlanner);

await fetch(`${import.meta.env.VITE_API_URL}/api/planner`,{
method:"POST",
credentials:"include",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
weekStart,
meals:convertPlannerToIds(updatedPlanner)
})
});

};

/* ================= REMOVE MEAL ================= */

const removeMeal = async(index)=>{

const updatedMeals =
mealList.filter((_,i)=>i !== index);

const updatedPlanner = {
...planner,
[dayMap[activeDay]]:{
...planner[dayMap[activeDay]],
[activeMeal.toLowerCase()]:updatedMeals
}
};

setPlanner(updatedPlanner);

await fetch(`${import.meta.env.VITE_API_URL}/api/planner`,{
method:"POST",
credentials:"include",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
weekStart,
meals:convertPlannerToIds(updatedPlanner)
})
});

};

return(

<div className="planner-page">

{/* HERO */}

<section className="planner-hero">

<div className="planner-hero-overlay">

<h1>Plan your week with PREP</h1>

<p>
Add meals to your planner and instantly generate
your grocery list. Structure your week thoughtfully.
</p>

</div>

</section>

{/* BODY */}

<div className="planner-body">

{/* LEFT PANEL */}

<aside className="planner-left">

<h2 className="planner-left-title">This Week</h2>

<div className="planner-week-list">

<button className="week-item static">
▸ Food Pyramid
</button>

{DAYS.map(day=>(
<button
key={day}
className={`week-item ${activeDay === day ? "active":""}`}
onClick={()=>setActiveDay(day)}
>
{activeDay === day ? "▾":"▸"} {day}
</button>
))}

</div>

</aside>

{/* RIGHT PANEL */}

<section className="planner-right">

<div className="planner-right-header">

<h3>{activeMeal}</h3>

<div className="meal-tabs">

{MEALS.map(meal=>(
<button
key={meal}
className={`meal-tab ${activeMeal === meal ? "active":""}`}
onClick={()=>setActiveMeal(meal)}
>
{meal}
</button>
))}

</div>

</div>

<div className="planner-recipes">

{mealList.length === 0 &&(

<div className="planner-empty">

<p>No meals planned for this slot yet.</p>

<span>Add meals to build your day thoughtfully.</span>

</div>

)}

{mealList.length > 0 &&(

<div className="planner-meal-grid">

{mealList.map((meal,index)=>(

<div key={index} className="planner-grid-card">

<div className="planner-card-image">
<img src={meal.image} alt={meal.title}/>
</div>

<div className="planner-card-body">

<h4>{meal.title}</h4>

<p className="planner-card-desc">
{meal.description || "A nourishing, balanced choice"}
</p>

<div className="planner-card-meta">
<span>{meal.calories || 320} kcal</span>
</div>

</div>

<button
className="planner-card-clear"
onClick={()=>removeMeal(index)}
>
Clear
</button>

</div>

))}

</div>

)}

<div className="planner-add-wrap">

<button
className="planner-btn"
onClick={()=>setShowMealModal(true)}
>
{mealList.length > 0 ? "Add another meal":"Add meal"}
</button>

</div>

</div>

</section>

</div>

{showMealModal &&(

<MealSelectorModal
onClose={()=>setShowMealModal(false)}
onSelect={saveMeal}
/>

)}

</div>

);

}