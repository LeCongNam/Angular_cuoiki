import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {


  transform(value: any, ...args: unknown[]): unknown {
    if (value != null) {
      let date = new Date(value).toISOString().slice(0, 10).split('-')
      let dateFormat = `${date[2]}-${date[1]}-${date[0]}`
      return dateFormat
    }
    return null;
  }

}
