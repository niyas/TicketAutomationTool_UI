import { Component } from '@angular/core';
import { TicketListComponent } from './components/ticketList.component';


@Component({
  selector: 'app-root',
    template: `<div class="route-outlet">
      <router-outlet></router-outlet>
    </div>
    `,
})
export class AppComponent {
  title = 'Ticket Automation';
}
