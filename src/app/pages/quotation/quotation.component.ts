import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { afterRead } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { LocalStorage } from 'src/app/Model/LocalStorage';
import { QuotationPanel } from 'src/app/Model/QuatationPannel';
import { Quotation } from 'src/app/Model/Quotation';
import { QuotationService } from 'src/app/Services/quotation-service.service';
import { Appoinmentservice } from '../appoinmentservice.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  vehicleNo: string;
  currentDate = new Date();
  currentDateFormatted: string;
  firstName: string;
  lastName: string;
  address: string;
  contactNo: string;
  selectedItems = [];
  quotation: Quotation = new Quotation();
  quotationPannels: QuotationPanel = new QuotationPanel();

  id: string;
  totalPrice: string = '';
  arrd: Array<string> = new Array<string>();
  constructor(private router: Router,private toastr: ToastrService, private appoinmentService: Appoinmentservice, private dataService: DataService, public service: QuotationService) {
    this.vehicleNo = localStorage.getItem("vehicleNumber");
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.address = localStorage.getItem("address");
    this.contactNo = localStorage.getItem("contactNo");
    this.totalPrice = localStorage.getItem("totalPrice");


    this.currentDateFormatted = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    // this.selectedItems=LocalStorage.selectedItems;
    console.log("sel" + LocalStorage.selectedItems);
  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => (this.selectedItems = message));
    console.log("itemmmsss" + this.selectedItems.values.toString());
    //let arrd:Array<string>;
    this.selectedItems.forEach(element => {
      this.arrd.push(element.label.toString());
    });//find price method ekk danna
    this.arrd.concat(this.selectedItems.values.toString());
    console.log(this.arrd);
    this.selectedItems.forEach(projet => console.log(projet.label));

    this.getAppoinmentCount();
  }

  async continue() {
    this.quotation.FirstName = this.firstName;
    this.quotation.LastName = this.lastName;
    this.quotation.Address = this.address;
    this.quotation.MobileNumber = this.contactNo;
    this.quotation.VehicleId = this.vehicleNo;
    this.quotation.TotalCount = this.totalPrice;

     this.appoinmentService.addQuotation(this.quotation).subscribe(
       res => {
        localStorage.setItem("QuotationId", this.id);

        console.log(this.quotation);
         this.toastr.success('You have added the quotation succesfully', 'Success');

      },
       err => {
        console.log(err);
         this.toastr.error('Failed to add the quotation ', 'Error');

      }
    )
    this.addPannels();
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", '');
    localStorage.setItem("address", '');
    localStorage.setItem("contactNo", '');
    localStorage.setItem("vehicleNumber", '');
    localStorage.setItem("totalPrice", '');
    await delay(1000);
    LocalStorage.selectedItems=null;
     this.router.navigateByUrl('/make-appoinment');
  }

  addPannels(){
    this.arrd.forEach(element => {
      let quotationPanel:QuotationPanel=new QuotationPanel();
      let Qid=localStorage.getItem("QuotationId");
      quotationPanel.QuotationId= Number(Qid) ;
      quotationPanel.PanelName= element ;
      quotationPanel.Price= this.findPrice(quotationPanel.PanelName) ;

      this.appoinmentService.addPannels(quotationPanel).subscribe(
        res => {  
          console.log(quotationPanel);
        },
        err => {
          console.log(err)
        }
      )
    });

  }
  getAppoinmentCount() {
    this.appoinmentService.getMaxQuotationId().subscribe
      (
        response => {
          console.log(response);
          this.id = response + 1;
         

        },
        error => {
          console.log(error);
        });
  }

  findPrice(name: string) {
    let vehicleType = localStorage.getItem("vehicleType");
    if (vehicleType === 'Car') {
      switch (name) {
        case "Front buffer":
          return 10000
          break;
        case "Back buffer":
          return 10000

          break;
        case "Left fender":
          return 7000

          break;
        case "Right fender":
          return 7000

          break;
        case "Front left door":
          return 12000

          break;
        case "Front right door":
          return 12000

          break;
        case "Back left door":
          return 11000

          break;
        case "Back right door":
          return 11000

          break;
        case "Hood":
          return 10000

          break;
        case "Boot":
          return 10000

          break;
        case "Roof":
          return 12000

          break;

        default:
          break;
      }

    }
    else if (vehicleType === 'Van') {
      switch (name) {
        case "Front buffer":
          return 10000
          break;
        case "Back buffer":
          return 10000

          break;

        case "Front left door":
          return 12000

          break;
        case "Front right door":
          return 12000

          break;
        case "Back left door":
          return 11000

          break;
        case "Back right door":
          return 11000

          break;
          case "Left fender":
            return 7000
  
            break;
          case "Right fender":
            return 7000
  
            break;
        case "Boot":
          return 10000

          break;
        case "Roof":
          return 12000

          break;
          case "Hood":
            return 10000
  
            break;
        case "Front panel":
          return 10000

          break;

        default:
          break;
      }

    }
    else {
      switch (name) {
        case "Front buffer":
          return 3000
          break;
        case "Back buffer":
          return 3000

          break;

        case "Front left door":
          return 10000

          break;
        case "Front right door":
          return 10000

          break;
        case "Back left door":
          return 7000

          break;
        case "Back right door":
          return 11000

          break;
          case "Left fender":
            return 7000
  
            break;
          case "Right fender":
            return 7000
  
            break;
        case "Boot":
          return 10000

          break;
          case "Hood":
            return 10000
  
            break;
        case "Roof":
          return 15000

          break;
        case "Right body":
          return 12000

          break;
        case "Left body":
          return 12000

          break;
        case "Front panel":
          return 10000

          break;

        default:
          break;
      }
    }
    //return this.dropdownList.filter(d => d.id === id)[0].price;
  }


  
}


