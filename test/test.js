var assert = require('assert');
var req = require('request');

function check_L_field(urlStr, done) {
    req({ url : urlStr,
      	  method : "GET", 
      	  headers: {'content-type': 'text/plain'}
      	}, 
      	function (error, response, body) {
          assert.equal(null, error); // make sure that there is no error
          assert.equal(200, response.statusCode); // make sure that success response is received
          var jsonObj = body.replace(/\//g, ""); //Sanitize Json object. Remove "\" characters present in API
          jsonObj = JSON.parse(jsonObj);
          assert.equal(1, jsonObj[0].hasOwnProperty('l')); // assert for L field in Json
          done(); //wait till this asynchornous callback is executed
        });
}

describe('API testing for L field', function() {
  it('PYPL L field presence test', function(done) {
    check_L_field("http://finance.google.com/finance/info?client=ig&q=NSE:PYPL", done);
  });
  
  it('EBAY L field presence test', function(done) {
    check_L_field("http://finance.google.com/finance/info?client=ig&q=NSE:EBAY", done);
  });
  
  it('PP L field presence test', function(done) {
    check_L_field("http://finance.google.com/finance/info?client=ig&q=NSE:PP", done);
  });
});