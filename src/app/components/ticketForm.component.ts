import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';

import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'ticket-form',

  templateUrl: '../templates/ticketForm.html',
  providers: [
    TicketService
  ]
})

export class TicketFormComponent {
  constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router) {
  }

  ticket = {
    IncidentId: '',
    AssigneeGroup: '',
    Assignee: '',
    NotificationText: '',
    SeverityNumber: '',
    Status: '',
    SuspendReason: '',
    StatusTracking: '',
    ETR: '',
    Priority: '',
    TBD: '',
    PreviousStatusTracking: '',
    PreviousETR: '',
    PreviousPriority: ''
  };
  private id: string;
  assignee: string;
  public ETRDate: any;
  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.id = params.get("id");
        this.assignee = params.get("assignee");
      });
    this.getTicket(this.id);
  }

  getTicket(id) {
    this.ticketService.getTicket(id).subscribe(data => {
        this.ticket = data; 
        var ETRSplit = this.ticket.ETR.split("\/", 3);
        this.ETRDate = {date: {year: Number(ETRSplit[2]), day: Number(ETRSplit[0]), month: Number(ETRSplit[1])}};
    });
    
  }

  public updateTicket(data: any): void {
    let payload = {
      "SeverityNumber": data.Severity,
      "Status": data.Status,
      "SuspendReason": data.SuspendReason,
      "Priority": data.Priority,
      "StatusTracking": data.StatusTracking,
      "ETR": data.ETR ? data.ETR.formatted : '',
      "TBD": data.TBD
    };
    this.ticketService.updateTicket(this.id, payload).subscribe(data => {
      this.router.navigate(['tickets', this.assignee]);
    });
  }

  //Set date format for datepicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

}
