var sApp = angular.module("sApp", []);

sApp.directive("toggleBtn", function () {
    console.log("toggle btn");
    return {
        restrict: 'A',
        controller: function($scope, $http) {
            $scope.long_url = "";
            $scope.short_url = "";

            $scope.shorten = function (long_url) {
                console.log(long_url);
                if ($scope.form.isvalid) {
                    $scope.form.$setPristine();
                    $scope.form.setValidity("invalid url", false);
                    return;
                }
                $http.post("/new", {'long_url': long_url})
                .success(function(data) {
                    $scope.short_url = data["short_url"];
                    console.log($scope.short_url);
                    $scope.long_url = $scope.short_url;
                    $scope.form.$setPristine();
                })
                .error(function(data) {
                    alert("Something went wrong. Try again!");
                });
            };
        },
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                scope.$apply(scope.shorten(scope.long_url));
            });
        }
    };
});

sApp.directive("selectClick", function () {
    return {
        scope: true,
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                this.select();
            });
        }
    };
});
