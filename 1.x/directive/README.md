
## 1. basics

>element names (E), attributes (A), class names (C), and comments (M)


* static tempate(directly `return {template: 'xx'}`)
```js
angular.module('mModule',[]).controller('mCtrl',['$scope', function($scope){
    $scope.person = {
        name: 'jonge',
        age: 18
    };
}])
.directive('jPerson', function(){
    return {
        template: 'name:{{person.name}} age: {{person.age}}'
    };
});
```

* templateUrl
```js
return { templateUrl: 'xxx.html'}
```

* scope

this will generate an isolate scope from $scope.

```js
.directive('jPerson', function() {
        return {
            restrict: 'E',
            scope: { // here we go, in HTML: <j-person bind-person="somePersonFrom$scope">
                person: '=bindPerson'
            },
            template: `
            name: {{person.name}}, age: {{person.age}}
            <hr>
            `
        };
    });
```

## 2. [link](https://docs.angularjs.org/api/ng/service/$compile#-link-)
>The link function is responsible for registering DOM listeners as well as updating the DOM. It is executed after the template has been cloned. This is where most of the directive logic will be put.

`function link(scope, element, attrs, controller, transcludeFn) { ... }`, where:
* `scope` is an AngularJS scope object.
* `element` is the jqLite-wrapped element that this directive matches.
* `attrs` is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
* `controller` is the directive's required controller instance(s) or its own controller (if any). The exact value depends on the directive's require property.
* `transcludeFn` is a transclude linking function pre-bound to the correct transclusion scope.


```js
angular.module('docsTimeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) { // dependency injection
  function link(scope, element, attrs) {
    var format, timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() { // in case memory leak, also can be written like: scope.$on()
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link
  };
}]);
Ï
```