import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  // By adding providers to AppModule and add our services to it, we making sure that all of our app anywhere, receives that same instance of those services.
  // If we want to override it, we must add to the components that overrides, a providers and add the service again.
  // for using the same instance we need to import it and add it to a constructor.
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
