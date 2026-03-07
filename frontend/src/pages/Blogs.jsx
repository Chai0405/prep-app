import { Link } from "react-router-dom";
import "../styles/blogs.css";

export default function Blogs() {

  return (
    <div className="blogs-page">

      {/* HERO */}
      <section className="blogs-hero">
        <div className="blogs-hero-overlay">
          <h1>The PREP Journal</h1>
          <p>
            Thoughtful planning, smart structure, and simple strategies — built for sustainable food systems that actually fit your life.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="blogs-content">

        {/* FEATURED */}
        <div className="blogs-featured">

          <div className="featured-card">
            <div className="featured-image">
              <img src="/blogs/meal-rhythm.webp" alt="Meal Rhythm" />
            </div>

            <div className="featured-content">
              <span className="blog-tag">Planning</span>
              <h2>How to Build a Weekly Meal Rhythm</h2>
              <p>
                Building a weekly meal rhythm involves creating a flexible, recurring structure—such as theme nights, using pantry staples, and planning for leftovers.
                It helps reduce daily decision fatigue while making grocery shopping more intentional and efficient.
                Over time, this simple structure turns weeknight cooking into a calm, predictable ritual instead of a last-minute scramble.
              </p>

              <Link to="/blogs/weekly-meal-rhythm" className="read-btn">
                Read More
              </Link>
            </div>
          </div>


          <div className="featured-card">
            <div className="featured-image">
              <img src="/blogs/balanced-eating.webp" alt="Balanced Eating" />
            </div>

            <div className="featured-content">
              <span className="blog-tag">Nutrition</span>
              <h2>Balanced Eating Without Counting Calories</h2>
              <p>
                Balanced eating focuses on portion control, food quality, and mindful eating using practical frameworks like the plate method.
                Instead of tracking numbers, it encourages building balanced meals with protein, fiber, and healthy fats.
                This approach supports steady energy, reduced stress around food, and long-term sustainable habits.
              </p>

              <Link to="/blogs/balanced-eating" className="read-btn">
                Read More
              </Link>
            </div>
          </div>

        </div>


        {/* GRID */}
        <div className="blogs-grid">

          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/meal-prep.jpg" alt="Meal Prep" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Why Meal Prep Fails (And How to Fix It)</h3>
            <Link to="/blogs/meal-prep-fails" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/grocery-smart.jpg" alt="Grocery Smart" />
            </div>
            <span className="blog-tag">Grocery</span>
            <h3>Smart Grocery Lists That Save Time</h3>
            <Link to="/blogs/grocery-lists" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/consistency.jpg" alt="Consistency" />
            </div>
            <span className="blog-tag">Mindset</span>
            <h3>Consistency Over Motivation</h3>
            <Link to="/blogs/consistency-over-motivation" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/repeat-meals.jpg" alt="Repeat Meals" />
            </div>
            <span className="blog-tag">Cooking</span>
            <h3>Meals You’ll Actually Repeat</h3>
            <Link to="/blogs/repeat-meals" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/food-system.webp" alt="Food System" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Stop Relying on Willpower — Build a Food System Instead</h3>
            <Link to="/blogs/food-system" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/kitchen-workflow.avif" alt="Kitchen Workflow" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Your Kitchen Needs a Workflow, Not More Recipes</h3>
            <Link to="/blogs/kitchen-workflow" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/hidden-price.avif" alt="Hidden Price" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>The Hidden Cost of Unplanned Eating</h3>
            <Link to="/blogs/hidden-price" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/diet-fails.jpg" alt="Diet Fails" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Why “Eating Healthy” Fails Without Structure</h3>
            <Link to="/blogs/diet-fails" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/core-plan.jpg" alt="Core Plan" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Build Once, Repeat Weekly: The Core Meals Method</h3>
            <Link to="/blogs/core-plan" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/food-clarity.jpg" alt="Food Clarity" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>From Decision Fatigue to Food Clarity</h3>
            <Link to="/blogs/food-clarity" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/discipline.jpg" alt="Discipline" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Discipline Over Motivation: The Real Secret to Consistency</h3>
            <Link to="/blogs/discipline" className="read-btn small">
              Read More
            </Link>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src="/blogs/week-plan.jpg" alt="Week Plan" />
            </div>
            <span className="blog-tag">Habits</span>
            <h3>Design Your Week Before It Designs Your Diet</h3>
            <Link to="/blogs/week-plan" className="read-btn small">
              Read More
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}