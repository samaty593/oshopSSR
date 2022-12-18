import { Handler } from "@netlify/functions";
const { MongoClient } = require("mongodb");
const BSON = require('bson');


const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const database = client.db('Oshop');  
  const carts = database.collection('shopping-carts');

  async function createCart() {
    try {
        const doc = {
            'dateCreated': new Date().getTime(),
            'items': [],
            'count': 0
        };
        const res = await carts.insertOne(doc);
        return {
          statusCode: 200,
          body: JSON.stringify(res),
        }
    } catch(err) {
      console.log(err);
      return {
        statusCode: 500,
        body: err.toString(),
      }
    } finally {
        await client.close();
      }
    }

 return createCart()
}

export { handler };