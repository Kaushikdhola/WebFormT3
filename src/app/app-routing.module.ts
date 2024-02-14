import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  { path: 'profile-form', component: ProfileFormComponent },
  { path: '', component: ProfileFormComponent },
  { path: 'profile-view', component: ProfileViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
