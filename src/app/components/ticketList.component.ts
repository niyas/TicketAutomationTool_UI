import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as _ from "lodash";

import { TicketService } from '../services/ticket.service';

@Component({
    selector: 'ticket-list',
    styles: [],
    templateUrl: '../templates/ticketTable.html',
    providers: [TicketService]
})
 
export class TicketListComponent {
    constructor(private ticketService: TicketService) {
    }

    tickets: any = [''];
    isFinalized: boolean = false;
    status: string;
    ngOnInit() {
        this.loadTicket();
    }

    finalize() {
        let selectedTickets: any = _.filter(this.tickets, ["isSelected", true]);
        for (var i in selectedTickets) {
            selectedTickets[i].Finalized = true;
        }
        this.ticketService.finalizeTickets(selectedTickets).subscribe(data => this.status = data.success)
    }

    finalizeSelected() {
        let selectedTickets: any = _.filter(this.tickets, ["isSelected", true]);
        if(selectedTickets.length > 0) {
            this.isFinalized = true;
        }
        else {
            this.isFinalized = false;
        }
    }

    loadTicket() {
        this.ticketService.getTickets().subscribe(data => this.tickets = data);
    }

   
}