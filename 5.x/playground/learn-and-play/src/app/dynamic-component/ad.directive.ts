import { Directive, ViewContainerRef } from '@angular/core';

// ad-host directive
@Directive({
    selector: '[ad-host]',
})
export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}