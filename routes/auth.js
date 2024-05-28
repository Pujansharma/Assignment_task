const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma-client');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(400).json({ error: 'Email not found' });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header('Authorization', token).json({ token });
});

module.exports = router;
