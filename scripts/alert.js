'use strict';
/**
 * Angular JS Alert Component
 * Attributes
 * - close() - A callback function that gets fired when an alert is closed. If the attribute exists, a close button is displayed as well.
 * - dismiss-on-timeout (Default: none) - Takes the number of milliseconds that specify the timeout duration, after which the alert will be closed. This attribute requires the presence of the close attribute.
 * - template-url (Default: /templates/alert.html) - Add the ability to override the template used in the component.
 */
angular.module('ui.bootstrap5.alert', [])
    .controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function ($scope, $element, $attrs, $interpolate, $timeout) {
            $scope.closeable = !!$attrs.close;
            $element.addClass('alert');
            $attrs.$set('role', 'alert');

            if ($scope.closeable) {
                $element.addClass('alert-dismissible');
            }

            var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ? $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;
            if (dismissOnTimeout) {
                $timeout(function () {
                    $scope.close()
                }, parseInt(dismissOnTimeout, 10));
            }
        }])
    .directive('alert', function () {
        return {
            controller: 'UibAlertController',
            controllerAs: 'alert',
            restrict: 'A',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || '/templates/alert.html';
            },
            transclude: true,
            scope: {
                close: '&'
            }
        };
    });