import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor() { }


  ngOnDestroy() {
  }

  ngOnInit(): void {
  }

  selectFiles(uploadFiles): void {
    this.progressInfos = [];
    this.selectedFiles = uploadFiles.target.files;
    for (let i = 0; i !== this.selectedFiles.length; i++) {
      if (this.selectedFiles[i].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
       // Swal.fire("Wrong File Upload, Upload only Excel Files.");
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Wrong File Upload, Upload only Excel Files.'
        })
        this.selectedFiles = {} as FileList;
        return ;
      }
    }
  }

  upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    //this.uploadService.upload(file).subscribe(
    //  event => {
    //    if (event.type === HttpEventType.UploadProgress) {
    //      this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
    //    } else if (event instanceof HttpResponse) {
    //      this.fileInfos = this.uploadService.getFiles();
    //    }
    //  },
    //  err => {
    //    this.progressInfos[idx].value = 0;
    //    this.message = 'Could not upload the file:' + file.name;
    //  });
  }

  uploadFiles(): void {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

}



