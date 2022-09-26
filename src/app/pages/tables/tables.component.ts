import { Component, OnInit } from '@angular/core';
import { QuotationForGetAll } from 'src/app/Model/QuotationForGetAll';
import { Appoinmentservice } from '../appoinmentservice.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
 allAppoinments:Array<QuotationForGetAll>=new Array<QuotationForGetAll>();
  constructor(private appoinmentService: Appoinmentservice) { 
  }

  ngOnInit() {
    this.getAppoinments();
  }
  getAppoinments(){
this.appoinmentService.getAllQuotations().subscribe
    (
     response => {
        console.log(response);
        response.forEach(element => {
          let appoinment:QuotationForGetAll=new QuotationForGetAll();
          appoinment.Date=element.date;
          appoinment.Estimation=element.estimation;
          appoinment.VehicleId=element.vehicleId;
this.allAppoinments.push(appoinment);
        });
        //this.allAppoinments=response;
  },
    error => {
        console.log(error);
     });
}}
