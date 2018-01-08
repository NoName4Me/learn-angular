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
