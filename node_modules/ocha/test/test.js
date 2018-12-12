var sass = require('node-sass');

describe('Ocha', () => {
  it('works', done => {
    sass.render({ file: 'test/test.scss' }, function(err, data) {
      if (err) console.log(err.message);
      done();
    });
  });
});
