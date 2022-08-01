import { EventEmitter, Injectable } from '@angular/core';

import { LoggingService } from './logging.service';

// When we use a service on our component, all his child components have access to the properties in that service.
// If we provide a service on AppModule, instances of that service will be available Application wide.

// Injectable decorator tell angular that to this service something can be inject, the receiving service. (here we using loggingService)
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  // By adding a new EventEmitter here, we can use it on the component that consume the service.
  /* For example we consume this service on account.component, there we emit it with our status,
     then we subscribe to it on new-account.component.
     In this way we can pass properties to siblings component easily.

     Before services we needed to:
     1. Create new emitter on account.component
     2. Emit the status from account.component
     3. Get it on app component
     4. pass down to new-account.component
  */
  statusUpdated = new EventEmitter<string>();

  // inject LoggingService to AccountsService
  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
