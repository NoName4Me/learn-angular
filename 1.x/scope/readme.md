# 作用域生命周期

只有在AngularJS的上下文中，才能保证模型的修改会被监测到，从一般JS上下文切入到angularJS上下文，是通过`$apply`方法，`$apply`方法中对表达式求值后，并不是立即通知`$watch`，而是延迟到`$digest`阶段，`$digest`就是作用域检测所有表达式，并且将它们与前一值比较（所谓的脏检查，是异步完成的），将所有模型的更新合并到一个`$watch`里处理，这样保证了在`$watch`时不会有其它的`$watch`在运行。如果`$watch`修改了模型，会再次启动脏检查。

1.创建

根作用域在应用启动时通过`$injector`创建，在模板链接阶段，一些指令创建子作用域。

2.观察器注册

模板链接阶段，指令在作用域内注册观察器，这些观察器将会用于传递模型值到DOM。

3.模型变化

为了更好的监测变化，你应该只允许它们发生在`scope.$apply()`中，AngularJS API都隐式的这么做了，所以你在控制器中的同步任务，或者使用`$http`、`$timed`、`$interval`这些异步服务时，无需额外再调用`$apply`。

4.变化监测

在`$apply`结束时，AngularJS会在根作用域执行`$digest`循环（遍历所有的子作用域）。在`$digest`周期内，所有的被`$watch`的表达式或者函数都会做模型变化检查，如果有变化，`$watch`监听器会被调用。

## 作用域和指令

* 观察指令：如`{{...}}`，它通过`$watch`注册监听器，一有更新就会通知，从而更新视图。
* 监听指令：如`ng-click`，通过DOM注册监听器，当有DOM事件发生，对应的指令会通过`$apply`执行表达式并更新视图。

**注意：** 当收到外部事件（如用户行为、定时器、XHR），必须使用`$apply`来让绑定的表达式在作用域内执行，从而让所有监听器都能正常更新。

## 创建作用域的指令

一般情况下，指令和作用域交互，但是指令不会创建作用域实例，然而，一些指令如`ng-controller`、`ng-repeat`，会创建新的子作用域，并将该作用域附着在对应的DOM元素上。

一个比较特殊的作用域是 *隔离作用域*，它不会原型继承父作用域，这种作用域在那些需要从父作用域隔离的组件指令很有用。一般通过`.component()`创建的组件指令都会创建隔离作用域。


## 控制器和作用域
作用域和控制器的囧话发生在以下3个场景：
* 控制器通过作用域将控制器方法暴露给模板（参考`ng-controller`）。
* 控制器定义可以改变模型（作用域的属性）的方法（行为）。
* 控制器可以为模型注册观测器（watch），这些观测器在控制器的行为执行时立即执行。


## 作用域`$watch`性能注意事项
为检测属性变化而对作用域进行的脏检查是AngularJS的常见操作，因此，脏检查函数必须高效。注意不要在脏检查函数中做DOM访问，因为访问DOM的速度比访问JS对象慢几个数量级。

## 作用域`$watch`深度
脏检查有三种策略：通过引用、通过集合内容、通过值，这三种策略的不同在于它们检测的变化类型和它们的运行特性，三种策略如下图示：

![concepts-scope-watch-strategies](concepts-scope-watch-strategies.png)

* 通过引用（`scope.$watch(watchExpression, listener)`）观测表达式的返回值是否被赋了新值，如果值是数组或者对象，那么内部的改变不会被检测，这是最高效的策略。

* 通过集合内容（`scope.$watchCollection(watchExpression, listener)`）能检测数组或对象内部的改变（元素增、删、重排等）。这种检测是浅层次的，它不会继续检测嵌套集合，它比引用观测更昂贵，因为它要额外维护这个集合的拷贝。

* 通过值（`scope.$watch(watchExpression, listener, true)`）检测任何嵌套数据结构的改变，它是最强大的改变检测策略，但也是代价最昂贵的，因为它要在每一个`digest`中遍历某个嵌套数据结构，并且在内存中维护一个完整拷贝。

## 与浏览器事件循环集成

![concepts-runtime](concepts-runtime.png)

一般的事件处理是：
1. 浏览器事件循环等待事件到来，事件是指用户交互、定时事件、网络事件（服务器响应）

2. 事件的回调被执行，这会进入到JS的上下文，回调可以修改DOM结构。

3. 当回调执行完，浏览器离开JS上下文，根据DOM的变动重渲染视图。


AngularJS通过提供自己的事件处理循环，将JS的工作流划分出AngularJS上下文，只有在其上下文内的操作才会具备数据绑定的能力。

1. 通过调用`scope.$apply(stimulusFn)`进入AngularJS上下文，`stimulusFn`是你希望在AngularJS上下文中完成的工作。

2.AngularJS执行`stimulusFn()`，一般会修改应用状态。

3.AngularJS进入`$digest`循环，该循环由两个更小的循环构成，一个处理`$evalAsync`队列，一个处理`$watch`序列。`$digest`循环一直迭代，直到模型稳定，即`$evalAsync`队列为空，`$watch`序列没有检测到变化。

4.`$evalAsync`队列是用来安排需要出现在当前堆栈帧外且在浏览器视图渲染之前的任务。一般通过`setTimeout(0)`完成，但是`setTimeout(0)`会很慢，而且可能会出现闪屏（因为浏览器渲染视图总是在每一个事件之后）。

5.`$watch`序列是一个表达式的集合，这些表达式可能在上一个迭代里变化了，如果检测到变化，`$watch`函数会被调用，然后会使用新值来更新DOM。

6.当AngularJS的`$digest`循环完成，执行会离开AngularJS和JS上下文，然后进行浏览器对DOM的重渲染，从而展示出变化。

下面解释一下hello world示例中是如何实现用户输入文字时的数据绑定：
```html
<!-- index.html -->
<div ng-controller="MyController">
  Your name:
    <input type="text" ng-model="username">
    <button ng-click='sayHello()'>greet</button>
  <hr>
  {{greeting}}
</div>
```

```js
// script.js
angular.module('scopeExample', [])
.controller('MyController', ['$scope', function($scope) {
  $scope.username = 'World';

  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.username + '!';
  };
}]);
```

1.编译阶段：
  a.`ng-model`和`input`指令在`<input>`元素上创建了一个`keydown`监听器。
  b.`interpolation`创建一个在`name`被修改时被通知的`$watch`。

2.运行时：
  a.比如按下了键盘`x`，浏览器会在`input`元素上触发一个`keydown`事件。
  b.`input`指令捕获输入的值的变化，然后调用`$apply('name = "x";')`在AngularJS运行上下文中更新应用模型。
  c.AngularJS将`name = 'x';`应用到模型上。
  d.`$digest`循环启动。
  e.`$watch`序列检测`name`属性的变化，然后通知`interpolation`，它会更新DOM。
  f.AngularJS离开执行上下文，从而退出`keydown`事件，退出JS执行上下文。
  g.浏览器使用更新后的文本重渲染视图。
