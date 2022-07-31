import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';

  // by default, a directive name is not closed with square brackets.
  /* by adding an alias with the same name of our directive selector, in case we want to bind one property, or one main property in our directive,
     we will add alias - @Input('appBetterHighlight') below, and then we will use it like -> [appBetterHighlight]="'red'", like ngClass property.
  */
  @Input('appBetterHighlight') highlightColor: string = 'blue';

  // HostBinding - get a string defining of which property of the hosting element we want to bind, for example style will be such a property
  // here we telling angular, on the element this directive sits, access the style property.
  // then we access it through the backgroundColor
  @HostBinding('style.backgroundColor') backgroundColor!: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }
  // HostBinding - host listener decorator
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
