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

    // 모든 게시글 조회
    // const foundPosts = await posts.find().toArray();
    // console.log('All Posts : ',foundPosts);

    // 특정 게시글 수정
    const updateResult = await posts.updateOne(
      { _id: insertResult.insertedId }, // 새로 생성된 게시글의 id
      { 
        $set: 
          { 
            title: '수정된 게시글 제목',
            body: 'updated content무언가무언가'
          }
      }
    );
    console.log('Post Updated : ', updateResult.modifiedCount);
    // 변화된 것을 조회해보자
    const foundPosts1 = await posts.find().toArray();
    console.log('All Posts : ',foundPosts1);

  }catch(err){
    console.log("catch error block" + err);
  } finally {
    // MongoDb 닫기 -> 리로스 누출을 막아야 한다.
    await client.close();
  }
}

main()
  .catch(console.error);