# learn Angular 5.x

> when writing this note, current version is 5.1.1

```bash
npm install -g @angular/cli

# create App
ng new my-app

cd my-app

# run the App
ng serve --open

# create component
ng generate component xx

# create service
ng generate service xx
## --module=app
## 创建时自动追加到模块app里

```

基本指令
|指令|举例|
|----|----|
|双向绑定|`[(ngModel)]="x"`|
|循环|`*ngFor="let x of xx"`|
|条件|`*ngIf="x"`|
|事件绑定|`(click)="e(x)"`|

```html
<!--双向绑定-->
<input [(ngModel)]="hero.name" placeholder="name">
<!--循环、事件-->
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
    <!--条件-->
    <span *ngIf="hero">{{hero.name}}</span>
</li>
```

* Input（属性绑定）

单向绑定，格式`lv="rv"`，数据传递`rv-->lv`。

```html
<!--in heroes.html-->
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

```ts
// in heroes-detail.ts
@Input() hero: Hero;
```

* Injectable

```ts
// 这个注解告诉Angular此service可能会有它自己的注入依赖
@Injectable()
export class HeroService {}

```

----

# 常用链接

1. [Angular Style Guide](https://angular.io/guide/styleguide)