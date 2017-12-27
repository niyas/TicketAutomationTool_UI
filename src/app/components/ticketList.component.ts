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

    ngOnInit() {
        this.loadTicket();
    }

    finalize() {
        let selectedTickets: any = _.filter(this.tickets, ["isSelected", true]);
        for (var i in selectedTickets) {
            selectedTickets[i].Finalized = true;
        }
        console.log(selectedTickets);
    }
    loadTicket() {
        this.ticketService.getTickets().subscribe(data => this.tickets = data);
    }

   
}