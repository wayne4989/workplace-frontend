import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CommunityComponent
} from './community.component';
import {
  StudentCommunityComponent
} from './student-community/landing/student-community.component';
import {
  PrivateCommunityComponent
} from './private-community/private-community.component';
import {
  AnswerQuestionCommunityComponent
} from './student-community/answer-question/answer-question.component';

const communityRoutes: Routes = [{
  path: '',
  component: CommunityComponent,
  children: [ {
    path: 'student-community',
    children: [{
      path: '',
      redirectTo: 'landing',
      pathMatch: 'full',
    }, {
      path: 'landing',
      component: StudentCommunityComponent
    }, {
      path: ':courseId/:id',
      component:  AnswerQuestionCommunityComponent
    }]
  }, {
    path: 'private-community',
    component: PrivateCommunityComponent
  }]
}];

export const communityRouting: ModuleWithProviders = RouterModule.forChild(communityRoutes);
