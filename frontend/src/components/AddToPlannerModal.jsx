import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

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

export default function AddToPlannerModal({ recipe, onClose, onAdded }) {

  const navigate = useNavigate();

  const [day,setDay] = useState("Monday");
  const [meal,setMeal] = useState("Dinner");

  const [openDay,setOpenDay] = useState(false);
  const [openMeal,setOpenMeal] = useState(false);


  const [saving,setSaving] = useState(false);
  const [error,setError] = useState("");

  /* ================= ADD TO PLANNER ================= */

  // One request: the server adds this recipe to the chosen day/meal and
  // updates the grocery list, so the whole week isn't sent back and forth
  const handleAdd = async () => {

    if (saving) return;

    if (!localStorage.getItem("token")) {
      navigate("/auth");
      return;
    }

    setSaving(true);
    setError("");

    try {

      const res = await apiFetch("/api/planner/add", {
        method: "POST",
        body: {
          weekStart: getWeekStart(),
          day: dayMap[day],
          meal: meal.toLowerCase(),
          recipeId: recipe._id
        }
      });

      if (res.status === 401) {
        navigate("/auth");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Couldn't add to planner. Please try again.");
        return;
      }

      onAdded?.({ day, meal, alreadyPlanned: data.alreadyPlanned });
      onClose();

    } catch {
      setError("Couldn't add to planner. Please check your connection.");
    } finally {
      setSaving(false);
    }
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

        {error && (
          <p className="planner-modal-error" role="alert">{error}</p>
        )}

        <button
          className="planner-btn"
          onClick={handleAdd}
          disabled={saving}
          aria-busy={saving}
        >
          {saving ? "ADDING..." : "ADD TO PLANNER"}
        </button>


      </div>

    </div>

  );
}