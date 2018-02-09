// Import statements
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';

import { TicketService } from '../services/ticket.service';

// Attribute metadata
@Component({
  selector: 'ticket-list',
  styles: [],
  templateUrl: '../templates/ticketTable.html',
  providers: [TicketService]
})

// TicketList component class exposing the TicketList model
export class TicketListComponent {
  constructor(private ticketService: TicketService, private route: ActivatedRoute) {
  }

  tickets: any = [''];
  isFinalized: boolean = false;
  status: string;
  assignee: string;

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.assignee = params.get("assignee");
      });
    this.loadTicket(this.assignee);
  }

  finalize() {
    let selectedTickets: any = _.filter(this.tickets, ["isSelected", true]);
    for (var i in selectedTickets) {
      selectedTickets[i].Finalized = true;
    }
    this.ticketService.finalizeTickets(selectedTickets).subscribe(data => this.status = data.success)
  }

  finalizeSelected()
  {
    let selectedTickets: any = _.filter(this.tickets, ["isSelected", true]);
    if (selectedTickets.length > 0)
    {
      //if ((StatusTracking || ETR || Priority) = null)
      //{
      //  this.isFinalized = false; 
      //}
      //else {
      //  this.isFinalized = true; }
      this.isFinalized = true;
    }
    else
    {
      this.isFinalized = false;
    }
  }

  loadTicket(assignee) {
    this.ticketService.getTickets(assignee).subscribe(data => this.tickets = data);
  }


}
