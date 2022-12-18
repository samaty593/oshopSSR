import { Handler } from "@netlify/functions";
const { MongoClient } = require("mongodb");


const handler: Handler = async (event, context) => {
  const uri = "mongodb+srv://samaty:FRC15I0YTyGZyNj9@cluster0.4bufuul.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  const token = event.body;
  const database = client.db('Oshop');  

  async function getList() {
    const products = database.collection('products');
    try {
      return await products.find({}).toArray();
    } finally {
      await client.close();
      }
    }

  try {
    const res = await getList();
    return {
        statusCode: 200,
        body: JSON.stringify(res),
        multiValueHeaders: { "Cache-Control" : [ 'public', 'max-age=86400'] }
      }
    } catch(err) {
        console.log(err);
        return {
          statusCode: 500,
          body: err.toString(),
        }
   }
}

export { handler };