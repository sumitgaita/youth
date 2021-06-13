import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  static onEditCompanyRow = new EventEmitter<any>();
  
  constructor(private http: HttpService) { }


}
