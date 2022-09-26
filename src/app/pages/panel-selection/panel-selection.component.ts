import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalStorage } from 'src/app/Model/LocalStorage';
import { QuotationPanel } from 'src/app/Model/QuatationPannel';
import { Appoinmentservice } from '../appoinmentservice.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-panel-selection',
  templateUrl: './panel-selection.component.html',
  styleUrls: ['./panel-selection.component.scss']
})
export class PanelSelectionComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  vehicleType = 1;
  totalPrice = 0;
  quotationPanel:QuotationPanel=new QuotationPanel();
  constructor(private router: Router,private dataService:DataService,private appoinmentServcie:Appoinmentservice) { }

  ngOnInit() {
    if (this.vehicleType == 1) { //Car
      this.dropdownList = [
        { id: 1, label: 'Front buffer', price: 10000 },
        { id: 2, label: 'Back buffer', price: 10000 },
        { id: 3, label: 'Left fender', price: 7000 },
        { id: 4, label: 'Right fender', price: 7000 },
        { id: 5, label: 'Front left door', price: 12000 },
        { id: 6, label: 'Front right door', price: 12000 },
        { id: 7, label: 'Back left door', price: 11000 },
        { id: 8, label: 'Back right door', price: 11000 },
        { id: 9, label: 'Hood', price: 10000  },
        { id: 10, label: 'Boot', price: 10000 },
        { id: 11, label: 'Roof', price: 12000 }
      ];
    } else if(this.vehicleType == 2) { //Van
      this.dropdownList = [
        { id: 1, label: 'Front buffer', price: 10000},
        { id: 2, label: 'Back buffer', price: 10000 },
        { id: 3, label: 'Front left door', price: 12000 },
        { id: 4, label: 'Front right door', price: 12000 },
        { id: 5, label: 'Back left door', price: 11000 },
        { id: 6, label: 'Back right door', price: 11000 },
        { id: 7, label: 'Roof', price: 12000 },
        { id: 8, label: 'Boot', price: 10000 },
        { id: 9, label: 'Front panel', price: 10000 }
        
      ];
    } else { //Bus
      this.dropdownList = [
        { id: 1, label: 'Front buffer', price: 3000 },
        { id: 2, label: 'Back buffer', price: 3000 },
        { id: 3, label: 'Front left door', price: 10000 },
        { id: 4, label: 'Front right door', price: 10000 },
        { id: 5, label: 'Back left door', price: 7000 },
        { id: 6, label: 'Right body', price: 12000},
        { id: 7, label: 'Left body', price: 12000 },
        { id: 8, label: 'Roof', price: 15000 },
        { id: 9, label: 'Boot', price: 10000 },
        { id: 10, label: 'Front panel', price: 10000 }
        
      ];
    }
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    this.getTotal();
  }
  onSelectAll(items: any) {
    this.selectedItems=items;
    console.log(items);
    this.getTotal();
  }

  getTotal(){
    this.totalPrice = 0;
    this.selectedItems.forEach(element => {
      let price = this.dropdownList.filter(d => d.id === element.id)[0].price;
      this.totalPrice += price;
    });
    console.log(this.totalPrice);
  }

  findPrice(id){
    return this.dropdownList.filter(d => d.id === id)[0].price;
  }

  continue() {
    this.router.navigateByUrl('/personal-details');
    this.dataService.changeMessage( this.selectedItems);
localStorage.setItem("totalPrice",this.totalPrice.toString())
LocalStorage.selectedItems=this.selectedItems
console.log(LocalStorage.selectedItems);
  }

}
