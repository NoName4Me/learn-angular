 // STEP.1
 /*
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
  //*/

 // STEP.2
 /*
 angular.module('mModule', []).controller('mCtrl', ['$scope', function($scope) {
         $scope.person = {
             name: 'jonge',
             age: 18
         };
     }])
     .directive('jPerson', function() {
         return {
             template: `
             <a ng-href="mailto:{{person.name}}@example.com">{{person.name}}</a>
             @ age: <span ng-bind="person.age"></span>
         `
             // for Cross origin issue, here copy the .html file content
         };
     });
 //*/

 // STEP.3, this is not the full code.
 /*
 .directive('jPerson', function(element, attr) {
     return {
         templateUrl: 'template-' + attr.type +'.html'
         // for Cross origin issue, here copy the .html file content
     };
 });
 //*/

 // STEP.4
 /*
 return {
     restrict: 'E', // E: element, A: attribute, C: class, M: comment
     tempalte: 'xxx'
 }
 //*/

 // STEP.5 isolate scope
 /*
 angular.module('mModule', []).controller('mCtrl', ['$scope', function($scope) {
         $scope.person1 = {
             name: 'jonge',
             age: 18
         };
         $scope.person2 = {
             name: 'den',
             age: 28
         };
     }])
     .directive('jPerson', function() {
         return {
             restrict: 'E',
             scope: {
                 person: '=bindPerson'
             },
             template: `
             name: {{person.name}}, age: {{person.age}}
             <hr>
             `
         };
     });
     //*/

 // STEP.6 link
 /*
 angular.module('mModule', [])
     .controller('mCtrl', ['$scope', function($scope) {
       $scope.format = 'M/d/yy h:mm:ss a';
     }])
     .directive('jCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
     
       function link(scope, element, attrs) {
         var format,
             timeoutId;
     
         function updateTime() {
           element.text(dateFilter(new Date(), format));
         }
     
         scope.$watch(attrs.jCurrentTime, function(value) {
           format = value;
           updateTime();
         });
     
         element.on('$destroy', function() {
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
 //*/

 // STEP.7 tranclude
 /*
 angular.module('mModule', []).controller('mCtrl', ['$scope', function($scope) {
     $scope.person = {
         name: 'jonge',
         age: 27
     };
 }]).directive('jPerson', function() {
     return {
         restrict: 'E',
         scope: {},
         transclude: true, // attention
         template: `
         <h4>this is just template things</h4>
         <div class="person" ng-transclude></div>
         `
         // that div.ng-transclude means all things in it will be shown on page
     }
 });
 //*/

 // STEP.8 drag test
 angular.module('mModule', [])
 .directive('jDrag', ['$document', function($document) {
   return {
     link: function(scope, element, attr) {
       var startX = 0, startY = 0, x = 100, y = 0;
 
       element.css({
        position: 'relative',
        left: '100px',
        width: '120px',
        height: '120px',
        border: '2px solid #A85',
        backgroundColor: '#58D',
        borderRadius: '60px',
        display: 'inline-block',
        textAlign: 'center',
        cursor: 'pointer'
       });
 
       element.on('mousedown', function(event) {
         // Prevent default dragging of selected content
         event.preventDefault();
         startX = event.pageX - x;
         startY = event.pageY - y;
         $document.on('mousemove', mousemove);
         $document.on('mouseup', mouseup);
       });
 
       function mousemove(event) {
         y = event.pageY - startY;
         x = event.pageX - startX;
         element.css({
           top: y + 'px',
           left:  x + 'px'
         });
       }
 
       function mouseup() {
         $document.off('mousemove', mousemove);
         $document.off('mouseup', mouseup);
       }
     }
   };
 }]);
 
 //*/