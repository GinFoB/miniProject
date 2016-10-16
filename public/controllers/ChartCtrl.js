angular.module('MyApp')
  .controller('ChartCtrl', function($scope,$http,$timeout) {
    $scope.init = function () {
      $http.get('/d3').success(function(data){
        $scope.dataPlus=data.length;
      });
      $http.get('/allEmployees').success(function(data){
        $scope.dataAll=data.length;
      });

      $timeout(function(){
        console.log($scope.dataPlus);
          $scope.labels = ["Plus que 30 ans", "Moins que 30 ans"];
          $scope.data = [$scope.dataPlus,  $scope.dataAll - $scope.dataPlus];
      }, 2000);
    };
});