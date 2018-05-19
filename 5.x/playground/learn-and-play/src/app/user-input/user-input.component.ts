import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  values: string = '';
  heroes = ['Default Man'];
  onKey(event: any) {
    this.values += event.key + " | "
  }
  addHero(hero:string) {
    hero && this.heroes.push(hero);
  }
}
