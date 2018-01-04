﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class TicketService {
    constructor(
        private http: Http
    ) { }

    //Set the API host from environment variables
    apiHost: string = environment.apiHost;

    /**
     * Get the list of all tickets from API
     * @return {Promise}
     */
    getTickets(assignee) {
        return this.http.get(this.apiHost + '/api/tickets/gettickets/'+ assignee)
            .map((res: Response) => res.json());
    }

    /**
     * Get a ticket using Id
     * 
     * @param {String} id 
     * @return {Promise}
     */
    getTicket(id) {
        return this.http.get(this.apiHost + '/api/tickets/' + id)
            .map((res: Response) => res.json());
    }

    /**
     * Update a ticket using its Id
     * 
     * @param {String} id 
     * @param {Object} payload 
     * @returns {Promise}
     */
    updateTicket(id, payload) {
        return this.http.patch(
            this.apiHost + '/api/tickets/' + id,
            payload
        ).map((res: Response) => res.json());
    }

     /**
     * Update finalize status for list of tickets
     * 
     * @param {Array} payload 
     * @returns {Promise}
     */
    finalizeTickets(payload) {
        return this.http.patch(
            this.apiHost + '/api/tickets/finalize/',
            payload
        ).map((res: Response) => res.json());   
    }
}