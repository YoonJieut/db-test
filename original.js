console.log('original Start!');

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function main() {
  try{

  }catch(err){
    console.log("catch error block" + err);
  } finally {
    // MongoDb 닫기 -> 리로스 누출을 막아야 한다.
    await client.close();
  }


}