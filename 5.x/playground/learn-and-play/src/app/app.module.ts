import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentInteractionComponent, CiChild2, CiChild3, CiChild1, CiChild4, CiChild5 } from './component-interaction/component-interaction.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { HeroJobAdComponent } from './dynamic-component/hero-job-ad.component';
import { HeroProfileComponent } from './dynamic-component/hero-profile-ad.component';
import { AdBannerComponent } from './dynamic-component/ad-banner.component';
import { AdService } from './dynamic-component/ad.service';
import { AdDirective } from './dynamic-component/ad.directive';
import { UsePipeComponent, HeroBirthdayComponent, ExponentialStrengthPipe, PowerPowCalculator } from './use-pipe/use-pipe.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ComponentInteractionComponent,
    CiChild1,
    CiChild2,
    CiChild3,
    CiChild4,
    CiChild5,
    AdBannerComponent,
    DynamicComponentComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdDirective,
    HeroBirthdayComponent,
    PowerPowCalculator,
    ExponentialStrengthPipe,
    UsePipeComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [AdService],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
