import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {type: String, required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    imageUrl: {type: String, required: true}
}, {timestamps: true});

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User;