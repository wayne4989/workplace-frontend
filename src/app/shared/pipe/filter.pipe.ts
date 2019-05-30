import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class SharedFilterPipeComponent implements PipeTransform {
  public transform (items: any[], key: string, value: string, option: string): any[] {
    if (!items) { return []; }
    if (!value || value.length === 0) { return items; }

    if (option === 'search') {
      let regExp = new RegExp('\\b' + value, 'gi');
      return items.filter(item => regExp.test(item[key]));
    }

    return items.filter((item: any) => {
      if (item[key]) {
        return item[key] === value;
      }

      return false;
    });
  }
}
