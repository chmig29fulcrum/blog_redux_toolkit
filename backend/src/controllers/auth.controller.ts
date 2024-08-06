import User from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import bcrypt from "bcryptjs";

export const signup = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const hasshedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hasshedPassword });
  try {
    await newUser.save();
    res.json("signup successfull");
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});
