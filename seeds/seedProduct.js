const Product = require('../models/product.model')
const mongoose = require('mongoose');
// Connexion à la base données
mongoose.connect("mongodb://127.0.0.1:27017/DataBaseBrain")
    .then(() => {console.log("DataBase Successfully Connected");})
    .catch(err => { console.log("Unable to connect to database", err); process.exit(); });
 

// Sample products
const products = [
    {
      name: 'green shirt',
      image: 'shirt1.jpg',
      categories: ['tops', 'shirts'],
      colors: ['green'] 
    },
    {
      name: 'skirt', 
      image: 'skirt.jpg',
      categories: ['bottoms', 'skirts'], 
      colors: ['black'],
      sizes: ['S', 'M', 'L']
    },
    {
      name: 'dress',
      image: 'dress.jpg',
      categories: ['tops', 'shirts'],
      colors: ['blue'] 
    },
    {
      name: 'djeans',
      image: 'shirt1.jpg',
      categories: ['buttom', 'pants'],
      colors: ['red'] 
    },
    {
      name: 'red shirt',
      image: 'shirt1.jpg',
      categories: ['tops', 'shirts'],
      colors: ['red'] 
    },
  ]
  

  // Populate database
 
  Product.insertMany(products).then(()=> {
    console.log('Database Product collection populated!');// Success 
}).catch((error)=> {
    console.log(error)     // Failure 
});

  
  