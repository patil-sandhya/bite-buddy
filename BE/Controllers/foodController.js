const FoodItem = require('../Models/foodItem');

// Create
exports.createFood = async (req, res) => {
  try {
    const food = new FoodItem(req.body);
    const saved = await food.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getAllFoods = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    // Category filter
    if (category && category.toLowerCase() !== 'all') {
      filter.category = { $regex: new RegExp(category, 'i') }; // case-insensitive
    }

    // Search by name
    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') }; // case-insensitive partial match
    }

    const foods = await FoodItem.find(filter);
    
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getFoodById = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateFood = async (req, res) => {
  try {
    const updated = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteFood = async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
