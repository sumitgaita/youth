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
  @ViewChild('addNotes') addNotes: NgbModal;
  modalOptions: NgbModalOptions;
  closeResult: string;
  form: FormGroup;
  id: string;
  dataset = '';
  isAddMode: boolean;
  loading = false;
  submitted = false;
  titleList: string[] = ['Mr.', 'Mrs'];
  preferredtimeList: string[] = ['Morning', 'Afternoon', 'Evening'];
  connectionsList: string[] = ['Related to', 'Referred by', 'Reports To'];
  preferredModeList: string[] = ['Offical', 'Home', 'Mobile'];
  @ViewChild('ContractContent') ContractContent: any;
  content: string;
  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
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
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: '',
      forcePasteAsPlainText: true
    };
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
      title: ['', Validators.required],
      preferredtime: [''],
      connections: [''],
      preferredMode: ['']
    });

    if (!this.isAddMode) {
      //this.accountService.getById(this.id)
      //  .pipe(first())
      //  .subscribe(x => this.form.patchValue(x));
    }
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
    this.openModel(this.addTag);
  }
  openNotesPopup() {
    this.openModel(this.addNotes);
  }

  private openModel(content) {
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
