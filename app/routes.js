var request = require('request');
var cheerio = require('cheerio');
var Client = require('node-rest-client').Client;
var client = new Client();

var Twit = require('twit');
var T = new Twit({
  consumer_key:         'xx',
  consumer_secret:      'xx',
  access_token:         'xx-xx',
  access_token_secret:  'xx'
});
function concatenateTweets(tweets, callback) {
    tweetsConcat = ""
    tweetsColl = []
    for(var i = 0; i < tweets.length-1; i++) {
        tweetsConcat = tweetsConcat + tweets[i].text + ". "
        tweetsColl.push(tweets[i].text)
    }
    callback(tweetsConcat, tweetsColl)
}
function getTwitterUser(res, user, tweet_count){
    tweet_count = parseInt(tweet_count) + 1
    console.log(tweet_count)
    T.get('statuses/user_timeline', { screen_name: user, count: tweet_count },  function (err, response) {
        console.log(response.length)
        if (!err && response.length > 1) {
            concatenateTweets(response, function(concatTweets, tweetsColl) {
                response[0].user.profile_image_url = response[0].user.profile_image_url.replace("_normal","");
                cname = response[0].user.name + ' ' + response[0].user.screen_name;
                console.log(tweetsColl.length)
                makePrediction(concatTweets, cname, function(prediction) {
                    console.log(prediction)
                    response = {
                        name: cname,
                        prediction: prediction,
                        twitter_profile: response[0].user,
                        concatTweets: concatTweets,
                        tweetsCollection: tweetsColl
                    };
                    res.json(response);
                });
            })
        }
        if (err) {
            console.log(err)
            res.json(err);

        }
        if (response.length < 1) {
            console.log('not enaugh tweets (<1)')
            response = {
                cerr: true
            };
            res.json(response);
        }

    })
}

function makePrediction(concatTweets, name, callback) {
    var args = {
        data: {
            name: name,
            tweets: concatTweets
        },
        headers: { "Content-Type": "application/json" }
    };

    client.post("http://ec2-52-210-247-183.eu-west-1.compute.amazonaws.com/classification/api/v1.0/meta_predict", args, function (data, response) {
        // parsed response body as js object
        callback(data);
    });
}

// -------
module.exports = function(app) {

	// apis ---------------------------------------------------------------------
    // get all profiles
    app.get('/api/twitterprofile/:tweet_count/:screen_name', function(req, res) {
        //console.log('123');
        // db access
        getTwitterUser(res, req.params.screen_name, req.params.tweet_count);
    });
	// get all profiles


	// application views -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.render('index.jade');
	});

};
