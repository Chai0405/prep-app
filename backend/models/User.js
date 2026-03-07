import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    avatar: {
      type: String,
      default: ""
    },

    dietPreference: {
      type: String,
      default: "Balanced"
    },
    isVerified:{
type:Boolean,
default:false
},
    verifyToken:String,
    resetToken:String,
    resetTokenExpire:Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);