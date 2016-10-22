angular.module('trendMap')

	// check Twitter and predict
	.factory('CheckTwitter', ['$http',function($http) {
		return {
			get : function(screen_name, tweet_count) {
				return $http.get('/api/twitterprofile/' + tweet_count + '/' + screen_name);
			}
		}
	}]);
