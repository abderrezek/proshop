import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { hashSync, compareSync } from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!",
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password, 10);
  },
  _authenticateUser(password) {
    return compareSync(password, this.password);
  },
};

userSchema.statics = {
  list({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  },
};

export default mongoose.model("User", userSchema);
