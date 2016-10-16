angular.module('MyApp')
  .controller('EditCtrl', function($scope,$http,$window,$routeParams) {
    $scope.currentId = $routeParams.id;      
      $scope.init = function () {
                $http({
                        method: 'GET',
                        url: '/get/employee/'+$scope.currentId
                    }).success(function (data) {
                        $scope.employee = data;
                    }).error(function (data) {
                        console.log(data);
                    });
        };

         $scope.editEmploye = function (employee) {
             $http({
                    method: 'PUT',
                    url: '/edit/employee/'+$scope.currentId,
                    data:  {name: employee.name, nickname: employee.nickname,
                        age: employee.age,isEmployee:employee.isEmployee,year:employee.year}
                }).success(function (data) {
                    console.log(data);
                }).error(function (data) {
                    console.log(data);
                });
               $window.location.href = '/';
      };
  });