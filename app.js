console.log('app.js loaded');

// npm install mongodb -> MongoDB Node.js 드라이버를 설치한다.

async function main(){
  // atlas는 대시보드에서 연결 문자열을 사용할 수 있다.
  // 연결 문자열과 같은 민감한 정보는 하드코딩 대신 환경 변수를 통해 관리하는 것이 좋다.
  //process.env 객체를 사용하는 방법을 채택
  const uri = process.env.MONGODB_URI; 
  console.log(uri);
  
  const client = 
    new MongoClient(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

  try {
    
  }catch(err) {
    console.log(err, "catch 구분 작동");
  } finally {
    await client.close() // MongoDB 연결 닫기
  }
}

main().catch(console.error);