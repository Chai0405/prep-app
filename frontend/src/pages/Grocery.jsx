import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/grocery.css";

export default function Grocery() {

// const [user,setUser] = useState(null);
const [items,setItems] = useState([]);

const navigate = useNavigate();

/* =====================================================
   INGREDIENT ALIASES
===================================================== */

const ingredientAliases = {

"crushed tomatoes":"tomato-puree",
"blended tomatoes":"tomato-puree",
"tomato":"tomatoes",

"extra virgin olive oil":"olive-oil",
"oil":"vegetable-oil",

"mini mozzarella balls":"mozzarella",
"fresh mozzarella slices":"mozzarella",
"crumbled feta":"feta-cheese",
"shredded cheddar cheese":"cheddar-cheese",
"grated cheese":"grated-cheese",
"cheese":"grated-cheese",

"flour tortillas":"tortillas",
"pastry dough discs":"pastry-dough",

"fresh coriander":"coriander-leaves",
"fresh coriander leaves":"coriander-leaves",
"coriander":"coriander-leaves",

"fresh basil leaves":"basil",
"basil leaves":"basil",

"curry leaves":"curry-leaves",
"curry":"curry-leaves",

"boneless chicken thighs":"chicken-thighs",
"chicken breasts":"chicken-breast",

"fried egg":"eggs",
"egg":"eggs",

"thin beef slices":"thin-beef-slices",
"beef":"thin-beef-slices",

"shrimp and mussels":"shrimp-mussels",

"green chili":"green-chilies",
"mixed vegetables":"mixed-veggies",

"red bell pepper":"red-bell-pepper",
"bell pepper strips":"bell-peppers",

"carrot sticks":"carrots",
"carrot julienne":"carrots",
"carrot":"carrots",

"onion":"onions",

"cucumber strips":"cucumber",

"broccoli":"brocolli",

"frozen banana":"banana",
"mixed berries":"berries",

"smoked paprika":"paprika",
"salt and paprika":"salt-paprika",
"cumin seeds":"cumin",

"balsamic glaze":"balsamic-vinegar",
"tahini sauce":"tahini",
"drizzle of honey":"honey",

"all-purpose flour":"flour",
"rolled oats":"oats",

"warm water":"water",

"dried cranberries":"dried-cranberries",
"cranberries":"dried-cranberries",

"maple syrup for serving":"maple-syrup",

"jalapeños":"jalepenos",

"soaked chickpeas":"chickpeas",
"soaked moong dal":"moong-dal",

"ground black pepper":"ground-pepper",
"paneer cubes":"paneer"
};


/* =====================================================
   CLEAN INGREDIENT NAME
===================================================== */

const cleanIngredientName = (ingredient)=>{

let cleaned = ingredient.toLowerCase().trim();

if(/^juice of\s+.*lemon/.test(cleaned)) return "lemon-juice";
if(/^juice of\s+.*lime/.test(cleaned)) return "lemon-juice";
if(/^zest of\s+.*lemon/.test(cleaned)) return "lemon";

if(cleaned.includes(" or ")) cleaned = cleaned.split(" or ")[0];
if(cleaned.includes(" and ")) cleaned = cleaned.split(" and ")[0];

cleaned = cleaned.replace(/\b(large|medium|small|fresh|ripe|thin|roasted|sliced|cooked|dried|freshly|raw)\b/g,"");

cleaned = cleaned.replace(/^(\d+\s\d+\/\d+|\d+\/\d+|\d*\.\d+|\d+)(g|kg|ml|l)?\s*/,"");

cleaned = cleaned.replace(/^(can|cans|packet|packets|bottle|bottles|jar|jars)\s+/,"");

cleaned = cleaned.replace(/^(g|kg|ml|l|cups?|cup|tbsp|tsp|cloves?|clove|stalks?)\s+/,"");

cleaned = cleaned.replace(/\b(slices?|wedges|pieces)\b/g,"");
cleaned = cleaned.replace(/for cooking|for topping|as needed|to taste/g,"");

cleaned = cleaned.replace(/\(.*?\)/g,"");

cleaned = cleaned.replace(/(,?\s*(chopped|minced|halved|diced|grated|thinly|finely|julienned|rinsed|drained|cubed))/g,"");

cleaned = cleaned.trim();
cleaned = cleaned.replace(/[.,]/g,"");
cleaned = cleaned.replace(/^pinch of\s+/,"");

if(ingredientAliases[cleaned]){
return ingredientAliases[cleaned];
}

cleaned = cleaned.replace(/\s+/g,"-");
cleaned = cleaned.replace(/-+$/g,"");

return cleaned;

};


/* ================= IMAGE PATH ================= */

const getIngredientImage = (name)=>{
const key = cleanIngredientName(name);
return `/groceries/${key}.jpg`;
};


/* ================= FETCH USER ================= */

// useEffect(()=>{

// fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`,{
// credentials:"include"
// })
// .then(res=>res.json())
// .then(data=>setUser(data))
// .catch(()=>setUser(null));

// },[]);


/* ================= FETCH GROCERY ================= */

useEffect(()=>{

const token = localStorage.getItem("token");

fetch(`${import.meta.env.VITE_API_URL}/api/grocery`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
.then(res=>res.json())
.then(data=>{
const groceryItems = Array.isArray(data) ? data : data.items || [];
setItems(groceryItems);
})
.catch(err=>console.error(err));

},[]);


/* ================= TOGGLE ================= */

const toggleItem = (index) => {

  const updated = [...items];
  updated[index].checked = !updated[index].checked;

  setItems(updated);

  const token = localStorage.getItem("token");

  fetch(`${import.meta.env.VITE_API_URL}/api/grocery`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({ items:updated })
  });

};


/* ================= PAGE ================= */

return(

<div className="grocery-page">


{/* ================= HERO ================= */}

<section className="grocery-hero">

<div className="grocery-hero-overlay">

<h1>Your ingredients, organized</h1>

<p>
All curated ingredients in one place. Automatically generated from
your weekly plan for effortless shopping.
</p>

</div>

</section>


{/* ================= GROCERY LIST ================= */}

<section className="grocery-content">

<div className="grocery-section">

{items.length === 0 ? (

<div className="grocery-empty">

<h3>No ingredients yet</h3>

<p>
Add meals to your planner to generate a grocery list.
</p>

<button
className="grocery-empty-btn"
onClick={()=>navigate("/recipes")}
>
Open Recipes
</button>

</div>

):(


<>

<h4 className="grocery-section-title">Items</h4>

{items.map((item,index)=>(

<label
key={item._id || index}
className={`grocery-item ${item.checked ? "checked" : ""}`}
>

<img
src={getIngredientImage(item.name)}
alt={item.name}
className="grocery-item-img"
/>

<span className="grocery-item-name">

{cleanIngredientName(item.name)
.replaceAll("-", " ")
.replace(/\b\w/g,c=>c.toUpperCase())}

</span>

<input
type="checkbox"
checked={item.checked}
onChange={()=>toggleItem(index)}
/>

</label>

))}

</>

)}

</div>

</section>


</div>

);

}