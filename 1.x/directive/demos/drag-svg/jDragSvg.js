 angular.module('mModule', []).controller('mCtrl', function($scope, $document, $timeout) {
   $scope.xlink = "./dws.svg";
   $scope.dblclick = function($event) {

   };
   var threshold = 2;

   $document.on('mousewheel', function(event) {
     var dY = event.deltaY;
     var canvas = document.querySelector("#canvas");
     var viewBox = canvas.getAttribute("viewBox") ? angular.forEach(canvas.getAttribute("viewBox").split(" "), function(value) {
       Number.parseFloat = Number.parseFloat || parseFloat;
       value = Number.parseFloat(value);
     }) : [0, 0, canvas.clientWidth, canvas.clientHeight];
     var scaleFactor = 1;

     if (dY > 0 && Math.abs(dY) >= threshold) {
       if (viewBox[2] / canvas.clientWidth > 0.1) {
         scaleFactor = .8;
       }
       viewBox[2] *= scaleFactor;
       viewBox[3] *= scaleFactor;
     } else if (dY < 0 && Math.abs(dY) >= threshold) {
       if (viewBox[2] / canvas.clientWidth < 8) {
         scaleFactor = .8;
       }
       viewBox[2] /= scaleFactor;
       viewBox[3] /= scaleFactor;
     }

     viewBoxRatio = viewBox[2] / canvas.clientWidth;
    //  canvas.setAttribute("viewBox", viewBox.join(" "));
    canvas.style.transform = "scale(.5)";
     //  console.log(event);
   });
   var currentProcess, targetProcess, canvasRect, canvas, viewBoxRatio = 1;
   $scope.initCanvas = function() {
     canvas = document.querySelector("#canvas");
     canvasRect = canvas.getBoundingClientRect();
   }
   var anchorClicked = false;
   $scope.anchorClick = function($event, process) {
     currentProcess = process;
     anchorClicked = true;
     $event.preventDefault();
     var clickPoint = {
       x: $event.clientX,
       y: $event.clientY
     };
     toggleProcessLinedTip(true);
     $document.on('mousemove', function(moveEvent) {
       $scope.drawingLine = {};
       //  when zoomed, cannot draw the right cursor position  
       document.querySelector("#drawLine").setAttribute('d', 'M' + process.position.x + ',' + (process.position.y + 30) + " l" + (moveEvent.clientX - clickPoint.x) * viewBoxRatio + "," + (moveEvent.clientY - clickPoint.y) * viewBoxRatio);

       //  document.querySelector("#drawLine").setAttribute('d', 'M' + process.position.x + ',' + (process.position.y + 30) + " L" + (moveEvent.clientX - canvasRect.x - 2) + "," + (moveEvent.clientY - canvasRect.y - 2));
     });
     $document.on('mousedown', function(moveEvent) {
       $document.off('mousemove');
       $document.off('mousedown');
       $event.preventDefault();
       if (anchorClicked) {
         $timeout(function() {
           $scope.lines.push(generateAline(currentProcess.position.x, currentProcess.position.y, targetProcess.position.x, targetProcess.position.y, 30));
           currentProcess = undefined;
         }, 0);
         anchorClicked = false;
         document.querySelector("#drawLine").setAttribute("d", "");
         toggleProcessLinedTip(false);
       }
     });

   }
   $scope.processKeyDown = function($event, process) {
     if ($event.keyCode === 8) {
       var idx;
       angular.forEach($scope.processArr, function(val, index) {
         if (val.name === process.name) {
           idx = index;
         }
       });
       $scope.processArr.splice(idx, 1);
     }
   }

   function toggleProcessLinedTip(addOrRemove) {
     addOrRemove ? angular.forEach($scope.processArr, function(process) {
       if (process.name === "dis_001") {
         document.querySelector("#" + process.name).classList.add("forbidden-lined");
       }
     }) : angular.forEach($scope.processArr, function(process) {
       document.querySelector("#" + process.name).classList.remove("forbidden-lined");
     });
   }
   $scope.lineMouseDown = function($event, line) {
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

   $scope.processArr = [{
     type: 'dws',
     name: 'dws_001',
     position: {
       x: 300,
       y: 80
     },
   }, {
     type: 'dwsJob',
     name: 'dwsJob_001',
     position: {
       x: 378,
       y: 180
     },
   }, {
     type: 'dis',
     name: 'dis_001',
     position: {
       x: 378,
       y: 408
     },
   }, {
     type: 'mr',
     name: 'mr_001',
     position: {
       x: 675,
       y: 253
     },
   }];
   $scope.processMouseEnter = function($event, process) {
     if (anchorClicked && currentProcess.name !== process.name && process.name !== "dis_001") {
       targetProcess = process;
       document.querySelector("#" + process.name + ">circle").classList.add("process-heart-beat");
     }
   }
   $scope.processMouseLeave = function($event, process) {
     targetProcess = undefined;
     document.querySelector("#" + process.name + ">circle").classList.remove("process-heart-beat");
   }
   $scope.processClick = function($event, process) {
     document.querySelector("#" + process.name + "> .bgc").classList.add("selected");
   }

   function generateAline(x1, y1, x2, y2, r) {
     var r = r || 0;
     var alpha = Math.abs(Math.atan((x2 - x1) / (y2 - y1)));
     var line = {};
     line.start = {
       x: x1 + (x1 > x2 ? -1 : 1) * r * Math.sin(alpha),
       y: y1 + (y1 > y2 ? -1 : 1) * r * Math.cos(alpha)
     }
     line.end = {
       x: x2 - (x1 > x2 ? -1 : 1) * r * Math.sin(alpha),
       y: y2 - (y1 > y2 ? -1 : 1) * r * Math.cos(alpha)
     };
     line.d = 'M' + line.start.x + ',' + line.start.y + " L" + (line.end.x - 2) + "," + (line.end.y - 2);
     return line;
   }

   $scope.lines = [];

   for (var i = 0; i < $scope.processArr.length - 1; i++) {
     var r = 30;
     var x1 = $scope.processArr[i].position.x;
     var y1 = $scope.processArr[i].position.y;
     var x2 = $scope.processArr[i + 1].position.x;
     var y2 = $scope.processArr[i + 1].position.y;

     //  $scope.lines.push(generateAline(x1, y1, x2, y2, r));
   }
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