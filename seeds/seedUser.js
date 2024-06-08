const User = require('../models/user.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

  // Connexion à la base données
  mongoose.connect("mongodb://127.0.0.1:27017/DataBaseBrain")
  .then(() => {console.log("DataBase Successfully Connected");})
  .catch(err => { console.log("Unable to connect to database", err); process.exit(); });
  
const allProducts = async () => {
  try {
    const articles = await Product.find();
    return articles;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const populateDatabase = async () => {
  const users = []
  try {
    // Fetch products from the database
    await allProducts().then((products) =>{
      console.log(products)
   

      // Sample users with product references
      
      users.push({
        name: 'Mia Doe',
        likes: [products[0]._id, products[1]._id] 
      })
      users.push(
      {
        name: 'Jiji Doe',
        likes: [products[0]._id, products[1]._id] ,
        dislikes: [products[2]._id] 
      })   
      users.push(
        {
          name: 'Alan Doe',
          likes: [products[4]._id] ,
          dislikes: [products[0]._id, products[1]._id] 
        })  
      users.push(
          {
            name: 'Emma Doe',
            likes: [products[1]._id] ,
            dislikes: [products[4]._id] 
          })  
      users.push(
            {
              name: 'Alex Doe',
              dislikes: [products[1]._id] 
            })  
      users.push(
              {
                name: 'Sarah Doe',
                dislikes: [products[1]._id] 
              })  
        
    })
     // Populate the User collection
     await User.insertMany(users);
     console.log('Database User collection populated!'); // Success
  } 
    catch (error) {
      console.log("Error:", error);
     
    }

};

// Execute the function to populate the database
populateDatabase();
