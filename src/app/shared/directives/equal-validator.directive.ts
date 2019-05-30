import {
  Directive,
  forwardRef,
  Attribute
} from '@angular/core';
import {
  Validator,
  AbstractControl,
  NG_VALIDATORS
} from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SharedEqualValidatorDirectiveComponent), multi: true }
  ]
})
export class SharedEqualValidatorDirectiveComponent implements Validator {
  constructor (
    @Attribute('validateEqual') private validateEqual: string,
    @Attribute('reverse') private reverse: string
  ) {}

  private get isReverse (): boolean {
    if (!this.reverse) {
      return false;
    }

    return this.reverse === 'true' ? true : false;
  }

  public validate (c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;
    // control vlaue
    let e = c.root.get(this.validateEqual);
    // value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: false
      };
    }
    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) {
        e.setErrors(null);
      }
    }
    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({
        validateEqual: false
      });
    }
    return null;
  }
}
