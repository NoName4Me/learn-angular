import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ComponentInteractionComponent, CiChild2, CiChild3, CiChild1, CiChild4, CiChild5 } from './component-interaction/component-interaction.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentInteractionComponent,
    CiChild1,
    CiChild2,
    CiChild3,
    CiChild4,
    CiChild5
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
