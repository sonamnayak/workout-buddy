const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.register = async function (email, password) {
  const exists = await this.findOne({ email });
  if (exists) throw Error("User with this email already exists.");
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");
  const comp = await bcrypt.compare(password, user.password);
  if (!comp) throw Error("Incorrect password");
  return user;
};

module.exports = mongoose.model("User", userSchema);
