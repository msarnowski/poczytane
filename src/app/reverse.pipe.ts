import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(array: any[] | undefined): any[] | undefined {
    if (array) {
      const newArray = array.map(x => x);
      newArray.reverse();
      return newArray;
    } else {
      return array;
    }
  }

}
