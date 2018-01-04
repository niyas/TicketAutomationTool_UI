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
        IncidentId:'',
        AssigneeGroup: '',
        Assignee:'',
        NotificationText: '',
        SeverityNumber:'',
        Status:'',
        SuspendReason:'',
        StatusTracking:'',
        ETR:'',
        Priority:''
    };
    private id: string;
    assignee: string;

    ngOnInit() {
         this.route.paramMap
            .subscribe(params => {
                this.id = params.get("id");
                this.assignee = params.get("assignee");
            });
        this.getTicket(this.id);
    }

    getTicket(id) {
        this.ticketService.getTicket(id).subscribe(data => this.ticket = data);
    }

    public updateTicket(data: any): void {
        let payload = {
            "SeverityNumber": data.SeverityNumber,
            "Status": data.Status,
            "SuspendReason": data.SuspendReason,
            "Priority": data.Priority,
            "StatusTracking": data.StatusTracking,
            "ETR": data.ETR.formatted
        };
        this.ticketService.updateTicket(this.id, payload).subscribe(data => {
            this.router.navigate(['tickets',this.assignee]);
        });
    }

    //Set date format for datepicker
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
    };
   
}