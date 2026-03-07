import Planner from "../models/Planner.js";
import Grocery from "../models/Grocery.js";
import Recipe from "../models/Recipe.js";
import mongoose from "mongoose";

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
(ids || []).filter(id =>
mongoose.Types.ObjectId.isValid(id)
);

});

});

/* ---------- SAVE PLANNER ---------- */

const planner = await Planner.findOneAndUpdate(
{user:userId,weekStart},
{user:userId,weekStart,meals:cleanedMeals},
{upsert:true,returnDocument:"after"}
);

/* ---------- BUILD GROCERY ---------- */

const ingredientSet = new Set();

for(const dayMeals of Object.values(cleanedMeals)){

for(const mealIds of Object.values(dayMeals)){

for(const id of mealIds){

const recipe = await Recipe.findById(id);

recipe?.ingredients?.forEach(i=>{
ingredientSet.add(i.toLowerCase().trim());
});

}

}

}

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