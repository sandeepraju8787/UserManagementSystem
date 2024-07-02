// backend/controllers/user-controller.js

import User from "../models/User.js";

export async function homepage(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// New function to get paginated users
export async function getUsers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export async function addCustomer(req, res) {
  res.send("Add Customer Page");
}

export async function postCustomer(req, res) {
  const { firstName, lastName, email } = req.body;

  try {
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export async function view(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export async function edit(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export async function editPost(req, res) {
  try {
    const { firstName, lastName, email } = req.body;
    const userFields = { firstName, lastName, email, updatedAt: Date.now() };

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export async function deleteCustomer(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.deleteOne({ _id: user._id }); // Use User.deleteOne to delete the user

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
