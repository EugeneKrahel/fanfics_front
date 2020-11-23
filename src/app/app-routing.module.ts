import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/noAuth.guard';
import {CreateFanficComponent} from './create-fanfic/create-fanfic.component';
import {ProfileComponent} from './profile/profile.component';
import {FanficEditorComponent} from './fanfic-editor/fanfic-editor.component';
import {NewChapterComponent} from './new-chapter/new-chapter.component';
import {EditChapterComponent} from './edit-chapter/edit-chapter.component';
import {ReadFanficComponent} from './read-fanfic/read-fanfic.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },

  {
    path: 'login', component: LoginComponent, children: [
      {path: '', component: AppComponent, canActivate: [NoAuthGuard]}
    ]
  },

  {
    path: 'registration', component: RegisterComponent, children: [
      {path: '', component: AppComponent, canActivate: [NoAuthGuard]}
    ]
  },

  {
    path: 'admin', children: [
      {path: '', component: AppComponent, canActivate: [AuthGuard]}
    ]
  },

  {
    path: 'new', component: CreateFanficComponent, children: [
      {path: '', component: AppComponent, canActivate: [AuthGuard]}
    ]
  },

  {
    path: 'profile/:id', component: ProfileComponent
  },

  {
    path: 'fanfic/:id/edit', component: FanficEditorComponent, children: [
      {path: '', component: AppComponent, canActivate: [AuthGuard]}
    ]
  },

  {
    path: 'fanfic/:id/read', component: ReadFanficComponent
  },

  {
    path: 'fanfic/:id/edit/new', component: NewChapterComponent, children: [
      {path: '', component: AppComponent, canActivate: [AuthGuard]}
    ]
  },

  {
    path: 'chapter/:id/edit', component: EditChapterComponent, children: [
      {path: '', component: AppComponent, canActivate: [AuthGuard]}
    ]
  },

  {
    path: 'confirm?email=:email&token=:confirmKey', component: ConfirmationComponent, children: [
      {path: '', component: AppComponent, canActivate: [NoAuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
