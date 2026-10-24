import { useState } from "react";
import { Link } from "react-router-dom";
import { saveWeekImage } from "../utils/weekImage";

// The whole week at a glance: what's planned in each day/meal slot.
// Tapping a slot opens that day and meal in the planner.
export default function WeekOverview({ planner, days, meals, onOpen }) {
  const slots = days.flatMap((day) =>
    meals.map((meal) => planner?.[day.toLowerCase()]?.[meal.toLowerCase()] || [])
  );
  const filled = slots.filter((recipes) => recipes.length > 0).length;
  const totalRecipes = slots.reduce((sum, recipes) => sum + recipes.length, 0);
  const open = slots.length - filled;
  const openText = open === 0 ? "every slot is filled 🎉" : `${open} slot${open === 1 ? "" : "s"} still open`;

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const recipesText = totalRecipes > filled ? ` · ${totalRecipes} recipes` : "";
      await saveWeekImage({
        planner,
        days,
        meals,
        summary: `${filled} of ${slots.length} meals planned${recipesText} · ${openText}`,
      });
    } catch {
      setSaveError("Couldn't save the image. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="week-overview">

      <p className="week-overview-summary">
        <strong>{filled} of {slots.length}</strong> meals planned
        {totalRecipes > filled && <> · {totalRecipes} recipes</>}
        {" · "}
        {openText}
      </p>

      <div className="week-overview-grid" role="table" aria-label="Meals planned this week">

        <div className="week-overview-row week-overview-head" role="row">
          <span role="columnheader" className="week-overview-day">Day</span>
          {meals.map((meal) => (
            <span role="columnheader" key={meal}>{meal}</span>
          ))}
        </div>

        {days.map((day) => (
          <div className="week-overview-row" role="row" key={day}>
            <span role="rowheader" className="week-overview-day">{day}</span>

            {meals.map((meal) => {
              const recipes = planner?.[day.toLowerCase()]?.[meal.toLowerCase()] || [];
              const first = recipes[0];

              return (
                <button
                  key={meal}
                  type="button"
                  role="cell"
                  className={`week-overview-slot ${first ? "is-filled" : ""}`}
                  onClick={() => onOpen(day, meal)}
                  aria-label={`${day} ${meal}: ${first ? recipes.map((r) => r.title).join(", ") : "nothing planned"}`}
                >
                  <span className="week-overview-meal-label" aria-hidden="true">{meal}</span>
                  <span className="week-overview-slot-body">
                    {first?.image && (
                      <img
                        className="week-overview-thumb"
                        src={first.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}
                    <span className="week-overview-slot-text">
                      {first ? first.title : "—"}
                      {recipes.length > 1 && <em> +{recipes.length - 1}</em>}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="week-overview-actions">
        <Link to="/grocery" className="planner-btn week-overview-grocery">
          View grocery list
        </Link>
        <button type="button" className="planner-btn week-overview-save" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save as image"}
        </button>
      </div>
      {saveError && <p className="week-overview-error" role="alert">{saveError}</p>}

    </div>
  );
}
