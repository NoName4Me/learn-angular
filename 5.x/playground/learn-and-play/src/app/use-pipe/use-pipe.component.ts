import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-birthday',
  template: `
  <p>Default date: is {{ birthday | date }}</p>
  <p>'yyyy-MM-dd' Date:  {{ birthday | date:'yyyy-MM-dd' }}</p>
  <p>Changable format Date: {{ birthday | date:format }}</p>
  <p>Chained Pipe(default + upperCase) Date: {{ birthday | date | uppercase }}</p>
  <button (click)="toggleFormat()">toggle 3rd Date format</button>
  `
})
export class HeroBirthdayComponent {
  birthday = new Date(1990, 4, 1);
  isLong = true;

  get format() { return this.isLong ? 'fullDate' : 'shortDate'; }
  toggleFormat() { this.isLong = !this.isLong; }
}

// 自定义Pipe
// @Pipe修饰，实现PipeTransform接口及其transform方法
// 注意：这个Pipe要在AppModule中声明哦
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}


@Component({
  selector: 'power-pow-calculator',
  template: `
    <div>Normal power:<input [(ngModel)]="power"/></div>
    <div>Boost factor:<input [(ngModel)]="factor"/></div>
    <p>Super power caculator: {{power | exponentialStrength: factor}}</p>
  `
})
export class PowerPowCalculator {
  power = 5;
  factor = 1;
}

@Component({
  selector: 'app-use-pipe',
  templateUrl: './use-pipe.component.html',
  styleUrls: ['./use-pipe.component.css']
})
export class UsePipeComponent {}

