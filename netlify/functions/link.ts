import { Handler } from "@netlify/functions";

var jwt = require('jsonwebtoken');
const { MongoClient } = require("mongodb");
const BSON = require('bson');



const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  const token = event.body;
  const decoded = jwt.decode(token);
  const database = client.db('Oshop');
  const API = event.headers["x-api"];



  async function category() {
    const categories = database.collection('categories');
    try {
      const query = { "_id": BSON.ObjectId("6367a1148edec656cccc0ff8") };
      const res = await categories.findOne(query);
      return {
        statusCode: 200,
        body: JSON.stringify(res.categories),
        multiValueHeaders: { "Cache-Control" : [ 'public', 'max-age=86400'] }
      }
    } catch {
        return {
          statusCode: 500,
          body: JSON.stringify({error: "category not found"})
        }
    } finally {
        await client.close();
    } 


  };

  async function product() {
    const productItem = JSON.parse(event.body);
    const products = database.collection('products');
    try {
      const newItem = {
        "title": productItem.title,
        "price": productItem.price,
        "category": productItem.category,
        "imageUrl": productItem.imageUrl,
      }
      return await products.insertOne(newItem);
    } finally {
      await client.close();
    }
  }

  async function getOne() {
    const id = event.queryStringParameters['id'];
    const products = database.collection('products');
    const query = { '_id': BSON.ObjectId(id) }
    try {
      const res = await  products.findOne(query);
        return {
          statusCode: 200,
          body: JSON.stringify(res)
        }
    } catch {
        return {
          statusCode: 500,
          body: 'could not fin the product'
        }
    } finally {
      await client.close();
    }

 


  }

  async function update() {
    const products = database.collection('products');
    const id = event.queryStringParameters['id'];
    const query = { '_id': BSON.ObjectId(id) };
    const prod = JSON.parse(event.body);
    try {
      var res = await products.updateOne(query, { "$set": prod })
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      }
    } catch(err) {
        console.log(err);
        return {
          statusCode: 500,
          body: err.toString()
        }
    } finally {
        await client.close();
    }
    
    

  }

  async function deleteOne() {
    const products = database.collection('products');
    const id = event.queryStringParameters['id'];
    const query = { '_id': BSON.ObjectId(id) };
    try {
      var res = await products.deleteOne(query)
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      }
    } catch(err) {
        console.log(err);
        return {
          statusCode: 500,
          body: err.toString()
        }
    } finally {
        await client.close();
    }
  }


    if (API == 'category') {
      return await category()}
    else 
      if (API == 'products') {
        try {
          const res = await product();
          return {
            statusCode: 200,
            body: `Successfully inserted item with _id: ${res.insertedId}`
          }
        } catch(err) {
          return {
            statusCode: 500,
            body: `Failed to insert item: ${err}`
          }
        }
      }
    else
      if (API == 'getOne') {
        return await getOne();
      }
    else
      if (API == 'updateOne') {
           return await update();
      }
    else
      if (API == 'deleteOne') {
        return await deleteOne();
      }
    else {
      return {
        statusCode: 500,
        body: `Failed to get any APi `
      }
    }
}

export { handler };