import { Routes } from '@angular/router';

import { TicketListComponent } from './components/ticketList.component';
import { TicketFormComponent } from './components/ticketForm.component';

export const routes: Routes = [
    { path: 'tickets', component: TicketListComponent },
    { path: 'update/:id', component: TicketFormComponent }
];

