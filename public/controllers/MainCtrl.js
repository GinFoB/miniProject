angular.module('MyApp')
  .controller('MainCtrl', function($scope,$http,$window,$routeParams) {
       $scope.init = function () {
                $http({
                        method: 'GET',
                        url: '/allEmployees'
                    }).success(function (data) {
                        $scope.employees = data;
                    }).error(function (data) {
                        console.log(data);
                    });
        };

    $scope.deleteEmployee = function(id) {
         var deleteUser = $window.confirm('Are you sure you want to delete this Employee?');
            if (deleteUser) {
                $http.delete('/delete/employee/' + id)
                .success(function(data) {
                    console.log(data);
                    $scope.init();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            }
    };
  });