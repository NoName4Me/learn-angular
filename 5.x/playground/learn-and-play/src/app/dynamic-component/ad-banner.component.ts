import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdComponent } from './ad.component';
import { AdItem } from './ad-item';
import { AdDirective } from './ad.directive';

@Component({
    selector: 'app-add-banner',
    template: `
        <div class="ad-banner">
          <h3>Dynamic Advertisements!</h3>
          <ng-template ad-host></ng-template>
        </div>
      `
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {
    @Input() ads: AdItem[];
    currentAddIndex: number = -1;
    @ViewChild(AdDirective) adHost: AdDirective;
    subscription: any;
    interval: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngAfterViewInit() {
        setTimeout(() => {this.loadComponent();});
        this.getAds();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
        let adItem = this.ads[this.currentAddIndex];

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
    }

    getAds() {
        this.interval = setInterval(() => {
            this.loadComponent();
        }, 3000);
    }
}