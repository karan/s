var sApp = angular.module("sApp", ["ngAnimate"]);

sApp.controller("sCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.long_url = "";
    $scope.short_url = "";

    $scope.shorten = function (long_url) {
        console.log(long_url);
        $http.post("/new", {'long_url': long_url})
        .success(function(data) {
            $scope.short_url = data["short_url"];
            console.log($scope.short_url);
            $scope.long_url = $scope.short_url;
        })
        .error(function(data) {
            alert("Something went wrong. Try again!");
        });
    }
}]);

sApp.directive("toggleBtn", function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                console.log(elem + ' clicked');
                if(elem.val() == "Shorten") {
                    elem.val("Copy");
                } else {
                    elem.val("Shorten");
                }
            });
        }
    }
});
