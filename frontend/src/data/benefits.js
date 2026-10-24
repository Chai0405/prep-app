// "Why Use Prep?" cards on the Dashboard. Front: icon, title, text.
// Back (shown when the card is flipped): details, points and a link.
const benefits = [
  {
    icon: "calendar_today",
    title: "Organized Planning",
    text: "Easily schedule your meals for the week.",
    details: "Plan every day of your week in one place.",
    points: [
      "Breakfast, lunch, dinner and snacks for each day",
      "Add any recipe to a day in a couple of taps",
      "Your week is saved to your account",
    ],
    link: { label: "Open Planner", to: "/planner" },
  },
  {
    icon: "fitness_center",
    title: "Healthy Choices",
    text: "Choose nutritious recipes to stay on track.",
    details: "Know what you're cooking before you start.",
    points: [
      "Calories, cooking time and difficulty on every recipe",
      "Filter by meal type",
      "Search by ingredient or tag, like “High Protein”",
    ],
    link: { label: "Browse Recipes", to: "/recipes" },
  },
  {
    icon: "repeat",
    title: "Stay Consistent",
    text: "Build a routine with consistent meal prep.",
    details: "Small, repeatable steps beat big plans.",
    points: [
      "The same simple structure every week",
      "Keep the meals that work and repeat them",
      "Short reads on habits and routines in our blog",
    ],
    link: { label: "Read the Blog", to: "/blogs" },
  },
  {
    icon: "assignment",
    title: "Smart Organization",
    text: "Keep recipes, ingredients and groceries organised.",
    details: "Your grocery list builds itself.",
    points: [
      "Ingredients collected from the meals you plan",
      "Tick items off while you shop",
      "Pantry staples ready to order in one place",
    ],
    link: { label: "Open Grocery", to: "/grocery" },
  },
];

export default benefits;
