'use strict';

angular.
  module('myApp').
  component('iconTextList', {
    template:
        `<ul>
          <li ng-repeat="element in $ctrl.list">
            <img src="{{element.url}}" value="{{element.name}}"></img>
            <span>{{element.name}}</span>
            <p>{{element.description}}</p>
          </li>
        </ul>`,
    controller: function IconTextListController() {
      this.list = [
        {
          name: 'Mountain',
          description: 'You are the mountain, I am standing on your shoulder.',
          url: 'imgs/mountain.png'
        }, {
          name: 'Forest',
          description: 'Someday, I got lost in the frorest.',
          url: 'imgs/forest.png'
        }, {
          name: 'Ocean',
          description: 'Maybe, I just want to look at you quietly.',
          url: 'imgs/ocean.png'
        }
      ];
    }
  });
