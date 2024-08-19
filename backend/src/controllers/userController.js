const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Retrieved Users:', users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, age, dateOfBirth, gender } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        age,
        dateOfBirth,
        gender,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
