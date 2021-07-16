import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.less']
})
export class AddEditComponent implements OnInit {
  @ViewChild('addTag') addTag: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  statusList: string[] = ['Active', 'Closed'];
  //addAddressRow: Array<any> = [];
  newAddressRow: any = {};
  addressList: Array<any> = [];
  //addEmailRow: Array<any> = [];
  emailList: Array<any> = [];
  newEmailRow: any = {};
  companyName: string;
  taglist: Array<any> = [];
  tagName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  primaryEmail: string;
  secondaryEmail: string;
  website: string;
  isWebsiteVisible: boolean;
  instagram: string = '';
  facebook: string = '';
  linkedin: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.website = 'www.google.com';
    this.instagram = 'https://www.instagram.com/';
    this.facebook = 'https://www.facebook.com/';
    this.linkedin = 'https://in.linkedin.com/';
    this.isWebsiteVisible = this.website && this.website.length > 0 ? false : true;
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      //username: ['', Validators.required],
      //password: ['', passwordValidators]
      status: ['', Validators.required]
    });

    if (!this.isAddMode) {
      //this.accountService.getById(this.id)
      //  .pipe(first())
      //  .subscribe(x => this.form.patchValue(x));
    }
    //this.newAddressRow = { address: '', city: '', state: '', country: '' };
    //this.addAddressRow.push(this.newAddressRow);
    this.newEmailRow = { primaryEmail: '', secondaryEmail: '' };
    //this.addEmailRow.push(this.newAddressRow);
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

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  editwebsite() {
    this.isWebsiteVisible = true;
  }
  deletewebsite() {
    this.website = '';
    this.isWebsiteVisible = true;
  }
  private createUser() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
  SocialFootprint(social: string) {
    if (social === 'linkedin' && this.linkedin && this.linkedin !== '') {
      window.open(this.linkedin, '_blank');
    }
    else if (social === 'facebook' && this.facebook && this.facebook !== '') {
      window.open(this.facebook, '_blank');
    }
    else if (social === 'instagram' && this.instagram && this.instagram !== '') {
      window.open(this.instagram, '_blank');
    }

  }
  openPopup() {
    this.tagName = '';
    this.openModel(this.addTag);
  }

  addTagList() {
    this.taglist.push(this.tagName);
    this.modalService.dismissAll();
  }
  tagRemove(index: number) {
    this.taglist.splice(index, 1);
    return true;

  }
  addAddressListRow() {
    if ((this.address && this.address !== '') && (this.city && this.city !== '')
      && (this.state && this.state !== '') && (this.country && this.country !== '')) {
      this.newAddressRow = { address: this.address, city: this.city, state: this.state, country: this.country };
      this.addressList.push(this.newAddressRow);
      this.clearAddress();
      return true;
    }
  }

  clearAddress() {
    this.address = '';
    this.city = '';
    this.state = '';
    this.country = '';
  }

  editAddressRow(address: any) {
    this.address = address.address;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
  }
  deleteAddressRow(index: number) {
    if (this.addressList.length == 0) {
      return false;
    } else {
      this.addressList.splice(index, 1);
      return true;
    }
  }
  addEmailListRow() {
    if ((this.primaryEmail && this.primaryEmail !== '') && (this.secondaryEmail && this.secondaryEmail !== '')) {
      this.newEmailRow = { primaryEmail: this.primaryEmail, secondaryEmail: this.secondaryEmail };
      this.emailList.push(this.newEmailRow);
      this.clearEmail();
      return true;
    }
  }

  clearEmail() {
    this.primaryEmail = '';
    this.secondaryEmail = '';
  }

  editEmailRow(email: any) {
    this.primaryEmail = email.primaryEmail;
    this.secondaryEmail = email.secondaryEmail;
  }

  deleteEmailRow(index: number) {
    if (this.emailList.length == 0) {
      return false;
    } else {
      this.emailList.splice(index, 1);
      return true;
    }
  }
  private openModel(content: any) {
    this.modalService.open(content, { centered: true, backdrop: "static", size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
