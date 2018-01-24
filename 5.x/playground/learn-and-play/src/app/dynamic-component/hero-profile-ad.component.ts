import { Component, Input } from '@angular/core';
import { AdComponent } from './ad.component';

// specific ad 002
@Component({
    template: `
      <div class="hero-profile">
        <h3>Featured Hero Profile</h3>
        <h4>{{data.name}}</h4>
        <p>{{data.bio}}</p>
        <strong>Hire this hero today!</strong>
      </div>
    `,
    styles: [`
    .hero-profile {
        border-radius: 10px;
        padding: 5px 10px 20px;
        background-color: #39f;
     }`]
})
export class HeroProfileComponent implements AdComponent {
    @Input() data: any;
}