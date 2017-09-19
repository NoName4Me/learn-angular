# Component

* define
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

* html tag
```html
<!-- by iconTextList -->
<icon-text-list></icon-text-list>
```

* result

<img src="imgs/preview.png" width="480" alt="preivew">

## about cahce

[$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache)