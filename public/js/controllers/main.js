(function() {

    angular.module('trendMap')

    // inject the Profile service factory into our controller
    .controller('mainCtrl', mainController);

    function mainController($scope, $http, CheckTwitter) {

        $scope.analyze = false;
        $scope.showtweets = false;
        $scope.formData = {};
        $scope.formData.tweet_count = 50;
        $scope.loading = false;

        // checkTwitter ==================================================================
        $scope.checkTwitter = function() {
            // validate Account
            if ($scope.formData.screen_name != undefined) {
                $scope.loading = true;
                $scope.analyze = true;
                $scope.showtweets = false;
                CheckTwitter.get($scope.formData.screen_name, $scope.formData.tweet_count)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.twitterdata = data;
                    $scope.twitterdata.mc_female = (Number($scope.twitterdata.prediction.predictions_meta_proba_F)*100).toFixed(2);
                    $scope.twitterdata.mc_male = (Number($scope.twitterdata.prediction.predictions_meta_proba_M)*100).toFixed(2);
                    // $scope.twitterdata.tc_distance = (Number($scope.twitterdata.prediction.predictions_text_distance)*100).toFixed(2);
                    $scope.twitterdata.tc_male = (Number($scope.twitterdata.prediction.predictions_text_proba_M)*100).toFixed(2);
                    $scope.twitterdata.tc_female = (Number($scope.twitterdata.prediction.predictions_text_proba_F)*100).toFixed(2);
                    $scope.twitterdata.nc_female = (Number($scope.twitterdata.prediction.probabilities_name_F)*100).toFixed(2);
                    $scope.twitterdata.nc_male = (Number($scope.twitterdata.prediction.probabilities_name_M)*100).toFixed(2);
                    $scope.twitterdata.nc_neutral = (Number($scope.twitterdata.prediction.probabilities_name_N)*100).toFixed(2);
                    // console.log(data);
                });
            }
        };
    }
})();
