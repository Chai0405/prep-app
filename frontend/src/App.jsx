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
import Pantry from "./pages/Pantry";
import CategoryProducts from "./pages/CategoryProducts";
import PantryCategory from "./pages/PantryCategory";
import Checkout from "./pages/Checkout";
import LegalPage from "./pages/LegalPage";
import ScrollToTop from "./components/ScrollToTop";

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

          <Route path="/pantry/fresh-produce" element={<CategoryProducts />} />

          <Route path="/pantry/:category" element={<PantryCategory />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/privacy" element={<LegalPage page="privacy" />} />

          <Route path="/terms" element={<LegalPage page="terms" />} />

          <Route path="/accessibility" element={<LegalPage page="accessibility" />} />

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