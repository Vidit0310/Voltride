const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/prisma');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const plainPassword = body.password;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(plainPassword, saltRounds);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    await prisma.$disconnect();
    res.status(201).json({
      message: "User created successfully",
      token
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/signin', async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({
      message: "Login Sucsessfull",
      token
    });
  }
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
