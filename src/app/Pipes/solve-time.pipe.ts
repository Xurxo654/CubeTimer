import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'solveTime'
})
export class SolveTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 6000);
    value %= 6000;
    const seconds = Math.floor(value / 100);
    value %= 100;
    return minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0') + '.' + value.toString().padStart(2, '0');
  }

}
