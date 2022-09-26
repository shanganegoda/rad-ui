import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { Appointment } from 'src/app/Model/Appoinment';
import { EmailModel } from 'src/app/Model/EmailModel';
import { LocalStorage } from 'src/app/Model/LocalStorage';
import { environment } from 'src/environments/environment';
import { Appoinmentservice } from '../appoinmentservice.service';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number, month: number };
  appoinment: Appointment = new Appointment();
  year: number;
  month: number;
  day: number;
  emailModel: EmailModel=new EmailModel();
  dateForEmail: string;

  selectedDate: string;
  json = {
    disable: [6, 7],
    disabledDates: [
      { year: 2022, month: 6, day: 13 },
      { year: 2020, month: 8, day: 19 },
      { year: 2020, month: 8, day: 25 }
    ]
  };
  markDisabled: (date: NgbDate) => boolean;
  datesDisabled: boolean;
  constructor(private calendar: NgbCalendar, private router: Router, private appoinmentService: Appoinmentservice, private toastr: ToastrService) {
    this.disableDays();
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  ngOnInit(): void {
    this.emailModel.Email = localStorage.getItem("emailForMailing");
    this.emailModel.UserName = localStorage.getItem("firstNameForMailing");

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  disableDays() {
    this.datesDisabled = true;
    //to disable specific date and specific weekdays
    this.markDisabled = (
      date: NgbDateStruct
      //current: { day: number; month: number; year: number }
    ) => {
      return this.json.disabledDates.find(x =>
        (new NgbDate(x.year, x.month, x.day).equals(date))
        || (this.json.disable.includes(this.calendar.getWeekday(new NgbDate(date.year, date.month, date.day))))
      )
        ? true
        : false;
    };

    var t = localStorage.getItem("vehicleType");
    environment.production
    console.log(t);

  }
  ConfirmButtonClick() {
    let Qid = localStorage.getItem("QuotationId");
    this.appoinment.QuotationId = Number(Qid);
    let selectedDate = new Date(this.year, this.month, this.day);

    this.appoinment.AppointmentDate = selectedDate;
    this.appoinmentService.addAppoinment(this.appoinment).subscribe(
      async res => {
        console.log(this.appoinment);
        this.toastr.success("Your appoinment has been sent for review.You'll recieve an email notification once it's approved.", 'Success');
        await this.sendMail();
        localStorage.setItem("emailForMailing", '');
        localStorage.setItem("firstNameForMailing", '');
      },
      err => {
        console.log(err);
        this.toastr.error('Faild to make the appoinment', 'Error');

      }
    )
      ;
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", '');
    localStorage.setItem("address", '');
    localStorage.setItem("contactNo", '');
    localStorage.setItem("vehicleNumber", '');
    localStorage.setItem("totalPrice", '');

    this.router.navigateByUrl('/tables');


  }
  changeDate(event: any) {
    console.log(event);
    this.selectedDate = "Appoinment is scheduled on : " + event.year + "." + event.month + "." + event.day;
    this.year = event.year;
    this.month = event.month;
    this.day = event.day;
    this.emailModel.AppointmentDate = event.year + "." + event.month + "." + event.day;
  }
  async sendMail() {
    this.appoinmentService.sendMail(this.emailModel).subscribe(
      res => {
        console.log(res);

      },
      err => {
        console.log(err);

      }
    )
      ;
  }
}
