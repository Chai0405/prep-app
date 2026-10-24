import Planner from "../models/Planner.js";
import Grocery from "../models/Grocery.js";
import Recipe from "../models/Recipe.js";
import mongoose from "mongoose";

/* ================= GROCERY FROM PLAN ================= */

// Rebuilds the user's grocery list from a week's meals,
// keeping the ticked state of items that are still on it
const rebuildGrocery = async (userId, meals) => {

const recipeIds = Object.values(meals || {})
.flatMap(dayMeals => Object.values(dayMeals || {}).flat());

const recipes = await Recipe.find({_id:{$in:recipeIds}}).select("ingredients");

const ingredientSet = new Set();

recipes.forEach(recipe=>{
recipe.ingredients?.forEach(i=>{
ingredientSet.add(i.toLowerCase().trim());
});
});

let grocery = await Grocery.findOne({user:userId});

if(!grocery){
grocery = new Grocery({user:userId,items:[]});
}

const checkedMap = {};
grocery.items.forEach(i=>checkedMap[i.name]=i.checked);

grocery.items = Array.from(ingredientSet).map(name=>({
name,
checked:checkedMap[name] || false
}));

await grocery.save();

};

/* ================= SAVE PLANNER ================= */

export const addToPlanner = async (req,res) => {

try{

const userId = req.user;
const {weekStart,meals} = req.body;

/* ---------- CLEAN IDS ---------- */

const cleanedMeals = {};

Object.entries(meals || {}).forEach(([day,mealTypes])=>{

cleanedMeals[day] = {};

Object.entries(mealTypes || {}).forEach(([mealType,ids])=>{

cleanedMeals[day][mealType] =
(ids || [])
.map(item => typeof item === "object" ? item._id : item)
.filter(id => mongoose.Types.ObjectId.isValid(id));

});

});

/* ---------- SAVE PLANNER ---------- */

const planner = await Planner.findOneAndUpdate(
{user:userId,weekStart},
{user:userId,weekStart,meals:cleanedMeals},
{upsert:true,returnDocument:"after"}
);

/* ---------- BUILD GROCERY ---------- */

await rebuildGrocery(userId, cleanedMeals);

res.json({planner});

}catch(err){

console.error("Planner save error:",err);
res.status(500).json({message:"Planner save failed"});

}

};

/* ================= GET PLANNER ================= */

export const getPlanner = async (req,res)=>{

try{

const {weekStart} = req.query;

const planner = await Planner
.findOne({user:req.user,weekStart})
.populate("meals.monday.breakfast meals.monday.lunch meals.monday.dinner meals.monday.snacks \
meals.tuesday.breakfast meals.tuesday.lunch meals.tuesday.dinner meals.tuesday.snacks \
meals.wednesday.breakfast meals.wednesday.lunch meals.wednesday.dinner meals.wednesday.snacks \
meals.thursday.breakfast meals.thursday.lunch meals.thursday.dinner meals.thursday.snacks \
meals.friday.breakfast meals.friday.lunch meals.friday.dinner meals.friday.snacks \
meals.saturday.breakfast meals.saturday.lunch meals.saturday.dinner meals.saturday.snacks \
meals.sunday.breakfast meals.sunday.lunch meals.sunday.dinner meals.sunday.snacks");

res.json(planner || {meals:{}});

}catch(err){

console.error("Planner fetch error",err);
res.status(500).json({message:"Planner fetch failed"});

}

};

/* ================= ADD ONE MEAL ================= */

const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const MEAL_TYPES = ["breakfast","lunch","dinner","snacks"];

// Adds a single recipe to one day/meal in one request (used by "Add to planner")
export const addMealToPlanner = async (req,res)=>{

try{

const userId = req.user;
const { weekStart, recipeId } = req.body;
const day = String(req.body.day || "").toLowerCase();
const meal = String(req.body.meal || "").toLowerCase();

if(!DAYS.includes(day) || !MEAL_TYPES.includes(meal)){
return res.status(400).json({message:"Choose a valid day and meal"});
}

if(!weekStart || Number.isNaN(new Date(weekStart).getTime())){
return res.status(400).json({message:"Invalid week"});
}

if(!mongoose.Types.ObjectId.isValid(recipeId) || !(await Recipe.exists({_id:recipeId}))){
return res.status(404).json({message:"Recipe not found"});
}

const path = `meals.${day}.${meal}`;

// $addToSet: adding the same recipe twice is a no-op
const before = await Planner.findOneAndUpdate(
{user:userId,weekStart},
{$addToSet:{[path]:recipeId}},
{upsert:true,returnDocument:"before"}
);

const alreadyPlanned = Boolean(
before?.meals?.[day]?.[meal]?.some(id => String(id) === String(recipeId))
);

if(!alreadyPlanned){
const planner = await Planner.findOne({user:userId,weekStart}).lean();
await rebuildGrocery(userId, planner?.meals);
}

res.status(alreadyPlanned ? 200 : 201).json({ day, meal, alreadyPlanned });

}catch(err){

console.error("Add meal error:",err);
res.status(500).json({message:"Couldn't add to planner"});

}

};
