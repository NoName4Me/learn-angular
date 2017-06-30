# Component

define
```js
angular.module('myApp').component('iconTextList', {
    template:
    `<ul>
        <li ng-repeat='it in $ctrl.list'>
        </li>
    </ul>`,
    controller: function iconTextList() {
        this.list=[];
    }
});
```

html use
```
<icon-text-list></icon-text-list>
```

an example:

<img src="imgs/preview.png" width="480" alt="preivew">