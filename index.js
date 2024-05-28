const express = require('express');
const dotenv = require('dotenv');
const prisma = require('./prisma-client');
const authRoutes = require('./routes/auth');
const financeRoutes = require('./routes/finance');
const { authenticateToken } = require('./middleware/authenticate');
const {Chartsrouter}=require("./routes/charts")
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res)=>{
  res.send("Wellcome to dashboard")
})
// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/finance', authenticateToken, financeRoutes);
app.use('/finance', authenticateToken, Chartsrouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
