const Expense = require("../models/ExpenseModel"); // Import the Expense model

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = new Expense({
    title,
    amount,
    category,
    description,
    date,
    user: req.user._id,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    console.log(expense); // Keep this line for debugging
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (deletedExpense) {
      res.status(200).json({ message: "Expense Deleted" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
