import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';

@Pipe({
  name: 'localDate',
  pure: false
})
export class SharedLocalDatePipeComponent implements PipeTransform {
  public transform (date: string): string {
    let datePipe = new DatePipe('en-US');
    date = datePipe.transform(date, 'MMM-dd-yyyy');

    return date;
  }
}

