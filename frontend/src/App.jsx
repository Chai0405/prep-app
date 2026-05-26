import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import PrivacyConsent from "./components/PrivacyConsent";

import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import Planner from "./pages/Planner";
import Grocery from "./pages/Grocery";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import BlogDetail from "./pages/BlogDetail";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Pantry from "./pages/Pantry"
import CategoryProducts from "./pages/CategoryProducts";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import Bakery from "./pages/Bakery";
import Protein from "./pages/Protein";
import Seafood from "./pages/Seafood";
import Spices from "./pages/Spices";
import Dairy from "./pages/Dairy";
import Oils from "./pages/Oils";
import Grains from "./pages/Grains";
import DryFruits from "./pages/DryFruits";
import Beverages from "./pages/Beverages";
import Sauces from "./pages/Sauces";
import Herbs from "./pages/Herbs";
import TeaCoffee from "./pages/TeaCoffee";
import Organic from "./pages/Organic";

export default function App() {
  return (
    <BrowserRouter>

     <ScrollToTop />

      <Routes>

        {/* Landing without navbar */}
        <Route path="/" element={<Landing />} />

        {/* Public pages WITH navbar */}
        <Route element={<Layout />}>

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />

          <Route path="/about" element={<About />} />

          <Route path="/pantry" element={<Pantry />} />

          <Route path="/pantry/bakery" element={<Bakery />} />

          <Route path="/pantry/:category" element={<CategoryProducts />} />

          <Route path="/pantry/protien-meat" element={<Protein />} />

          <Route path="/pantry/seafood" element={<Seafood />} />

          <Route path="/pantry/dairy-eggs" element={<Dairy />} />

          <Route path="/pantry/spices" element={<Spices />} />

          <Route path="/pantry/oils" element={<Oils />} /> 

          <Route path="/pantry/pulses-grains" element={<Grains />} /> 

          <Route path="/pantry/dry-fruits" element={<DryFruits />} /> 
          
          <Route path="/pantry/beverages" element={<Beverages />} />

          <Route path="/pantry/jams-sauces" element={<Sauces />} />

          <Route path="/pantry/herbs" element={<Herbs />} />
          
          <Route path="/pantry/tea-coffee" element={<TeaCoffee />} />

          <Route path="/pantry/organic" element={<Organic />} />

          <Route path="/checkout" element={<Checkout />} />

        </Route>


        {/* Auth pages without navbar */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        {/* Protected pages WITH navbar */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/planner" element={<Planner />} />

          <Route path="/grocery" element={<Grocery />} />

        </Route>

      </Routes>

      <PrivacyConsent />

    </BrowserRouter>
  );
}