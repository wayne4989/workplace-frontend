/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  SharedSlideToggleDirectiveComponent
} from './slide-toggle.directive';
import {
  SharedEqualValidatorDirectiveComponent
} from './equal-validator.directive';
import {
  SharedStickyDirective
} from './sticky.directive';
import {
  SharedRemoveCssDirective
} from './remove-css';
import {
  SharedAddCssDirective
} from './add-css';
@NgModule({
  imports: [],
  declarations: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent,
    SharedStickyDirective,
    SharedRemoveCssDirective,
    SharedAddCssDirective
  ],
  exports: [
    SharedSlideToggleDirectiveComponent,
    SharedEqualValidatorDirectiveComponent,
    SharedStickyDirective,
    SharedRemoveCssDirective,
    SharedAddCssDirective
  ],
  providers: []
})
export class SharedDirectiveModule {}
