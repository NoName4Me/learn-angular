 angular.module('mModule', []).controller('mCtrl', function($scope) {
   $scope.dblclick = function($event){

   };
   $scope.anchorClick = function($event){

   }
   $scope.lineClick = function($event) {
     $event.target.parentElement.classList.add("focused");
   }
   $scope.testData = [{
     type: 'source',
     position: {
       x: 123,
       y: 111
     }
   }, {
     position: {
       x: 180,
       y: 291
     }
   }];
   var x1 = 123;
   var y1 = 111;
   var x2 = 180;
   var y2 = 291;
   var r = 30;
   var alpha = Math.atan((x2 - x1) / (y2 - y1))
   $scope.line = {
     start: {
       x: x1 + r * Math.sin(alpha),
       y: y1 + r * Math.cos(alpha)
     },
     end: {
       x: x2 - r * Math.sin(alpha),
       y: y2 - r * Math.cos(alpha)
     }
   }
   $scope.d = `M` + $scope.line.start.x + ',' + $scope.line.start.y + " L" + $scope.line.end.x + "," + $scope.line.end.y;
   $scope.processArr = [{
     type: 'dws',
     name: 'dws_001',
     position: {
       x: 300,
       y: 100
     },

   }, {
     type: 'dwsJob',
     name: 'dwsJob_001',
     position: {
       x: 400,
       y: 180
     },
   }, {
     type: 'dis',
     name: 'dis_001',
     position: {
       x: 475,
       y: 208
     },
   }];
 }).directive('jDragSvg', ['$document', function($document) {
   return {
     link: function(scope, element, attr) {
       var startX = 0,
         startY = 0,
         x = 0,
         y = 0;

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
           left: x + 'px'
         });
       }

       function mouseup() {
         $document.off('mousemove', mousemove);
         $document.off('mouseup', mouseup);
       }
     },
     restrict: 'A',
     scope: {
       item: '='
     }
   };
 }]);