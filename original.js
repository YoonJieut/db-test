console.log('original Start!');
const { MongoClient } = require('mongodb');

// uri 파트는 조금 더 조사가 필요하지만 IPv6을 허용하는 세팅을 하는 것이 좋아보인다.
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
  try{
    // connect로 연결해주기
    await client.connect();
    console.log('connected to db');

    // * 이제 여기에 발동될 로직 추가.
    // 데이터베이스와 컬렉션 선택
    const db = client.db('blog');
    const posts = db.collection('posts');

    // * 이 부분은 class를 사용하면 편할 것 같다.
    // 새 게시글 생성 및 저장
    const newPost = {
      title : '1st blog post',
      body : 'this is content',
      tags : ['new', 'featured'],
      data : new Date()
    };

    const insertResult = await posts.insertOne(newPost);
    console.log('post created-insertedId', insertResult.insertedId);

    const foundPosts = await posts.find().toArray();
    console.log('All Posts : ',foundPosts);



  }catch(err){
    console.log("catch error block" + err);
  } finally {
    // MongoDb 닫기 -> 리로스 누출을 막아야 한다.
    await client.close();
  }


}

main()
  .catch(console.error);