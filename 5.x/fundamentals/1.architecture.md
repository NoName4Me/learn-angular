# Architecture

先鸟瞰一下。

* `template`s: `HTML`模版。
* `component`s: 组件，管理`template`。
* `service`s: 业务处理。
* `module`s: 综合`component`s和`service`s。
* `root module`: 通过加载它，从而引导启动整个应用。

>**架构图**
![img](https://angular.io/generated/images/guide/architecture/overview2.png)

## Module

每一个Angular应用都至少由一个module组成（`root module`），大应用会有一些`feature module`。

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 装饰器函数，接受一个对象，包含一下几个属性的内容，用来描述此模块
@NgModule({
  // 其他模块暴露的，本模块内组件需要使用的类
  imports:      [ BrowserModule ],

  // 本模块提供给全局service的创建器，供应用的其它部分使用
  providers:    [ Logger ],

  // 属于本模块的view class: directive | component | pipe
  declarations: [ AppComponent ],

  // 需要暴露给其它外部模块的类
  exports:      [ AppComponent ],

  // root module才会用到
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

在开发环境，你一般是这样通过`main.ts`来加载`AppModule`的：

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

## Component

它也可以看作是一个有view的指令（`directive`），`@Component`是继承自`@Directive`。
Component应该简洁，像请求数据、校验输入、日志打印等一般都委托给Service，它的工作就是与用户交互。

```ts
@Component({
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  providers:  [ HeroService ]
})
```

## Data binding

数据绑定可以是组件与模板之间的数据交互关系，包括父子组件、模板之间。共三种方向，四种绑定方法：

* DOM <-- Component
    - `{{value}}`: 如` <span>{{myName}}</span>`
    - `[property]="value"`: 如`<j-test [demo]="diyDemo"></j-test>`
* DOM --> Component
    - `(event)="handler"`: 如`<button (click)="btnClick"></button>`
* DOM <--> Component
    - `[(ngModel)]="property"`: 如`<input [(ngModel)]="yourName" />`

## Directive

通过指令来动态的渲染模板，有结构性指令（如`*ngIf`、`*ngFor`等），属性指令（如`ngModel`、`ngStyle`），还有自定义指令。

## Service

用来具体处理业务的类，虽然没有特别定义，但却可以很丰富，你可以定义自己的日志服务，请求后端的预处理服务，工具类服务等。

```ts
// 一个简单的demo
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
```

## Dependency Injection

看看Angular的doc里描述的*依赖注入*：

>*An injector maintains a container of service instances that it has previously created. If a requested service instance is not in the container, the injector makes one and adds it to the container before returning the service to Angular. When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments. This is **dependency injection***.

说了啥，就是有一个注入器，它维护一个包含已经创建的服务实例的容器，如果组件请求的服务实例不在容器里，注入器就创建一个，加入到容器里，然后把服务返回给Angular，当所有请求的服务都可以解析和返回，那么Angular会调用组件的构造器，并传入这些服务为构造参数。

注入器怎么知道如何创建一个服务实例呢，通过你在模块或组件的`provider`里注册的服务来创建。

在根模块里注册的，那么任何地方都可以访问到，如果在组件里注册的，那么意味着每创建的一个**组件实例**里都会新创建一个**服务实例**。
