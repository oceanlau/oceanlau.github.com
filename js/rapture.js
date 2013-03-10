angular
    .module('rapture', [])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                redirectTo: '/blog'
            })
            .when('/blog', {
                controller:blogListCtrl,
                templateUrl:'blog-list.html'
            })
            .when('/blog/:blogEntryName', {
                controller:blogViewCtrl,
                templateUrl:'blog-view.html'
            })
            .otherwise({
                redirectTo: '/blog'
            })
    })
    .directive('markdown', ['$http', function($http){
        var mdConverter = new Showdown.converter();
        var mdWrapperTpl = '<div class="mdWrapper">#Loading...</div>';
        return {
            restrict: 'E',
            controller: markdownCtrl,
            compile: function (tElement, tAttrs, transclude){
                //template element
                var mdWrapperElement = angular.element(mdWrapperTpl);
                //clear the markdown and render the dom
                tElement.html('');
                tElement.append(mdWrapperElement);

                //link function
                return function(scope, element, attrs){
                    $http({
                        method: 'GET',
                        url: scope.blogEntryUrl
                    }).success(function(data, status, headers, config){
                        var mdRawText = data;
                        var mdHTML = mdConverter.makeHtml(mdRawText);
                        mdWrapperElement.html(mdHTML);
                    })
                }
            }
        }
    }]);

function blogListCtrl($scope, $http){
    $http({
        method: 'GET',
        url: '/cms/list/blogList.json'
    }).success(function(data, status, headers, config){
        $scope.blogListJSON = data;
    })
}

function blogViewCtrl($scope, $location, $routeParams, $http){}

function markdownCtrl($scope, $location, $routeParams, $http){
    $scope.blogEntryUrl = '/cms/blogEntry/'+$routeParams.blogEntryName+'.md';
}
