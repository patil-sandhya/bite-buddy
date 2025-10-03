const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/foods', require('./Routes/food'));
app.use('/api/user', require('./Routes/user'));
app.use('/api/cart', require('./Routes/cart'));
app.use('/api/order', require('./Routes/order'));

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
