import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.less'] })
export class AppComponent {
  user: User;
  isActive: boolean = false;
  menuState: any; 
  constructor(private accountService: AccountService,
    private router: Router, private route: ActivatedRoute) {
    this.menuState = '';
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd');
        //this.menuState = this.menuState === '' ? 'show' : '';
        this.menuState = '';
      }
    });
    this.accountService.user.subscribe(x => this.user = x);
  }

  toggleNavbar() {
    if (!this.menuState) {
      this.menuState = 'show';
    } else {
      this.menuState = '';
    }
  }

  logout() {
    this.accountService.logout();
  }
  //userSettings() {
  //  this.router.navigate(['/users']);
  //}  

  //companySettings() {
  //  this.router.navigate(['/company']);
  //}
  //ContactsSettings() {
  //  this.router.navigate(['/contacts']);
  //}
  //rolesSettings() {
  //  this.router.navigate(['/roles']);
  //}
  //accessControl() {
  //  this.router.navigate(['/accesscontrol']);
  //}
  //team() {
  //  this.router.navigate(['/team']);
  //}
  //talent() {
  //  this.router.navigate(['/talent']);
  //}
  //profilePassword() {
  //  this.router.navigate(['/']);

  //}
}
