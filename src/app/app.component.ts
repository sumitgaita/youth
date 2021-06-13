import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.less'] })
export class AppComponent {
    user: User;
  //ispersonalSettings: boolean = false;
  isActive: boolean = false;
  constructor(private accountService: AccountService,
    private router: Router) {
      this.accountService.user.subscribe(x => this.user = x);
      //this.ispersonalSettings = false;
    }

    logout() {
      this.accountService.logout();
      //this.ispersonalSettings = false;
    }
  //personalSettings() {
  //  //this.ispersonalSettings = true;
  //  this.isActive = true;
  //  this.router.navigate(['/']);
  //}
  userSettings() {
    //this.ispersonalSettings = false;

    this.router.navigate(['/users']);
  }
  companySettings() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/company']);
  }
  ContactsSettings() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/contacts']);
  }
  rolesSettings() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/roles']);
  }
  accessControl() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/accesscontrol']);
  }
  team() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/team']);
  }
  talent() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/talent']);
  }
  //plansPayments() {
  //  //this.ispersonalSettings = false;
  //  this.router.navigate(['/']);
  //}
  //advancedSettings() {
  //  //this.ispersonalSettings = false;
  //  this.router.navigate(['/']);
  //}
  profilePassword() {
    //this.ispersonalSettings = false;
    this.router.navigate(['/']);

  }
}