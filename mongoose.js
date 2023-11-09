console.log('mongoose.js start!');

const mongoose = require('mongoose');

// ? userNewUrlParser 이런 건 최신 버전에서 사라졌다는데 지금도 필요할까?
// ! 역시나 필요 없었다.

mongoose.connect(
  "mongodb://127.0.0.1:27017/blog"
)

// * 스키마 정의 : mongoose.Schema
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

// 모델 생성
// ? 모델이란 무엇인가?
// * 데이터를 구조화하고 조작하는데 사용되는 개념! 
// * 스키마를 기반으로 만들어진 객체
const Post = mongoose.model('Post', postSchema);

// 새 게시글 생성 및 저장
async function createPost() {
  const newPost = new Post({
    title: 'My First',
    body: 'This is the content.',
    tags: ['new', 'featured']
  });

  const result = await newPost.save();
  console.log('Post Created:', result);
}

