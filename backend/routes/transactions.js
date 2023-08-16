const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

const router = express.Router();

router.post("/add-income", protect, addIncome);
router.get("/get-incomes", protect, getIncomes);
router.delete("/delete-income/:id", protect, deleteIncome);
router.post("/add-expense", protect, addExpense);
router.get("/get-expenses", protect, getExpense);
router.delete("/delete-expense/:id", protect, deleteExpense);

module.exports = router;
