console.log('mongoose.js start!');

const mongoose = require('mongoose');

// ? userNewUrlParser 이런 건 최신 버전에서 사라졌다는데 지금도 필요할까?

mongoose.connect(
  "mongodb://127.0.0.1:27017/blog", 
  { useNewUrlParser: true, useUnifiedTopology: true }
)

