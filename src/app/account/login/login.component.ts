import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    let user = this.accountService.dumyLogin();
    if (user) {
      this.router.navigate(['/home']);
    }

    // this.loading = true;
    //this.accountService.login(this.f.username.value, this.f.password.value).subscribe({
    //  next: () => {
    //    // get return url from query parameters or default to home page
    //    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //    this.router.navigateByUrl(returnUrl);
    //  },
    //  error: error => {
    //    this.alertService.error(error);
    //    this.loading = false;
    //  }
    //});
    //this.router.navigate(['/users']);

  }
  
}
