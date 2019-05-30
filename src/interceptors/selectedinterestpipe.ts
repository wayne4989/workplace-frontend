import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({ name: 'selectedInterest', pure: false })
export class SelectedInterestPipe implements PipeTransform {
  public transform (allInterests: any[]): any {
    let prev_parent_value = false;
    let prev_interest: any;
    let res = [];

    allInterests.forEach((interest: any) => {
      if (interest.parentisselected) {
        res.push(interest);
        if (interest.interest_value !== prev_parent_value) {
          if (prev_interest) { prev_interest.last_in_group = true; }
          interest.parent_title = interest.interest_value;
          prev_parent_value = interest.interest_value;
        } else {
          interest.parent_title = undefined;
        }
        prev_interest = interest;
      }
    });

    return res;
  }
}
