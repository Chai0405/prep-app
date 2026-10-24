import { Link } from "react-router-dom";

// The whole week at a glance: what's planned in each day/meal slot.
// Tapping a slot opens that day and meal in the planner.
export default function WeekOverview({ planner, days, meals, onOpen }) {
  const slots = days.flatMap((day) =>
    meals.map((meal) => planner?.[day.toLowerCase()]?.[meal.toLowerCase()] || [])
  );
  const filled = slots.filter((recipes) => recipes.length > 0).length;
  const totalRecipes = slots.reduce((sum, recipes) => sum + recipes.length, 0);
  const open = slots.length - filled;

  return (
    <div className="week-overview">

      <p className="week-overview-summary">
        <strong>{filled} of {slots.length}</strong> meals planned
        {totalRecipes > filled && <> · {totalRecipes} recipes</>}
        {" · "}
        {open === 0 ? "every slot is filled 🎉" : `${open} slot${open === 1 ? "" : "s"} still open`}
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
                  <span className="week-overview-slot-text">
                    {first ? first.title : "—"}
                    {recipes.length > 1 && <em> +{recipes.length - 1}</em>}
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
      </div>

    </div>
  );
}
