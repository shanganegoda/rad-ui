import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/Model/LocalStorage';

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.scss']
})
export class VehicleSelectionComponent implements OnInit {
  vehicleNumber: string = '';
  vehicleType: string = '';
  vehicleNumber1: string = '';
  constructor(private router: Router) {
    this.vehicleNumber = localStorage.getItem("vehicleNumber");
    this.vehicleType = localStorage.getItem("vehicleType");
  }

  ngOnInit(): void {
  }

  continue() {
    localStorage.setItem("vehicleNumber", this.vehicleNumber);
    console.log(this.vehicleNumber1);
    this.router.navigateByUrl('/select-panels');
  }
  onChange(deviceValue) {
    console.log(deviceValue);
    localStorage.setItem("vehicleType", this.vehicleType);




  }
}
