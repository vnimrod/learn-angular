import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // Creating custom observable.
    // Observer- listener, will be informed about new data, errors or about the observable being completed

    /* The FLOW here - whenever we subscribe to observable and create our handlers function (on customIntervalObservable for example), 
       RxJS merge them all into one object, and passes the object (the observer) to the observable.
       Then inside the observable it will interact with the observer and let the observer know about new data errors and so on.
    */
    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        // Here we create our custom observable and add the logic then when we subscribe(below) to it we react to changes that happens here.
        // Example - here we use observer.complete, then we react to the completion on subscribe below

        // next(), emit a new value, and let our observer to know about the new data we entering to count.
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          // When we use observer.error, it cancels the observable and will not reach completed
          observer.error(new Error("Count is greater 3!"));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      /* pipe() - every observable has pipe method,
       * We can change data before the subscribe.
       * We can use for example, when we fetching data from a server and we want to transform that data before we use it on a component.
       * map and filter here, are used as OPERATORS that needs to be imported from rxjs/operators
       * The data that we first gets on filter, is count
       */
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
