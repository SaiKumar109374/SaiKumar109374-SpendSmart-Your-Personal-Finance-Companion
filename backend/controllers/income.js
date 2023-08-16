const Income = require("../models/IncomeModel"); // Import the Income model

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new Income({
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
    await income.save();
    console.log(income); // Keep this line for debugging
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await Income.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (deletedIncome) {
      res.status(200).json({ message: "Income Deleted" });
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
