/* eslint-env node */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const recipes = [
  {
  title: "Lemon Garlic Chicken",
  description:
    "Juicy pan-seared chicken finished in a bright lemon-garlic butter sauce. Fresh, aromatic, and deeply satisfying.",
  image: "/recipes/lemon-chicken.jpg",
  cuisine: "Mediterranean",
  mealType: "Dinner",
  calories: 480,
  time: "30 min",
  difficulty: "Medium",
  ingredients: [
    "2 chicken breasts",
    "3 cloves garlic, minced",
    "2 tbsp olive oil",
    "1 tbsp butter",
    "Juice of 1 lemon",
    "Zest of 1 lemon",
    "1 tsp dried oregano",
    "1/2 tsp paprika",
    "Salt to taste",
    "Freshly ground black pepper",
    "Fresh parsley, chopped"
  ],
  instructions: [
    "Pat chicken dry and season with salt, pepper, paprika, and oregano.",
    "Heat olive oil in a skillet over medium heat.",
    "Sear chicken 5–6 minutes per side until golden brown.",
    "Add garlic and cook until fragrant.",
    "Stir in lemon juice, zest, and butter.",
    "Spoon sauce over chicken and simmer for 3–4 minutes.",
    "Garnish with parsley and serve warm."
  ],
  tags: ["Protein Rich", "Balanced", "Fresh"]
},
{
  title: "Butter Chicken",
  description:
    "Tender chicken simmered in a creamy tomato-butter gravy layered with warming spices. Rich, comforting, and indulgent.",
  image: "/recipes/butter-chicken.jpg",
  cuisine: "Indian",
  mealType: "Dinner",
  calories: 540,
  time: "45 min",
  difficulty: "Medium",
  ingredients: [
    "500g boneless chicken thighs",
    "1 cup tomato puree",
    "1/2 cup cream",
    "2 tbsp butter",
    "1 tbsp ginger-garlic paste",
    "1 tsp garam masala",
    "1 tsp cumin powder",
    "1 tsp paprika",
    "1/2 tsp turmeric",
    "Salt to taste",
    "Fresh coriander leaves"
  ],
  instructions: [
    "Lightly season chicken with salt and turmeric.",
    "Heat butter and sauté ginger-garlic paste.",
    "Add tomato puree and cook until thickened.",
    "Stir in spices and simmer gently.",
    "Add chicken and cook until tender.",
    "Finish with cream and simmer 5 minutes.",
    "Garnish with coriander before serving."
  ],
  tags: ["Comfort Food", "Indian", "Creamy"]
},
{
  title: "Greek Salad",
  description:
    "Crisp vegetables tossed with briny olives and feta in a simple olive oil dressing. Fresh, vibrant, and perfectly balanced.",
  image: "/recipes/greek-salad.jpg",
  cuisine: "Mediterranean",
  mealType: "Lunch",
  calories: 320,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "1 cucumber, chopped",
    "1 cup cherry tomatoes, halved",
    "1/2 red onion, thinly sliced",
    "1/2 cup kalamata olives",
    "100g feta cheese, cubed",
    "2 tbsp extra virgin olive oil",
    "1 tbsp red wine vinegar",
    "1/2 tsp dried oregano",
    "Salt and black pepper"
  ],
  instructions: [
    "Combine cucumber, tomatoes, onion, and olives in a bowl.",
    "Whisk olive oil, vinegar, oregano, salt, and pepper.",
    "Toss vegetables with dressing.",
    "Top with feta and serve immediately."
  ],
  tags: ["Vegetarian", "Fresh", "Quick"]
},
{
  title: "Veg Fajitas",
  description:
    "Colorful peppers and onions sautéed with smoky spices and wrapped in warm tortillas. Bright, bold, and satisfying.",
  image: "/recipes/veg-fajitas.jpg",
  cuisine: "Mexican",
  mealType: "Dinner",
  calories: 390,
  time: "25 min",
  difficulty: "Easy",
  ingredients: [
    "2 bell peppers, sliced",
    "1 large onion, sliced",
    "2 tbsp olive oil",
    "1 tsp cumin",
    "1 tsp smoked paprika",
    "1/2 tsp chili powder",
    "Juice of 1 lime",
    "Salt to taste",
    "Flour tortillas"
  ],
  instructions: [
    "Heat olive oil in a skillet.",
    "Add onions and cook until softened.",
    "Stir in bell peppers and spices.",
    "Cook until tender but slightly crisp.",
    "Finish with lime juice and salt.",
    "Serve in warm tortillas."
  ],
  tags: ["Vegetarian", "Quick", "Colorful"]
},
{
  title: "Shakshuka",
  description:
    "Eggs gently poached in a spiced tomato and pepper sauce. Rustic, bold, and perfect for brunch.",
  image: "/recipes/shakshuka.jpg",
  cuisine: "Middle Eastern",
  mealType: "Breakfast",
  calories: 350,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "4 eggs",
    "1 can crushed tomatoes",
    "1 red bell pepper, diced",
    "2 cloves garlic, minced",
    "1 tsp cumin",
    "1 tsp paprika",
    "2 tbsp olive oil",
    "Salt and pepper",
    "Fresh parsley"
  ],
  instructions: [
    "Heat olive oil and sauté garlic and peppers.",
    "Add tomatoes and spices; simmer until thickened.",
    "Create wells and crack eggs into sauce.",
    "Cover and cook until eggs are set.",
    "Garnish with parsley before serving."
  ],
  tags: ["Brunch", "Vegetarian", "Protein Rich"]
},
{
  title: "Paneer Paratha",
  description:
    "Soft whole-wheat flatbread stuffed with spiced paneer filling. Hearty, comforting, and satisfying.",
  image: "/recipes/paneer-paratha.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 430,
  time: "30 min",
  difficulty: "Medium",
  ingredients: [
    "2 cups whole wheat flour",
    "200g paneer, grated",
    "1 green chili, finely chopped",
    "1/2 tsp cumin powder",
    "Salt to taste",
    "Water as needed",
    "Butter or ghee for cooking"
  ],
  instructions: [
    "Prepare soft dough using flour and water.",
    "Mix paneer with chili, cumin, and salt.",
    "Stuff mixture into dough balls.",
    "Roll gently and cook on hot pan with butter or ghee.",
    "Serve warm."
  ],
  tags: ["Indian", "Comfort Food", "Hearty"]
},
{
  title: "Avocado Bowl",
  description:
    "Creamy avocado layered over wholesome grains and crisp vegetables. Nourishing, balanced, and built for steady energy.",
  image: "/recipes/avocado-bowl.jpg",
  cuisine: "Global",
  mealType: "Lunch",
  calories: 420,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "1 ripe avocado, sliced",
    "1 cup cooked quinoa",
    "1/2 cup roasted chickpeas",
    "Cherry tomatoes, halved",
    "Cucumber slices",
    "2 tbsp olive oil",
    "Juice of 1/2 lemon",
    "Salt and black pepper",
    "Pumpkin seeds"
  ],
  instructions: [
    "Cook quinoa according to package instructions and let cool slightly.",
    "Arrange quinoa in a serving bowl.",
    "Top with avocado, chickpeas, tomatoes, and cucumber.",
    "Whisk olive oil, lemon juice, salt, and pepper.",
    "Drizzle dressing and finish with pumpkin seeds."
  ],
  tags: ["Vegetarian", "Balanced", "Healthy"]
},
{
  title: "Avocado Toast",
  description:
    "Toasted artisan bread topped with creamy smashed avocado and bright citrus notes. Simple, fresh, and satisfying.",
  image: "/recipes/avocado-toast.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 320,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "2 slices sourdough bread",
    "1 ripe avocado",
    "Juice of 1/2 lemon",
    "Salt to taste",
    "Black pepper",
    "Chili flakes",
    "Extra virgin olive oil"
  ],
  instructions: [
    "Toast bread slices until golden and crisp.",
    "Mash avocado with lemon juice, salt, and pepper.",
    "Spread evenly over toast.",
    "Drizzle olive oil and sprinkle chili flakes before serving."
  ],
  tags: ["Quick", "Vegetarian", "Fresh"]
},
{
  title: "Bibimbap",
  description:
    "A vibrant Korean rice bowl topped with seasoned vegetables and a silky fried egg. Colorful, comforting, and deeply flavorful.",
  image: "/recipes/bibimbap.jpg",
  cuisine: "Korean",
  mealType: "Lunch",
  calories: 520,
  time: "40 min",
  difficulty: "Medium",
  ingredients: [
    "2 cups cooked short-grain rice",
    "1 carrot, julienned",
    "1 cup spinach",
    "1/2 cup mushrooms, sliced",
    "1 fried egg",
    "1 tbsp sesame oil",
    "1 tbsp soy sauce",
    "1 tbsp gochujang",
    "Sesame seeds"
  ],
  instructions: [
    "Sauté vegetables separately with a touch of sesame oil.",
    "Place warm rice in a bowl.",
    "Arrange vegetables neatly over rice.",
    "Top with fried egg.",
    "Drizzle soy sauce and add gochujang before mixing."
  ],
  tags: ["Asian", "Balanced", "Hearty"]
},
{
  title: "Caprese Skewers",
  description:
    "Juicy tomatoes, creamy mozzarella, and fresh basil drizzled with olive oil. Elegant, light, and refreshing.",
  image: "/recipes/caprese-skewers.jpg",
  cuisine: "Italian",
  mealType: "Snacks",
  calories: 220,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "Cherry tomatoes",
    "Mini mozzarella balls",
    "Fresh basil leaves",
    "Extra virgin olive oil",
    "Balsamic glaze",
    "Salt and pepper"
  ],
  instructions: [
    "Thread tomato, basil, and mozzarella onto skewers.",
    "Arrange on serving plate.",
    "Drizzle olive oil and balsamic glaze.",
    "Season lightly before serving."
  ],
  tags: ["Vegetarian", "Light", "Party"]
},
{
  title: "Caesar Salad",
  description:
    "Crisp romaine tossed in a creamy, tangy dressing with crunchy croutons and shaved parmesan. Classic and bold.",
  image: "/recipes/caesar-salad.jpg",
  cuisine: "Italian",
  mealType: "Lunch",
  calories: 380,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "Romaine lettuce, chopped",
    "1/4 cup grated parmesan",
    "1 cup croutons",
    "1 egg yolk",
    "1 clove garlic, minced",
    "1 tbsp lemon juice",
    "2 tbsp olive oil",
    "Salt and black pepper"
  ],
  instructions: [
    "Whisk egg yolk, garlic, lemon juice, and olive oil to form dressing.",
    "Toss lettuce with dressing.",
    "Add croutons and parmesan.",
    "Serve immediately."
  ],
  tags: ["Fresh", "Classic"]
},
{
  title: "Cheese Quesadilla",
  description:
    "Golden, crispy tortilla filled with melted cheese and subtle spice. Comforting, quick, and crowd-pleasing.",
  image: "/recipes/cheese-quesadilla.jpg",
  cuisine: "Mexican",
  mealType: "Snacks",
  calories: 420,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "2 flour tortillas",
    "1 cup shredded cheddar cheese",
    "1 tbsp butter",
    "Pinch of paprika",
    "Salt to taste"
  ],
  instructions: [
    "Heat butter in skillet.",
    "Place tortilla and sprinkle cheese evenly.",
    "Top with second tortilla.",
    "Cook until golden and flip carefully.",
    "Slice and serve warm."
  ],
  tags: ["Quick", "Comfort Food"]
},
{
  title: "Chicken Shawarma",
  description:
    "Spiced roasted chicken wrapped in warm flatbread with creamy garlic sauce and crisp vegetables. Bold, aromatic, and deeply satisfying.",
  image: "/recipes/chicken-shawarma.jpg",
  cuisine: "Middle Eastern",
  mealType: "Lunch",
  calories: 520,
  time: "45 min",
  difficulty: "Medium",
  ingredients: [
    "500g chicken thighs",
    "2 tbsp yogurt",
    "2 tbsp olive oil",
    "3 cloves garlic, minced",
    "1 tsp cumin",
    "1 tsp paprika",
    "1/2 tsp turmeric",
    "Juice of 1 lemon",
    "Salt and black pepper",
    "Pita bread",
    "Sliced cucumber and tomatoes"
  ],
  instructions: [
    "Marinate chicken with yogurt, spices, garlic, lemon juice, salt, and pepper for at least 30 minutes.",
    "Roast or pan-sear chicken until fully cooked and slightly charred.",
    "Rest and slice thinly.",
    "Warm pita bread and fill with chicken and fresh vegetables.",
    "Serve with garlic sauce or tahini."
  ],
  tags: ["Protein Rich", "Hearty", "Street Food"]
},
{
  title: "Empanadas",
  description:
    "Flaky pastry pockets filled with savory spiced meat and vegetables. Golden, comforting, and perfect for sharing.",
  image: "/recipes/empanadas.jpg",
  cuisine: "Spanish",
  mealType: "Snacks",
  calories: 480,
  time: "60 min",
  difficulty: "Medium",
  ingredients: [
    "Pastry dough discs",
    "300g ground meat",
    "1 onion, finely chopped",
    "1/2 tsp cumin",
    "1/2 tsp paprika",
    "Salt and black pepper",
    "1 egg (for brushing)"
  ],
  instructions: [
    "Cook ground meat with onion and spices until browned.",
    "Let filling cool slightly.",
    "Place filling in center of pastry discs.",
    "Fold, seal edges, and brush with beaten egg.",
    "Bake until golden brown."
  ],
  tags: ["Baked", "Comfort Food"]
},
{
  title: "Peanut Energy Bites",
  description:
    "No-bake oat and nut butter bites packed with natural sweetness and crunch. Quick, wholesome, and energizing.",
  image: "/recipes/energy-bites.jpg",
  cuisine: "Global",
  mealType: "Snacks",
  calories: 180,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup rolled oats",
    "1/2 cup peanut butter",
    "2 tbsp honey",
    "1 tbsp chia seeds",
    "1/4 cup dark chocolate chips",
    "Pinch of salt"
  ],
  instructions: [
    "Combine oats, peanut butter, honey, and salt in a bowl.",
    "Fold in chia seeds and chocolate chips.",
    "Roll mixture into small balls.",
    "Chill for 20 minutes before serving."
  ],
  tags: ["Healthy", "No Bake", "Quick"]
},
{
  title: "French Toast",
  description:
    "Thick slices of bread soaked in cinnamon custard and pan-seared until golden. Warm, comforting, and lightly sweet.",
  image: "/recipes/french-toast.jpg",
  cuisine: "French",
  mealType: "Breakfast",
  calories: 430,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "4 slices brioche or thick bread",
    "2 eggs",
    "1/2 cup milk",
    "1 tsp vanilla extract",
    "1/2 tsp cinnamon",
    "1 tbsp butter",
    "Maple syrup for serving"
  ],
  instructions: [
    "Whisk eggs, milk, vanilla, and cinnamon.",
    "Dip bread slices into mixture.",
    "Heat butter in pan and cook until golden on both sides.",
    "Serve warm with maple syrup."
  ],
  tags: ["Sweet", "Brunch", "Comfort Food"]
},
{
  title: "Fruit Nut Mix",
  description:
    "A simple blend of roasted nuts and naturally sweet dried fruits. Crunchy, nourishing, and perfect for on-the-go snacking.",
  image: "/recipes/fruit-nut-mix.jpg",
  cuisine: "Global",
  mealType: "Snacks",
  calories: 260,
  time: "5 min",
  difficulty: "Easy",
  ingredients: [
    "1/2 cup almonds",
    "1/2 cup cashews",
    "1/4 cup raisins",
    "1/4 cup dried cranberries",
    "Pinch of sea salt"
  ],
  instructions: [
    "Combine nuts and dried fruits in a bowl.",
    "Toss lightly with sea salt.",
    "Store in an airtight container."
  ],
  tags: ["Healthy", "Quick"]
},
{
  title: "Goulash",
  description:
    "Slow-simmered beef stew infused with paprika and tender vegetables. Deeply rich, hearty, and comforting.",
  image: "/recipes/goulash.jpg",
  cuisine: "Hungarian",
  mealType: "Dinner",
  calories: 580,
  time: "75 min",
  difficulty: "Medium",
  ingredients: [
    "500g beef chunks",
    "1 large onion, chopped",
    "2 tbsp paprika",
    "2 cloves garlic, minced",
    "1 cup crushed tomatoes",
    "2 cups beef broth",
    "1 tbsp olive oil",
    "Salt and black pepper"
  ],
  instructions: [
    "Brown beef in olive oil.",
    "Add onion and garlic; sauté until softened.",
    "Stir in paprika and tomatoes.",
    "Pour broth and simmer until beef is tender.",
    "Adjust seasoning and serve hot."
  ],
  tags: ["Comfort Food", "Hearty"]
},
{
  title: "Hummus with Veggies",
  description:
    "Creamy homemade hummus served with crisp seasonal vegetables. Smooth, fresh, and naturally satisfying.",
  image: "/recipes/hummus-veg.jpg",
  cuisine: "Middle Eastern",
  mealType: "Snacks",
  calories: 320,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup cooked chickpeas",
    "2 tbsp tahini",
    "1 clove garlic",
    "2 tbsp olive oil",
    "Juice of 1/2 lemon",
    "Salt to taste",
    "Carrot sticks",
    "Cucumber slices",
    "Bell pepper strips"
  ],
  instructions: [
    "Blend chickpeas, tahini, garlic, lemon juice, olive oil, and salt until smooth.",
    "Adjust consistency with a splash of water if needed.",
    "Transfer to a serving bowl and drizzle with olive oil.",
    "Serve with fresh vegetable sticks."
  ],
  tags: ["Vegetarian", "Healthy", "Protein Rich"]
},
{
  title: "Idli Sambar",
  description:
    "Soft steamed rice cakes paired with a fragrant lentil and vegetable stew. Light, comforting, and deeply traditional.",
  image: "/recipes/idli-sambar.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 340,
  time: "45 min",
  difficulty: "Medium",
  ingredients: [
    "Idli batter",
    "1/2 cup toor dal",
    "1/2 cup mixed vegetables (carrot, beans)",
    "1 tbsp tamarind paste",
    "1 tsp sambar powder",
    "Mustard seeds",
    "Curry leaves",
    "Salt to taste"
  ],
  instructions: [
    "Steam idlis until fluffy and set aside.",
    "Cook toor dal until soft and mash lightly.",
    "Add vegetables, tamarind, and sambar powder.",
    "Simmer until vegetables are tender.",
    "Temper with mustard seeds and curry leaves before serving."
  ],
  tags: ["South Indian", "Traditional", "Comfort Food"]
},
{
  title: "Jollof Rice",
  description:
    "West African rice simmered in a rich tomato and pepper base. Bold, vibrant, and full of layered spice.",
  image: "/recipes/jollof-rice.jpg",
  cuisine: "African",
  mealType: "Lunch",
  calories: 550,
  time: "50 min",
  difficulty: "Medium",
  ingredients: [
    "2 cups long-grain rice",
    "1 cup blended tomatoes",
    "1 red bell pepper",
    "1 onion, chopped",
    "2 cloves garlic",
    "1 tsp thyme",
    "1 tsp paprika",
    "2 tbsp vegetable oil",
    "Salt to taste"
  ],
  instructions: [
    "Sauté onion and garlic in oil.",
    "Add blended tomatoes and cook until reduced.",
    "Stir in spices and rice.",
    "Add water, cover, and simmer until rice is tender.",
    "Fluff gently before serving."
  ],
  tags: ["Spicy", "Hearty", "African"]
},
{
  title: "Khichdi",
  description:
    "Comforting rice and lentils gently cooked with turmeric and ghee. Soft, soothing, and nourishing.",
  image: "/recipes/khichdi.jpg",
  cuisine: "Indian",
  mealType: "Dinner",
  calories: 380,
  time: "30 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup rice",
    "1/2 cup moong dal",
    "1/2 tsp turmeric",
    "1 tbsp ghee",
    "1/2 tsp cumin seeds",
    "Salt to taste",
    "Water as needed"
  ],
  instructions: [
    "Rinse rice and lentils together.",
    "Heat ghee and temper cumin seeds.",
    "Add rice, lentils, turmeric, and water.",
    "Cook until soft and slightly creamy.",
    "Serve warm with extra ghee if desired."
  ],
  tags: ["Comfort Food", "Simple", "Vegetarian"]
},
{
  title: "Margherita Pizza",
  description:
    "Classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil. Simple, elegant, and timeless.",
  image: "/recipes/margherita-pizza.jpg",
  cuisine: "Italian",
  mealType: "Dinner",
  calories: 560,
  time: "35 min",
  difficulty: "Medium",
  ingredients: [
    "Pizza dough",
    "1/2 cup tomato sauce",
    "Fresh mozzarella slices",
    "Fresh basil leaves",
    "2 tbsp olive oil",
    "Salt to taste"
  ],
  instructions: [
    "Preheat oven to high temperature.",
    "Spread tomato sauce evenly over rolled dough.",
    "Top with mozzarella slices.",
    "Bake until crust is golden and cheese bubbles.",
    "Finish with fresh basil and olive oil."
  ],
  tags: ["Vegetarian", "Classic"]
},
{
  title: "Masala Oats",
  description:
    "Savory oats cooked with aromatic spices and vegetables. Warm, hearty, and perfectly suited for a balanced start.",
  image: "/recipes/masala-oats.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 310,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup rolled oats",
    "1/2 onion, chopped",
    "1 tomato, chopped",
    "1/2 tsp turmeric",
    "1/2 tsp cumin",
    "1 green chili, chopped",
    "1 tbsp olive oil",
    "Salt to taste"
  ],
  instructions: [
    "Heat oil and sauté onions and chili.",
    "Add tomatoes and cook until soft.",
    "Stir in spices and oats.",
    "Add water and cook until oats are soft.",
    "Serve warm."
  ],
  tags: ["Healthy", "Indian", "Balanced"]
},
{
  title: "Mediterranean Chickpea Bowl",
  description:
    "Protein-rich chickpeas tossed with fresh herbs, crisp vegetables, and lemon-olive dressing. Bright, wholesome, and deeply satisfying.",
  image: "/recipes/med-chickpea.jpg",
  cuisine: "Mediterranean",
  mealType: "Lunch",
  calories: 410,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "1 can chickpeas, rinsed",
    "Cherry tomatoes, halved",
    "1/2 cucumber, diced",
    "1/4 red onion, finely sliced",
    "2 tbsp olive oil",
    "Juice of 1 lemon",
    "Fresh parsley, chopped",
    "Salt and black pepper",
    "Crumbled feta (optional)"
  ],
  instructions: [
    "Combine chickpeas, tomatoes, cucumber, and onion in a bowl.",
    "Whisk olive oil, lemon juice, salt, and pepper.",
    "Toss salad with dressing.",
    "Finish with parsley and feta before serving."
  ],
  tags: ["Vegetarian", "Protein Rich", "Fresh"]
},
{
  title: "Nachos",
  description:
    "Crispy tortilla chips layered with melted cheese, jalapeños, and fresh toppings. Bold, crunchy, and perfect for sharing.",
  image: "/recipes/nachos-salsa.jpg",
  cuisine: "Mexican",
  mealType: "Snacks",
  calories: 520,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "Tortilla chips",
    "1 cup shredded cheddar cheese",
    "Sliced jalapeños",
    "Salsa",
    "Sour cream",
    "Chopped cilantro"
  ],
  instructions: [
    "Spread tortilla chips on baking tray.",
    "Sprinkle cheese evenly over chips.",
    "Bake until cheese melts.",
    "Top with jalapeños, salsa, and sour cream.",
    "Garnish with cilantro before serving."
  ],
  tags: ["Party", "Comfort Food"]
},
{
  title: "Oats with Fruits",
  description:
    "Warm creamy oats topped with fresh seasonal fruits and a drizzle of honey. Light, nourishing, and energizing.",
  image: "/recipes/oats-fruits.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 300,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup rolled oats",
    "1 1/2 cups milk",
    "1 banana, sliced",
    "Mixed berries",
    "1 tbsp honey",
    "Pinch of cinnamon"
  ],
  instructions: [
    "Cook oats with milk until soft and creamy.",
    "Transfer to bowl.",
    "Top with banana and berries.",
    "Drizzle honey and sprinkle cinnamon."
  ],
  tags: ["Healthy", "Quick", "Vegetarian"]
},
{
  title: "Paella",
  description:
    "Spanish saffron rice simmered with seafood and aromatic spices. Vibrant, festive, and deeply flavorful.",
  image: "/recipes/paella.jpg",
  cuisine: "Spanish",
  mealType: "Dinner",
  calories: 650,
  time: "60 min",
  difficulty: "Hard",
  ingredients: [
    "2 cups short-grain rice",
    "Shrimp and mussels",
    "1 red bell pepper, sliced",
    "1 tsp saffron",
    "2 cloves garlic",
    "2 cups seafood broth",
    "2 tbsp olive oil",
    "Salt and paprika"
  ],
  instructions: [
    "Sauté garlic and bell pepper in olive oil.",
    "Add rice and toast lightly.",
    "Stir in saffron and broth.",
    "Add seafood and simmer without stirring.",
    "Cook until rice is tender and liquid absorbed."
  ],
  tags: ["Seafood", "Festive", "Hearty"]
},
{
  title: "Pancakes",
  description:
    "Fluffy golden pancakes with a tender crumb and subtle sweetness. A comforting classic for slow mornings.",
  image: "/recipes/pancakes.jpg",
  cuisine: "American",
  mealType: "Breakfast",
  calories: 440,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup all-purpose flour",
    "1 tbsp sugar",
    "1 tsp baking powder",
    "1 egg",
    "1 cup milk",
    "2 tbsp melted butter",
    "Pinch of salt"
  ],
  instructions: [
    "Mix flour, sugar, baking powder, and salt.",
    "Whisk egg, milk, and melted butter separately.",
    "Combine wet and dry ingredients gently.",
    "Cook ladles of batter on hot pan until bubbles form.",
    "Flip and cook until golden."
  ],
  tags: ["Sweet", "Brunch", "Comfort Food"]
},
{
  title: "PB Banana Toast",
  description:
    "Toasted bread layered with creamy peanut butter and ripe banana slices. Simple, energizing, and perfectly balanced.",
  image: "/recipes/pb-banana-toast.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 360,
  time: "5 min",
  difficulty: "Easy",
  ingredients: [
    "2 slices whole-grain bread",
    "2 tbsp peanut butter",
    "1 ripe banana, sliced",
    "Drizzle of honey",
    "Pinch of cinnamon"
  ],
  instructions: [
    "Toast bread until crisp and golden.",
    "Spread peanut butter evenly.",
    "Top with banana slices.",
    "Drizzle honey and sprinkle cinnamon before serving."
  ],
  tags: ["Quick", "Vegetarian", "Energy Boost"]
},
{
  title: "Pierogi",
  description:
    "Soft dumplings filled with creamy potato and cheese, lightly pan-seared in butter. Comforting and hearty.",
  image: "/recipes/pierogi.jpg",
  cuisine: "Polish",
  mealType: "Dinner",
  calories: 500,
  time: "60 min",
  difficulty: "Medium",
  ingredients: [
    "2 cups flour",
    "1/2 cup warm water",
    "2 cups mashed potatoes",
    "1/2 cup grated cheese",
    "1 onion, finely chopped",
    "2 tbsp butter",
    "Salt and pepper"
  ],
  instructions: [
    "Prepare dough using flour and water; rest for 20 minutes.",
    "Mix mashed potatoes, cheese, salt, and pepper.",
    "Roll dough and cut into circles.",
    "Fill, seal, and boil until dumplings float.",
    "Pan-fry in butter with onions before serving."
  ],
  tags: ["Comfort Food", "Hearty"]
},
{
  title: "Poke Bowl",
  description:
    "Fresh sushi-grade fish layered over seasoned rice with vibrant toppings. Light, colorful, and refreshing.",
  image: "/recipes/poke-bowl.jpg",
  cuisine: "Hawaiian",
  mealType: "Lunch",
  calories: 430,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "2 cups cooked sushi rice",
    "200g raw tuna, diced",
    "1/2 avocado, sliced",
    "Cucumber slices",
    "2 tbsp soy sauce",
    "1 tsp sesame oil",
    "Sesame seeds"
  ],
  instructions: [
    "Place seasoned sushi rice in bowl.",
    "Arrange tuna, avocado, and cucumber on top.",
    "Mix soy sauce and sesame oil; drizzle lightly.",
    "Finish with sesame seeds before serving."
  ],
  tags: ["Fresh", "Protein Rich", "Healthy"]
},
{
  title: "Ratatouille",
  description:
    "Slow-baked layers of zucchini, eggplant, and tomatoes infused with herbs. Rustic, vibrant, and wholesome.",
  image: "/recipes/ratatouille.jpg",
  cuisine: "French",
  mealType: "Dinner",
  calories: 320,
  time: "55 min",
  difficulty: "Medium",
  ingredients: [
    "1 zucchini, sliced",
    "1 eggplant, sliced",
    "2 tomatoes, sliced",
    "2 tbsp olive oil",
    "2 cloves garlic, minced",
    "1 tsp dried thyme",
    "Salt and black pepper"
  ],
  instructions: [
    "Preheat oven and lightly oil baking dish.",
    "Layer vegetables in alternating pattern.",
    "Drizzle olive oil and sprinkle garlic and thyme.",
    "Cover and bake until vegetables are tender.",
    "Serve warm."
  ],
  tags: ["Vegetarian", "Healthy"]
},
{
  title: "Roasted Chickpeas",
  description:
    "Crispy oven-roasted chickpeas tossed in warm spices. Crunchy, protein-packed, and addictive.",
  image: "/recipes/roasted-chickpeas.jpg",
  cuisine: "Global",
  mealType: "Snacks",
  calories: 240,
  time: "30 min",
  difficulty: "Easy",
  ingredients: [
    "1 can chickpeas, drained",
    "1 tbsp olive oil",
    "1/2 tsp paprika",
    "1/2 tsp cumin",
    "Salt to taste"
  ],
  instructions: [
    "Pat chickpeas dry thoroughly.",
    "Toss with olive oil and spices.",
    "Spread on baking tray.",
    "Roast until golden and crispy."
  ],
  tags: ["Healthy", "Vegan", "Quick"]
},
{
  title: "Scrambled Eggs Toast",
  description:
    "Creamy, softly scrambled eggs layered over toasted bread. Simple, classic, and comforting.",
  image: "/recipes/scrambled-eggs-toast.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 350,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "3 eggs",
    "1 tbsp butter",
    "2 slices bread",
    "Salt to taste",
    "Black pepper",
    "Chopped chives"
  ],
  instructions: [
    "Whisk eggs lightly with salt.",
    "Melt butter in pan over low heat.",
    "Cook eggs slowly, stirring gently until creamy.",
    "Toast bread and spoon eggs on top.",
    "Finish with pepper and chives."
  ],
  tags: ["Quick", "Protein Rich"]
},
{
  title: "Smoothie Bowl",
  description:
    "A thick blended fruit base topped with crunchy granola and fresh fruits. Bright, refreshing, and energizing.",
  image: "/recipes/smoothie-bowl.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 320,
  time: "10 min",
  difficulty: "Easy",
  ingredients: [
    "1 frozen banana",
    "1/2 cup frozen berries",
    "1/2 cup Greek yogurt",
    "1/4 cup milk",
    "Granola",
    "Chia seeds",
    "Fresh berries for topping"
  ],
  instructions: [
    "Blend banana, berries, yogurt, and milk until thick and smooth.",
    "Pour into a bowl.",
    "Top with granola, chia seeds, and fresh berries.",
    "Serve immediately."
  ],
  tags: ["Healthy", "Vegetarian", "Fresh"]
},
{
  title: "Sushi Bowl",
  description:
    "Deconstructed sushi with seasoned rice, crisp vegetables, and fresh toppings. Balanced, vibrant, and satisfying.",
  image: "/recipes/sushi-bowl.jpg",
  cuisine: "Japanese",
  mealType: "Lunch",
  calories: 410,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "2 cups cooked sushi rice",
    "1/2 avocado, sliced",
    "Cucumber strips",
    "Carrot julienne",
    "Soy sauce",
    "Pickled ginger",
    "Sesame seeds"
  ],
  instructions: [
    "Place warm sushi rice in bowl.",
    "Arrange avocado, cucumber, and carrot on top.",
    "Drizzle lightly with soy sauce.",
    "Add pickled ginger and sesame seeds before serving."
  ],
  tags: ["Balanced", "Fresh", "Vegetarian"]
},
{
  title: "Teriyaki Chicken",
  description:
    "Juicy chicken glazed in a glossy sweet-savory teriyaki sauce. Rich, sticky, and deeply flavorful.",
  image: "/recipes/teriyaki-chicken.jpg",
  cuisine: "Japanese",
  mealType: "Dinner",
  calories: 520,
  time: "35 min",
  difficulty: "Medium",
  ingredients: [
    "500g chicken thighs",
    "1/4 cup soy sauce",
    "2 tbsp brown sugar",
    "1 tbsp honey",
    "1 tsp grated ginger",
    "2 cloves garlic, minced",
    "1 tsp sesame oil",
    "Sesame seeds"
  ],
  instructions: [
    "Mix soy sauce, sugar, honey, ginger, and garlic.",
    "Sear chicken until golden.",
    "Pour sauce over chicken and simmer until thickened.",
    "Finish with sesame oil and seeds."
  ],
  tags: ["Protein Rich", "Asian"]
},
{
  title: "Tom Yum",
  description:
    "Aromatic Thai hot and sour soup infused with lemongrass and lime. Bright, bold, and refreshing.",
  image: "/recipes/tom-yum.jpg",
  cuisine: "Thai",
  mealType: "Dinner",
  calories: 290,
  time: "30 min",
  difficulty: "Medium",
  ingredients: [
    "200g shrimp",
    "2 stalks lemongrass",
    "1 tbsp chili paste",
    "1 cup mushrooms",
    "Juice of 1 lime",
    "Fish sauce",
    "Fresh coriander"
  ],
  instructions: [
    "Simmer lemongrass in broth to infuse flavor.",
    "Add mushrooms and shrimp.",
    "Stir in chili paste and fish sauce.",
    "Finish with lime juice and coriander before serving."
  ],
  tags: ["Spicy", "Soup", "Seafood"]
},
{
  title: "Upma",
  description:
    "Savory semolina porridge tempered with mustard seeds and curry leaves. Warm, simple, and comforting.",
  image: "/recipes/upma.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 330,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup semolina",
    "1 tsp mustard seeds",
    "Curry leaves",
    "1/2 onion, chopped",
    "1 green chili",
    "2 tbsp oil",
    "Salt to taste"
  ],
  instructions: [
    "Dry roast semolina until fragrant.",
    "Temper mustard seeds, curry leaves, and onion in oil.",
    "Add water and bring to boil.",
    "Stir in semolina and cook until fluffy."
  ],
  tags: ["Indian", "Comfort Food"]
},
{
  title: "Veg Poha",
  description:
    "Flattened rice sautéed with turmeric, peanuts, and vegetables. Light, fragrant, and wholesome.",
  image: "/recipes/veg-poha.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 290,
  time: "15 min",
  difficulty: "Easy",
  ingredients: [
    "2 cups poha",
    "1/2 onion, chopped",
    "1/4 cup peanuts",
    "1/2 tsp turmeric",
    "Curry leaves",
    "Juice of 1/2 lemon",
    "Salt to taste"
  ],
  instructions: [
    "Rinse poha lightly and drain.",
    "Sauté peanuts, onions, and curry leaves.",
    "Add turmeric and poha.",
    "Cook gently and finish with lemon juice."
  ],
  tags: ["Quick", "Vegetarian", "Balanced"]
},
{
  title: "Yogurt Parfait",
  description:
    "Layered yogurt, crunchy granola, and sweet berries served in a glass. Elegant, fresh, and lightly sweet.",
  image: "/recipes/yogurt-parfait.jpg",
  cuisine: "Global",
  mealType: "Breakfast",
  calories: 310,
  time: "5 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup yogurt",
    "1/2 cup granola",
    "Strawberries, sliced",
    "Blueberries",
    "1 tbsp honey"
  ],
  instructions: [
    "Layer yogurt and granola in a glass.",
    "Add strawberries and blueberries between layers.",
    "Finish with a drizzle of honey.",
    "Serve chilled."
  ],
  tags: ["Sweet", "Fresh", "Quick"]
},
{
  title: "Veggie Bowl",
  description:
    "A colorful bowl of roasted vegetables and wholesome grains finished with a light dressing. Nourishing and satisfying.",
  image: "/recipes/veggie-bowl.jpeg",
  cuisine: "Global",
  mealType: "Lunch",
  calories: 420,
  time: "30 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup cooked brown rice",
    "Roasted broccoli",
    "Roasted carrots",
    "Chickpeas",
    "2 tbsp olive oil",
    "Juice of 1/2 lemon",
    "Salt and pepper"
  ],
  instructions: [
    "Cook brown rice and set aside.",
    "Roast vegetables with olive oil until tender.",
    "Assemble rice and vegetables in bowl.",
    "Drizzle lemon juice and season before serving."
  ],
  tags: ["Vegetarian", "Balanced", "Healthy"]
},
{
  title: "Butter Paneer",
  description:
    "Soft paneer cubes simmered in a creamy tomato-butter gravy infused with Indian spices. Rich and comforting.",
  image: "/recipes/butter-paneer.jpg",
  cuisine: "Indian",
  mealType: "Dinner",
  calories: 560,
  time: "40 min",
  difficulty: "Medium",
  ingredients: [
    "200g paneer cubes",
    "1 cup tomato puree",
    "1/2 cup cream",
    "2 tbsp butter",
    "1 tsp garam masala",
    "1 tsp cumin powder",
    "1 tbsp ginger-garlic paste",
    "Salt to taste"
  ],
  instructions: [
    "Heat butter and sauté ginger-garlic paste.",
    "Add tomato puree and cook until thick.",
    "Stir in spices and simmer.",
    "Add paneer cubes and cook gently.",
    "Finish with cream and simmer briefly."
  ],
  tags: ["Indian", "Vegetarian", "Comfort Food"]
},
{
  title: "Pho",
  description:
    "Vietnamese noodle soup with aromatic broth, tender meat, and fresh herbs. Light yet deeply flavorful.",
  image: "/recipes/pho.jpg",
  cuisine: "Vietnamese",
  mealType: "Dinner",
  calories: 460,
  time: "70 min",
  difficulty: "Hard",
  ingredients: [
    "Rice noodles",
    "Beef broth",
    "Thin beef slices",
    "Bean sprouts",
    "Fresh basil",
    "Lime wedges",
    "Fish sauce"
  ],
  instructions: [
    "Simmer broth with aromatics to deepen flavor.",
    "Cook rice noodles separately.",
    "Place noodles and beef in bowl.",
    "Pour hot broth over and top with herbs and sprouts."
  ],
  tags: ["Soup", "Comfort Food", "Asian"]
},
{
  title: "Falafel Wrap",
  description:
    "Crispy chickpea falafel wrapped in warm pita with fresh vegetables and tahini sauce. Crunchy and satisfying.",
  image: "/recipes/falafel-wrap.jpg",
  cuisine: "Middle Eastern",
  mealType: "Lunch",
  calories: 450,
  time: "30 min",
  difficulty: "Medium",
  ingredients: [
    "1 cup soaked chickpeas",
    "Fresh parsley",
    "2 cloves garlic",
    "1 tsp cumin",
    "Pita bread",
    "Tahini sauce",
    "Tomato and cucumber slices"
  ],
  instructions: [
    "Blend chickpeas with parsley, garlic, and cumin.",
    "Shape into balls and fry until crisp.",
    "Warm pita bread.",
    "Fill with falafel, vegetables, and tahini."
  ],
  tags: ["Vegetarian", "Protein Rich"]
},
{
  title: "Moong Dal Chilla",
  description:
    "Savory lentil pancakes packed with protein and subtle spice. Light, wholesome, and nourishing.",
  image: "/recipes/moong-dal-chilla.jpg",
  cuisine: "Indian",
  mealType: "Breakfast",
  calories: 290,
  time: "20 min",
  difficulty: "Easy",
  ingredients: [
    "1 cup soaked moong dal",
    "1 green chili",
    "1/2 tsp cumin",
    "Salt to taste",
    "Oil for cooking"
  ],
  instructions: [
    "Blend soaked dal into smooth batter.",
    "Heat pan and lightly oil.",
    "Spread batter into thin pancake.",
    "Cook both sides until golden."
  ],
  tags: ["Healthy", "Protein Rich", "Vegetarian"]
}
];

const seedData = async () => {
  try {
    await Recipe.deleteMany(); // optional: clears old data
    await Recipe.insertMany(recipes);
    console.log("Recipes Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();