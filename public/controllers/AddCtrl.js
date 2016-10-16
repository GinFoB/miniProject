angular.module('MyApp')
  .controller('AddCtrl', function($scope,$http,$window) {
   
      $scope.addEmploye = function (employee) {
             $http({
                    method: 'POST',
                    url: '/add/employee',
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