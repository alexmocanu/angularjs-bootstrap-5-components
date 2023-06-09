angular.module('ui.bootstrap5.pager', ['ui.bootstrap5.paging', 'ui.bootstrap5.tabindex'])

.controller('UibPagerController', ['$scope', '$attrs', 'uibPaging', 'uibPagerConfig', function($scope, $attrs, uibPaging, uibPagerConfig) {
    $scope.align = angular.isDefined($attrs.align) ? $scope.$parent.$eval($attrs.align) : uibPagerConfig.align;
  
    uibPaging.create(this, $scope, $attrs);
  }])
  
  .constant('uibPagerConfig', {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
  })
  
  .directive('uibPager', ['uibPagerConfig', function(uibPagerConfig) {
    return {
      scope: {
        totalItems: '=',
        previousText: '@',
        nextText: '@',
        ngDisabled: '='
      },
      require: ['uibPager', '?ngModel'],
      restrict: 'A',
      controller: 'UibPagerController',
      controllerAs: 'pager',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || '/templates/pager.html';
      },
      link: function(scope, element, attrs, ctrls) {
        element.addClass('pagination');
        var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
  
        if (!ngModelCtrl) {
          return; // do nothing if no ng-model
        }
  
        paginationCtrl.init(ngModelCtrl, uibPagerConfig);
      }
    };
  }]);