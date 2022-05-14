import { Directive, ElementRef, HostListener, Input, Renderer2, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'appPagination'
})
export class PaginationDirective {
  @Input() totalPages: number;
  pageNo: number = 1;
  @Output() onChangeEventEmitter = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  @HostListener('click')
  onNext() {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

  @HostListener('click')
  onPrevius() {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  @HostListener('click')
  onFirst() {
    this.setPage(1);
  }

  @HostListener('click')
  onLast() {
    this.setPage(this.totalPages);
  }


  setPage(pageno) {
    if (pageno) {
      this.pageNo = pageno;
      this.renderer2.setProperty(this.elementRef.nativeElement, "value", this.pageNo)
      this.onChangeEventEmitter.emit(this.pageNo);

      console.log('Paginas', this.pageNo)
    }
  }

}
