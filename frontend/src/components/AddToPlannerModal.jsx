import { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const dayMap = {
  Monday: "monday",
  Tuesday: "tuesday",
  Wednesday: "wednesday",
  Thursday: "thursday",
  Friday: "friday",
  Saturday: "saturday",
  Sunday: "sunday"
};

const getWeekStart = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
};

export default function AddToPlannerModal({ recipe, onClose }) {

  const [day,setDay] = useState("Monday");
  const [meal,setMeal] = useState("Dinner");

  const [openDay,setOpenDay] = useState(false);
  const [openMeal,setOpenMeal] = useState(false);


  /* ================= ADD TO PLANNER ================= */

  const handleAdd = async () => {

    const weekStart = getWeekStart();

    const plannerRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/planner?weekStart=${weekStart}`,
      { credentials:"include" }
    );

    const plannerData = await plannerRes.json();

    const meals = plannerData?.meals || {};

    const updatedMeals = {
      ...meals,
      [dayMap[day]]:{
        ...meals[dayMap[day]],
        [meal.toLowerCase()]:[
  ...(meals?.[dayMap[day]]?.[meal.toLowerCase()] || []),
  {
    _id: recipe._id,
    title: recipe.title,
    image: recipe.image,
    calories: recipe.calories
  }
]
      }
    };

    const token = localStorage.getItem("token");

await fetch(`${import.meta.env.VITE_API_URL}/api/planner`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
      body:JSON.stringify({
        weekStart,
        meals:updatedMeals
      })
    });

    onClose(true);
  };


  return (

    <div className="modal-overlay">

      <div className="modal-card planner-modal">

        {/* HEADER */}

        <div className="modal-header">
          <h3>Add to planner</h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>


        {/* DAY SELECT */}

        <div className="planner-custom-select">

          <label>Day</label>

          <div
            className="planner-select-display"
            onClick={()=>{
              setOpenDay(!openDay);
              setOpenMeal(false);
            }}
          >
            {day}
          </div>

          {openDay && (

            <div className="planner-select-options">

              {DAYS.map(d => (

                <div
                  key={d}
                  onClick={()=>{
                    setDay(d);
                    setOpenDay(false);
                  }}
                >
                  {d}
                </div>

              ))}

            </div>

          )}

        </div>


        {/* MEAL SELECT */}

        <div className="planner-custom-select">

          <label>Meal</label>

          <div
            className="planner-select-display"
            onClick={()=>{
              setOpenMeal(!openMeal);
              setOpenDay(false);
            }}
          >
            {meal}
          </div>

          {openMeal && (

            <div className="planner-select-options">

              {MEALS.map(m => (

                <div
                  key={m}
                  onClick={()=>{
                    setMeal(m);
                    setOpenMeal(false);
                  }}
                >
                  {m}
                </div>

              ))}

            </div>

          )}

        </div>


        {/* BUTTON */}

        <button
          className="planner-btn"
          onClick={handleAdd}
        >
          ADD TO PLANNER
        </button>


      </div>

    </div>

  );
}