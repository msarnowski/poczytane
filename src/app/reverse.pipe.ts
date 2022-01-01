import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  // sort array of books by date, descending

  transform(array: any[] | undefined): any[] | undefined {
    if (array) {
      const newArray = array.map(x => x);
      newArray.sort((x, y) => y.date - x.date);
      return newArray;
    } else {
      return array;
    }
  }

}
