// require('dotenv').config(); 
// ? 이것이 하는 역할은 무엇일까?
// ? .env가 잘 작동되는지, 환경 변수를 로드했는지 체크할 때 사용
// * 설치 명령어 : npm install dotenv

console.log('app.js loaded');

//* 설치 명령어 : npm install mongodb
// * MongoDB Node.js 드라이버를 설치한다.
const { MongoClient } = require('mongodb');


async function main(){
  // atlas는 대시보드에서 연결 문자열을 사용할 수 있다.
  // 연결 문자열과 같은 민감한 정보는 하드코딩 대신 환경 변수를 통해 관리하는 것이 좋다.
  //process.env 객체를 사용하는 방법을 채택
  // const uri = process.env.MONGODB_URI; 

  // 직접 문자열을 적는 패턴을 선택
  // const uri = "mongodb://localhost:27017"; 
  // ! IPv4 주소로만 연결을 허용하도록 설정되어 있는 것 같다.
  // * mongod --bind_ip 127.0.0.1,:: --port 27017 를 적어 ip를 푼다.

  const uri = "mongodb://127.0.0.1:27017";
  console.log(uri); //  mongodb:// 또는 mongodb+srv:// 로 시작된다.  
  const client = new MongoClient(uri);
  

  try {
    await client.connect(); // MongoDB에 연결 시도
    console.log("MongoDB 작성, localhost:27017")

    // * 여기서 데이터베이스 작업 수행
    // 'test' 데이터베이스 선택
    const db = client.db('test');

    // 'users' 컬렉션 선택
    const users = db.collection('users');

    // 새로운 사용자 추가
    const newUser = { name: "John Doe", age: 30, email: "johndoe@example.com" };
    const insertResult = await users.insertOne(newUser);
    console.log(`New user inserted with id ${insertResult.insertedId}`);

    // 모든 사용자 조회
    const foundUsers = await users.find().toArray();
    console.log("Found users:", foundUsers);
    

  }catch(err) {
    console.log(err, "catch 구분 작동");
  } finally {
    await client.close() // MongoDB 연결 닫기
  }
}

main().catch(console.error);