import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

  constructor(private accountService: AccountService, private router: Router) {
    this.user = this.accountService.userValue;
    this.router.navigate(['/company/']);
    }
}
