import { AsyncPipe } from '@angular/common';
import { Pipe, ChangeDetectorRef } from '@angular/core';
import { map, timer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Pipe({
  name: 'dateFormat',
  pure: false
})
export class DateFormatPipe extends AsyncPipe {

  value!: Date;
  timer!: Observable<string>;
  readonly DAY_IN_MILLISECONDS = 86400000;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  override transform(value: any, args?: any[]): any {
    value = new Date(value);
    if (value instanceof Date) {
      this.value = value;

      if (!this.timer) {
        this.timer = this.getObservable();
      }

      return super.transform(this.timer);
    }

    return super.transform(value);
  }

  private getObservable() {
    return timer(0, 5000).pipe(map(() => {
      let result: string;
      // current time
      let now = new Date().getTime();

      // time since message was sent in seconds
      let delta = (now - this.value.getTime());

      if (delta >= this.DAY_IN_MILLISECONDS) {
        result = `${this.value.getDate()}/${this.value.getMonth() + 1}/${this.value.getFullYear()}`
      } else {
        const { hours, minutes, seconds } = this.convertMsToHM(delta);
        if (hours > 0) {
          result = `${hours} hours ago`;
        } else if (minutes > 0) {
          result = `${minutes} minutes ago`;
        } else {
          result = `${seconds} seconds ago`;
        }
      }

      return result;
    }));
  };

  convertMsToHM(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    //hours = hours % 24;

    return { hours, minutes, seconds };
  }
}
