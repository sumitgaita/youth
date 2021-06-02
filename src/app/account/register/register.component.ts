import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  socialProvider: string = '';
  linkedInToken = "";
  private linkedInCredentials = {
    clientId: "86djw2uannjx09",
    redirectUrl: "http://localhost:4200/account/login/",
    clientsecret: "zQshRSIn0UiiKEfg",
    scope: 'r_liteprofile'
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      companyname: [''],

    });
    this.linkedInToken = this.route.snapshot.queryParams["code"];
    if (this.linkedInToken) {
      //window.location.href = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=${this.linkedInCredentials.redirectUrl}&client_id=${this.linkedInCredentials.clientId}&client_secret=${this.linkedInCredentials.clientsecret}&code=${this.linkedInToken}`


    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    let socialPlatformProvider;
    if (this.socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.signIn(socialPlatformProvider).then(socialusers => {
        console.log(this.socialProvider, socialusers);
        console.log(socialusers);
        let user = this.accountService.dumyLogin();
        this.router.navigate(['/home']);
      });
    }
    else if (this.socialProvider === 'LinkedIn') {
      window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.linkedInCredentials.clientId}&client_secret=${this.linkedInCredentials.clientsecret}&scope=${this.linkedInCredentials.scope}&redirect_uri=${this.linkedInCredentials.redirectUrl}`;

    }
    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    //if (this.form.invalid) {
    //  return;
    //}

    //this.loading = true;
    //this.accountService.register(this.form.value)
    //  .pipe(first())
    //  .subscribe({
    //    next: () => {
    //      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
    //      this.router.navigate(['../login'], { relativeTo: this.route });
    //    },
    //    error: error => {
    //      this.alertService.error(error);
    //      this.loading = false;
    //    }
    //  });
  }

  socialSignIn(socialProvider: string) {
    this.socialProvider = '';
    this.socialProvider = socialProvider;
   

  }
}

