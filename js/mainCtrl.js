var app = angular.module('chatroom');

app.controller('mainCtrl', function($scope, parseService){

  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.

  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to your controllers $scope as messages ($scope.messages)

  $scope.getParseData = function() {
    parseService.getData()
      .then(function(response) {
        // console.log("getParseData response: ", response.data.results);
        $scope.messages = response.data.results;
      });
  }



  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model (index.html:13) correlates to on the input box), pass that text to the postData method on the parseService object, which will then post it to the parse backend.

  $scope.postData = function() {
    var message = $scope.message;
    parseService.postData(message)
      .then(function(response) {
        console.log("postData response: ", response.data);
      });
    $scope.message = '';
    $scope.getParseData();
  };

  // $scope.getParseData();

  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimics a chat room experience.
  setInterval(function(){
    $scope.getParseData();
  }, 1500)
})
