console.log("the bot is starting");

var Twit= require('twit');
var config= require('./config.js');

var Twitter= new Twit(config);

var favoriteTweet= function(){
var params = {
  q:'#bluewave2018, #impeachment',
  result_type:'recent',
  count:3,
  lang:'en'
}

Twitter.get('search/tweets', params, function(err, data){
  var tweet= data.statuses
  var randomTweet= ranDom(tweet);

if(typeof randomTweet != 'undefined'){
  Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
    if(err){
      console.log("an error has occured, can not favorite");
    }else{
      console.log("favorited!");
      }
    });
  }
});
}

favoriteTweet();
setInterval(favoriteTweet, 1000*20);

function ranDom (arr) {
  var index= Math.floor(Math.random()*arr.length);
  return arr[index];
};

/*
 T.get('search/tweets', params, function(err, data) {
      
        if (!err) {
          
            var retweetId = data.statuses[0].id_str;
           
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
