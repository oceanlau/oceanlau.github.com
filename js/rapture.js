angular
    .module('rapture', [])
    .directive('markdown', function(){
        var mdConverter = new Showdown.converter();
        var mdWrapperTpl = '<div class="mdWrapper">#Hello?</div>';
        return {
            restrict: 'E',
            compile: function (tElement, tAttrs, transclude){
                var mdRawText = tElement.text();
                var mdWrapperElement = angular.element(mdWrapperTpl);
                tElement.html('');
                tElement.append(mdWrapperElement);

                //link
                return function(scope, element, attrs){
                    scope.mdRawText = mdRawText;
                    var mdHTML = mdConverter.makeHtml(scope.mdRawText);
                    mdWrapperElement.html(mdHTML);
                }
            }
        }
    });
