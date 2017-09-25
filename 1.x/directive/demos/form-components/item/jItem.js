angular.module('mModule', []).controller('mCtrl', ['$scope', function($scope) {
    $scope.itemOptions1 = {
        required: true,
        align: 'vertical',
        label: {
            value: 'vertical label'
        }
    };
    $scope.itemOptions2 = {
        required: false,
        align: 'vertical',
        label: {
            value: 'vertical label'
        }
    };

    $scope.items = [{
        required: true,
        label: {
            value: 'select things'
        },
        type: 'select'
    }, {
        required: false,
        label: {
            value: 'normal input'
        },
        type: 'text',

    }, {
        required: true,
        label: {
            value: 'multi-line text'
        },
        type: 'textarea',

    }];
}]).directive('jItem', function() {

    function link(scope, element, attrs) {
        var format,
            timeoutId;
            var innerDom = element.query
        element.on('$destroy', function() {
            // delete some timeout/interval things
        });

    }
    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        link: link,
        transclude: true,
        template: `
        <div style="margin-top:20px;font-size:14px;">
            <span ng-class="{'disp-block':options.align==='vertical','required':options.required}" style="margin-bottom:10px;display:inline-block;">
                {{options.label.value}}
            </span>
            <span ng-transclude ng-class="{'horizental-margin': options.align!=='vertical' && options.label.width}"></span>
        </div>
        `
        //<i ng-if='options.required' style="color:red;font-size:1em;margin-right:5px;display:inline-block;">*</i>
    }
});