import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../Model/Appoinment';
import { EmailModel } from '../Model/EmailModel';
import { QuotationPanel } from '../Model/QuatationPannel';
import { Quotation } from '../Model/Quotation';

const baseURL = environment.BaseURL;

@Injectable({
  providedIn: 'root'
})
export class Appoinmentservice {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  getAppoinments(): Observable<any> {
    return this.httpClient.get(baseURL+'api/Quotations');
  }

  addPannels(pannel:QuotationPanel): Observable<any> {
    return this.httpClient.post(baseURL+'api/QuotationPanels',pannel);
  }
  addQuotation(quotation:Quotation): Observable<any> {
    return this.httpClient.post(baseURL+'api/Quotations',quotation);
  }
  addAppoinment(appoinment:Appointment): Observable<any> {
    return this.httpClient.post(baseURL+'api/Appointments',appoinment);
  }
  getMaxQuotationId(): Observable<any> {
    return this.httpClient.get(baseURL+'api/Quotations/GetMaxQuotation');
  }
  getAllQuotations(): Observable<any> {
    return this.httpClient.get(baseURL+'api/Quotations/GetAllQuotations');
  }
  sendMail(emailModel:EmailModel): Observable<any> {
    return this.httpClient.post(baseURL+'api/Appointments/SendConfirmationMail',emailModel);
  }
  getData(id){
    return this.httpClient.get<any[]>(baseURL+'api/Quotations').pipe(
        map(data=>{
            var status = data.reduce((item, curr) => {
                return item.id < curr.id ? curr : item;
              }).status.title;
        
            return status;
        }),
        
    );
}

}
