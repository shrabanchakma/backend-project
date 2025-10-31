import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's full name.
    email: { type: String, required: true, unique: true }, // Unique email address for login.
    age: { type: Number, required: true }, // User's age.

    password: { type: String, required: true }, // Hashed password for authentication.

    address: {
      street: String,
      city: String,
      country: String,
    }, // User's residential address details.

    role: { type: String, enum: ["user", "admin"], default: "user" }, // User's access level/permission group.

    isActive: { type: Boolean, default: true }, // Account status (true for active).

    hobbies: [{ type: String }], // A list of the user's hobbies.

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // References to posts created by the user.
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically.
  }
);

// Export model
export default mongoose.model("User", userSchema);
