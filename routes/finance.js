const express = require('express');
const prisma = require('../prisma-client');
const convertCurrency = require('../utils/currencyConverter');
const router = express.Router();

// CRUD operations for Transactions
router.post('/transactions', async (req, res) => {
  const { amount, type, categoryId, currency, targetCurrency } = req.body;
  const userId = req.user.id;

  try {
    let convertedAmount = amount;
    if (currency && targetCurrency && currency !== targetCurrency) {
      convertedAmount = await convertCurrency(amount, currency, targetCurrency);
    }

    const transaction = await prisma.transaction.create({
      data: { amount: convertedAmount, type, categoryId, userId },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Error creating transaction' });
  }
});

router.get('/transactions', async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching transactions' });
  }
});

router.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, type, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const transaction = await prisma.transaction.update({
      where: { id: Number(id), userId },
      data: { amount, type, categoryId },
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Error updating transaction' });
  }
});

router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await prisma.transaction.delete({ where: { id: Number(id), userId } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting transaction' });
  }
});

// CRUD operations for Categories
router.post('/categories', async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Error creating category' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching categories' });
  }
});

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Error updating category' });
  }
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting category' });
  }
});

// CRUD operations for Budgets
router.post('/budgets', async (req, res) => {
  const { amount, categoryId, month, year } = req.body;
  const userId = req.user.id;

  try {
    const budget = await prisma.budget.create({
      data: { amount, categoryId, userId, month, year },
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: 'Error creating budget' });
  }
});

router.get('/budgets', async (req, res) => {
  const userId = req.user.id;

  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: { category: true },
    });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching budgets' });
  }
});

router.put('/budgets/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, categoryId, month, year } = req.body;
  const userId = req.user.id;

  try {
    const budget = await prisma.budget.update({
      where: { id: Number(id), userId },
      data: { amount, categoryId, month, year },
    });
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ error: 'Error updating budget' });
  }
});

router.delete('/budgets/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await prisma.budget.delete({ where: { id: Number(id), userId } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting budget' });
  }
});

module.exports = router;
