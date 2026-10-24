// Dashboard banner slides, in order. Images live in public/hero/.
// To change a slide, edit its text here or replace the image file.
export const SLIDES = [
  {
    image: "/hero/dashboard-hero.jpg",
    title: "Plan. Prep. Repeat.",
    text: "Structured meals, smarter groceries, and food systems that fit your life.",
    cta: "Open Planner",
    to: "/planner",
  },
  {
    image: "/hero/slide-cooking.webp",
    title: "Cook with intention",
    text: "Thoughtfully curated recipes that simplify everyday cooking.",
    cta: "Browse Recipes",
    to: "/recipes",
  },
  {
    image: "/hero/slide-grocery-cart.jpg",
    title: "Your ingredients, organized",
    text: "A grocery list built automatically from your weekly plan.",
    cta: "Open Grocery",
    to: "/grocery",
  },
  {
    image: "/hero/slide-pantry-store.webp",
    title: "Stock your kitchen with intention",
    text: "Pantry staples, fresh produce and everyday essentials.",
    cta: "Shop Pantry",
    to: "/pantry",
  },
];

export const SLIDE_DURATION = 3000; // ms each slide stays; the fade is set in heroSlider.css
