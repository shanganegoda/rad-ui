import { Injectable } from '@angular/core';
import { Quotation } from '../Model/Quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor() { }
  formData:Quotation=new Quotation();
}
