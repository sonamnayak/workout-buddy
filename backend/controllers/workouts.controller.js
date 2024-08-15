const Workouts = require("../models/workout.model");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workouts.find().sort({ createdAt: -1 });
    res.send(allWorkouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout found." });
  }
  try {
    const workout = await Workouts.findById(req.params.id);
    if (!workout) return res.status(404).send("No such workout found.");
    res.send(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workouts.create({ title, reps, load });
    res.status(201).send(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout found." });
  }
  try {
    const workout = await Workouts.findByIdAndDelete(id);
    if (!workout) return res.status(404).send("No such workout found.");
    res.send(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout found." });
  }
  try {
    const updatedWorkout = await Workouts.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (!updatedWorkout) return res.status(404).send("No such workout found.");
    res.send(updatedWorkout);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout };
