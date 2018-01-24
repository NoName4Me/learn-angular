import { Component, Input } from '@angular/core';
import { AdComponent } from './ad.component';

// specific ad 001
@Component({
    template: `
      <div class="job-ad">
        <h4>{{data.headline}}</h4>
        {{data.body}}
      </div>
    `,
    styles: [`
    .job-ad {
        border-radius: 10px;
        padding: 5px 10px 20px;
        background-color: #f93;
     }`]
})
export class HeroJobAdComponent implements AdComponent {
    @Input() data: any;
}