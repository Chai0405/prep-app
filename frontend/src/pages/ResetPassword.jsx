import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/reset.css";

export default function ResetPassword(){

const { token } = useParams();
const navigate = useNavigate();

const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const handleSubmit = async (e)=>{
e.preventDefault();

try{

await axios.post(
`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
{password}
);

setMessage("Password updated successfully");

setTimeout(()=>{
navigate("/auth");
},2000);

}catch(err){
    console.error("Reset failed",err)
setMessage("Something went wrong. Please try again.");
}

};

return(

<div className="reset-page">

{/* LOGO */}
<Link to="/" className="reset-logo">
<img src="/logo.png" alt="Prep"/>
</Link>

{/* LEFT IMAGE */}
<div className="reset-left">
<img src="/reset-password.webp" alt="Food prep"/>
</div>

{/* RIGHT SIDE */}
<div className="reset-right">

<div className="reset-box">

<h2>Reset your password</h2>

<p className="reset-sub">
Enter a new password for your account.
</p>

<form onSubmit={handleSubmit}>

<input
type="password"
placeholder="New password"
minLength="10"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Update Password
</button>

</form>

{message && (
<p className="reset-message">{message}</p>
)}

<div className="reset-footer">
<Link to="/auth">Back to login</Link>
</div>

</div>

</div>

</div>

);

}