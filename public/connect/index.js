myApp.controller("connectController",function($scope,$rootScope,$timeout){
    var db = firebase.firestore();
    $scope.result = [];$scope.bookings = [];
    db.collection("connect").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            $scope.result.push({...doc.data(),id:doc.id});
        });
        $timeout(function(){
            $scope.$apply()
        },1);
    });
    db.collection("book").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            $scope.bookings.push({...doc.data(),id:doc.id});
        });
        $timeout(function(){
            $scope.$apply()
        },1);
    });
});

myApp.controller("connectionController",function($scope,$rootScope,$timeout,$location){
    var db = firebase.firestore();
    $scope.newConnect = {};
    $scope.updateNewConnect = function(){
        if(isValidated([$scope.newConnect.author,$scope.newConnect.occupation,$scope.newConnect.phone,$scope.newConnect.message])){
          console.log($scope);
          db.collection("connect").add({
          ...$scope.newConnect,
          page:"connect"
          })
          .then(function(docRef) {
            //$scope.toggleConnect();
            
            $timeout(function(){
                  $scope.$apply()
              },1);
              console.log("Document written with ID: ", docRef.id,docRef);
              $location.url("/");
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        }
        else{
            $('#toast').toast('show');
        }
      };
});