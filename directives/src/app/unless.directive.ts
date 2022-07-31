import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// This directive simulate *ngIf in the opposite way, it check - if not (!x)
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  // appUnless is a property, it just a setter of the property which is a method that get executed whenever the property changes. (outside of this directive)
  // appUnless name should be the same as the directive.
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // creates a view in this view container
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    // the template is the what, and vcRef(view container) is the where.
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
