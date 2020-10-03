import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'swtDecimal' })
export class SwtDecimal implements PipeTransform {
  transform(name: any, value: any): any {
    if (window.innerWidth < 520) {
      if (name === 'btc') {
        return Math.round(value * Math.pow(10, 5)) / Math.pow(10, 5);
      }
      return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
    } else {
      return Math.round(value * Math.pow(10, 13)) / Math.pow(10, 13);
    }
  }
}
