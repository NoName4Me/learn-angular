import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

class Hero {
  name: string;
}

/* Parent to Child */

// 1. a common one, use `Input`
@Component({
  selector: 'app-ci-child1',
  template: `
    <h5>{{hero.name}} says:</h5>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class CiChild1 {
  @Input() hero: Hero;
  @Input('master') masterName: string;
}

// 2. a setter/getter way
@Component({
  selector: 'app-ci-child2',
  template: `<h5>"{{name}}"</h5>`
})
export class CiChild2 {
  private _name = '';

  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name(): string { return this._name; }
}

// 3. `ngOnChange` to intercepte parent input
// 这种方式在对监听响应输入properties上，比setter方式更方便些
@Component({
  selector: 'app-ci-child3',
  template: `<h4>Version {{major}}.{{minor}}</h4>
  <h5>Change log:</h5>
  <ul>
    <li *ngFor="let change of changeLog">{{change}}</li>
  </ul>`
})
export class CiChild3 {
  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
}

/* Parent listen for chid event */
// 4. EventEmitter
@Component({
  selector: 'app-ci-child4',
  template: `<h4>{{name}}</h4>
  <button (click)="vote(true)"  [disabled]="voted">Agree</button>
  <button (click)="vote(false)" [disabled]="voted">Disagree</button>`
})
export class CiChild4 {
  @Input() name: string;
  @Output() childEmitVoted = new EventEmitter<boolean>();
  voted = false;

  vote(agreed: boolean) {
    this.childEmitVoted.emit(agreed); // 这里发送事件
    this.voted = true;
  }
}

// 5. Parent interact with Child via local variable
// 父组件无法直接访问seconds、start()、stop()方法，所以在调用
// <app-ci-child5>时，放置了一个局部变量#timer，见html
@Component({
  selector: 'app-ci-child5',
  template: '<p>{{message}}</p>'
})
export class CiChild5 implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() { clearInterval(this.intervalId); }

  ngOnInit() { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}

// 6. Parent calls on @ViewChild()
// 第5个交互里，使用局部变量，只能用于在template中与子组件交互，
// 但如果想在class里交互，就无法实现，所以需要借助其它手段比如ViewChild

// 7. 父子组件通过service来通信
// service实例的域是父组件及其所有子组件

// parent
@Component({
  selector: 'app-component-interaction',
  templateUrl: './component-interaction.component.html',
  styleUrls: ['./component-interaction.component.css']
})
// 此处的AfterViewInit用于第6种方式
export class ComponentInteractionComponent implements AfterViewInit {
  // 1. common parent to child
  heroes = [{ name: 'Jonge' }, { name: 'Joker' }];
  master = 'Master';

  // 2. getter/setter
  names = ['Mr. IQ', '   ', '  Bombasto  '];

  // 3. ngOnChange()
  major = 1;
  minor = 23;

  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }

  // 4. parent listen for child event, EventEmitter
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  onVoted(agreed: boolean) { // 这里监听child中emit的事件，并取到数据
    agreed ? this.agreed++ : this.disagreed++;
  }

  // 5. parent interact with child via local variable

  // 6. parent calls on @ViewChild()
  @ViewChild(CiChild5)
  private timerComponent: CiChild5;
  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    // 这里的延迟实际上就是防止Lifecycle Hook里提到的，ngAfterViewInit()中防止立即修改property导致异常
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}