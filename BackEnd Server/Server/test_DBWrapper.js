var test = require('./DBWrapper.js').init('db_test', {});

test.saveDocument('3', {helloz:'hzi', hiz:'helloz'}, (err, res)=>{
  //console.error(err);
  test.getDocument('3', (err, doc)=>{
    console.log(doc);
  });
  test.update('3', {helloz:'helloz', hiz:'hiz'}, (err, res) => {
    test.getDocument('3', (err, doc)=>{
      console.log(doc);
    });
  });
});
