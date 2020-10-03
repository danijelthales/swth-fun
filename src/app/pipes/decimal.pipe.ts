import { Pipe, PipeTransform } from '@angular/core';

const DECIMALS_DESKTOP = 13;
const DECIMALS_MOBILE = 5;

@Pipe({ name: 'swtDecimal' })
export class SwtDecimal implements PipeTransform {
  transform(value: any): any {
    if (window.innerWidth > 520) {
      return (
        Math.round(value * Math.pow(10, DECIMALS_DESKTOP)) /
        Math.pow(10, DECIMALS_DESKTOP)
      );
    } else {
      return (
        Math.round(value * Math.pow(10, DECIMALS_MOBILE)) /
        Math.pow(10, DECIMALS_MOBILE)
      );
    }
  }
}
