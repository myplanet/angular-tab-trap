(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'module', 'angular' ], function (module, angular) {
            module.exports = factory(angular);
        });
    } else {
        if (!root.mp) {
            root.mp = {};
        }

        root.mp.focusTrap = factory(root.angular);
    }
}(this, function (angular) {
    'use strict';

    return angular.module('mp.focusTrap', []).directive('focusTrap', [ '$window', function ($window) {
        // Introduce custom elements for IE8
        $window.document.createElement('focus-trap');

        var tmpl = ''
+ '<button type="button"></button>'
+ '<div ng-transclude></div>'
+ '<button type="button"></button>'
        ;

        return {
            restrict: 'AE',
            template: tmpl,
            transclude: true,

            link: {
                pre: function ($scope) {
                },
                post: function ($scope, $element, $attributes, ngModel) {
                    var buttonStyle = {
                        position: 'absolute',
                        left: '-9999px'
                    };

                    var children = $element.children(),
                        focusLeader = children.eq(0),
                        transclusionPoint = children.eq(1),
                        focusTrailer = children.eq(2);

                    $element.css('position', 'relative');

                    focusLeader.css(buttonStyle);
                    focusTrailer.css(buttonStyle);

                    children.on('focus', function () {
                        var focusables = transclusionPoint.find('input');

                        if (focusables.length) {
                            focusables[0].focus();
                        }
                    });
                }
            }
        };
    }]);
}));
