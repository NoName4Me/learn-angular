import { Injectable, Type, Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AdComponent } from './ad.component';
import { AdService } from './ad.service';
import { AdItem } from './ad-item';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit {
  ads: AdItem[];

  constructor(private adService: AdService) { }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}


