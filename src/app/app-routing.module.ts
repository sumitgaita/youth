import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const companyModule = () => import('./company/company.module').then(x => x.CompanyModule);
const contactsModule = () => import('./contacts/contacts.module').then(x => x.ContactsModule);
const rolesModule = () => import('./roles/roles.module').then(x => x.RolesModule);
const accesscontrolModule = () => import('./accesscontrol/accesscontrol.module').then(x => x.AccesscontrolModule);
const teamModule = () => import('./team/team.module').then(x => x.TeamModule);
const talentModule = () => import('./talent/talent.module').then(x => x.TalentModule);
const candidatesModule = () => import('./candidates/candidates.module').then(x => x.CandidatesModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'company', loadChildren: companyModule, canActivate: [AuthGuard] },
  { path: 'contacts', loadChildren: contactsModule, canActivate: [AuthGuard] },
  { path: 'roles', loadChildren: rolesModule, canActivate: [AuthGuard] },
  { path: 'accesscontrol', loadChildren: accesscontrolModule, canActivate: [AuthGuard] },
  { path: 'team', loadChildren: teamModule, canActivate: [AuthGuard] },
  { path: 'talent', loadChildren: talentModule, canActivate: [AuthGuard] },
  { path: 'candidates', loadChildren: candidatesModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
