const brain = require('brain.js');
const express = require('express');
const router = express.Router();
const Product = require("../models/product.model");
const User = require('../models/user.model');

const network = new brain.recurrent.LSTM();

// Function to fetch users and products from the database
const fetchData = async () => {
  try {
    const users = await User.find();
    const products = await Product.find();
    return { users, products };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const trainNetwork = async () => {
  try {
    const data = await fetchData();
    if (!data || !data.users || !data.products) {
      throw new Error("Could not retrieve users or products");
    }

    const { users, products } = data;
    if (users.length < 2 || products.length < 3) {
      throw new Error("Insufficient users or products for training");
    }

    // Prepare training data using product names
    const trainingData = [
      { input: users[0].name, output: products[0].name },
      { input: users[0].name, output: products[1].name },
      { input: users[1].name, output: products[2].name }
    ];

    // Log training data for debugging
    console.log('Training Data:', trainingData);

    // Train the network
    network.train(trainingData, {
      iterations: 2000,
      log: true,
      logPeriod: 100
    });

    console.log("Network trained successfully");

    return network;
  } catch (error) {
    console.log("Error during training:", error);
    return null;
  }
};

const initialize = async () => {
  try {
    await trainNetwork();
  } catch (error) {
    console.log("Initialization error:", error);
  }
};

// Encode user preferences as a simple input
function encodeUser(userDoc) {
  return userDoc.name;  // Simplified for this example
}

router.get('/:userId', async (req, res) => { 
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const input = encodeUser(user);  
    await initialize();
    const prediction = network.run(input);

    // Log predictions for debugging
    console.log('Predictions:', prediction);

    // Find the matching product by name
    const recommendedProduct = await Product.findOne({ name: prediction });

    if (recommendedProduct) {
      res.status(200).json([recommendedProduct]);  // Return as array to maintain consistency
    } else {
      res.status(200).json([]);  // Return empty array if no match found
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
