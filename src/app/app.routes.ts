import { Routes } from '@angular/router';

import { TicketListComponent } from './components/ticketList.component';
import { TicketFormComponent } from './components/ticketForm.component';

export const routes: Routes = [
    { path: 'tickets/:assignee', component: TicketListComponent }, 
    { path: 'update/:assignee/:id', component: TicketFormComponent }
];

