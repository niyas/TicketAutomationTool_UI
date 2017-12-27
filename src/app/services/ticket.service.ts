import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketService {
    constructor(
        private http: Http
    ) { }

    getTickets() {
        return this.http.get('http://localhost:50063/api/tickets')
            .map((res: Response) => res.json());
    }

    getTicket(id) {
        return this.http.get('http://localhost:50063/api/tickets/' + id)
            .map((res: Response) => res.json());
    }

    updateTicket(id, payload) {
        return this.http.patch(
            'http://localhost:50063/api/tickets/' + id,
            payload
        ).map((res: Response) => res.json());
    }
}