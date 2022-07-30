import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  /* encapsulation, for scoped styles to the current component:
      1. Emulated: ads ngcontent-ejo-{index} to each element
      2. None: remove extra style text for a specific component. but, if we add any style to that specific component, it will be global styles
      3. ShadowDom: uses the shadow dom technology only in browsers that support it */
  encapsulation: ViewEncapsulation.Emulated, // None, Native
})
// implements is a good practice to be very explicit about which interfaces or methods our component will have.
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  /* @input is a decorator that exposing the property "element" to the world in a way that any
  parent component hosting our server component as a selector(in app.component.html line 13) is now able to bind to "element".
  srvElement name is optional and we can use that name instead of element*/
  @Input("srvElement") element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild("heading", { static: true }) header: ElementRef;

  /* @ContentChild, allows us to reach out a local reference that we define on the parent component #contentParagraph (app.component.html) 
    lets not forget that we cant access it until ngAfterContentInit is called */
  @ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;

  constructor() {
    console.log("constructor called!");
  }

  // LIFECYCLE HOOKS:

  // called after a bound input property changes. (after decorators like @Input receives new value)
  // receives a changes property with currentValue and previousValue
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  // called once the component is initialized and runs after the constructor
  ngOnInit() {
    // we will not get access to the properties here because they belong to content decorator and only on content lifecycle they will be available.
    console.log("ngOnInit called!");
    console.log("Text Content: " + this.header.nativeElement.textContent);
    console.log(
      "Text Content of paragraph: " + this.paragraph.nativeElement.textContent
    );
  }

  // called during every change detection runs - where ever something changes inside of a component, whether it needs to change something on the template.
  // like if property change from 1 to 2 for example in that template.
  // even if we click a button that doesn't change anything, but still it and event and angular check if something change
  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  // called after content (ng-content) has been initialized, on the view of the parent component, on the part added to the child component.
  //
  ngAfterContentInit() {
    console.log("ngAfterContentInit called!");
    console.log(
      "Text Content of paragraph: " + this.paragraph.nativeElement.textContent
    );
  }

  // called every time the projected content has been checked
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called!");
  }

  // called after the components view (and child views) has been initialized. after the view has been rendered.
  // ***only when this hook has been reached, we can access elements on this template,
  ngAfterViewInit() {
    console.log("ngAfterViewInit called!");
    console.log("Text Content: " + this.header.nativeElement.textContent);
  }

  //  called every time the view (and child views) have been checked
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called!");
  }

  // called once the component is about to be destroyed.
  // for example, when we use ngIf on a component and then it removes it from the dom.
  ngOnDestroy() {
    console.log("ngOnDestroy called!");
  }
}
