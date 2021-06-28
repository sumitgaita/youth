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
  addAddressRow: Array<any> = [];
  newAddressRow: any = {};
  addEmailRow: Array<any> = [];
  newEmailRow: any = {};
  companyName: string;
  taglist: Array<any> = [];
  tagName: string;
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
    this.newAddressRow = { address: '', city: '', state: '', country: '' };
    this.addAddressRow.push(this.newAddressRow);
    this.newEmailRow = { primaryEmail: '', secondaryEmail: '' };
    this.addEmailRow.push(this.newAddressRow);
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
    this.newAddressRow = { address: '', city: '', state: '', country: '' };
    this.addAddressRow.push(this.newAddressRow);
    return true;
  }

  deleteAddressRow(index: number) {
    if (this.addAddressRow.length == 1) {
      return false;
    } else {
      this.addAddressRow.splice(index, 1);
      return true;
    }
  }
  addEmailListRow() {
    this.newEmailRow = { primaryEmail: '', secondaryEmail: '' };
    this.addEmailRow.push(this.newEmailRow);
    return true;
  }

  deleteEmailRow(index: number) {
    if (this.addEmailRow.length == 1) {
      return false;
    } else {
      this.addEmailRow.splice(index, 1);
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
