import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/Model/LocalStorage';
import { Appoinmentservice } from '../appoinmentservice.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
   firstName: string='';
   lastName: string='';
   address: string='';
   contactNo: string='';
   email: string='';

  constructor(private router: Router,private productService: Appoinmentservice) { 
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.address = localStorage.getItem("address");
    this.contactNo = localStorage.getItem("contactNo");
  }

  ngOnInit(): void {
   
  }

  continue() {

    localStorage.setItem("firstName",this.firstName);
    localStorage.setItem("lastName",this.lastName);
    localStorage.setItem("address",this.address);
    localStorage.setItem("contactNo",this.contactNo);
    localStorage.setItem("emailForMailing",this.email);
    localStorage.setItem("firstNameForMailing",this.firstName);

   
    this.router.navigateByUrl('/vehicle-quotation');
  }

}
