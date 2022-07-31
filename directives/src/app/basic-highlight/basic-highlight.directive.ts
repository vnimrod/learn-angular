import { Directive, ElementRef, OnInit } from '@angular/core';

// WE NEED TO ADD AND IMPORT THIS DIRECTIVE ON THE APP.MODULE.TS
/* Only when we add this directive to a html element, only then elementRef will be equal to that htmlElements 
   So in out example on app.component.html, we add it on -> <p appBasicHighlight>Style me with basic directive!</p>
   then element ref will be the paragraph
*/

// dynamic directive and we have to use a unique selector
@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  // **by adding accessor private it will be the same as:
  // private elementRef!: ElementRef;
  /* constructor(elementRef: ElementRef) {
     this.elementRef = elementRef
   }*/
  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
    console.log(this.elementRef);
  }
}
