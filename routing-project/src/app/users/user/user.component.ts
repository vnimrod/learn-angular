import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.snapshot.params["id"] - get the id from the url that we define on app-routing.module.ts same for name.
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
    // Angular not re create a component we already in, even if the data inside changes because we load new data (on user.html, load anna (10)).
    // We need to tell angular that we change something in that component.
    // solution: *this.route.params.subscribe* (differently from route.snapshot.params) is an observable.
    // It will know about change, when a new data will be sent through this observable (when event a parameter changes)
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  ngOnDestroy() {
    // This unsubscribe on destroy, happens beyond the scenes by angular. (we don't have to do this).
    // But, if we add our own observables, we need to manually unsubscri
    this.paramsSubscription.unsubscribe();
  }
}
