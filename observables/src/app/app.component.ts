import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  //store the subscription
  private activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // activatedEmitter is a subject, we must unsubscribe to subjects that we created.
    this.activatedSub = this.userService.activatedEmitter.subscribe(
      (didActivate) => {
        this.userActivated = didActivate;
      }
    );
  }

  ngOnDestroy(): void {
    // unsubscribe to the subject subscription.
    this.activatedSub.unsubscribe();
  }
}
