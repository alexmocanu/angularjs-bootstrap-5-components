angular.module('ui.bootstrap5.tabindex', []).directive('uibTabindexToggle', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            attrs.$observe('disabled', function (disabled) {
                attrs.$set('tabindex', disabled ? -1 : null);
            });
        }
    };
});