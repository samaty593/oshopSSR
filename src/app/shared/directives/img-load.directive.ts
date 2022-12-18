import { Directive, ElementRef, HostListener } from '@angular/core';
import { LoadingImageService } from 'shared/services/loading-image.service';

@Directive({
  selector: 'img'
})
export class ImgLoadDirective {

  constructor(
    private el: ElementRef,
    private imgload: LoadingImageService
) {
    imgload.imageLoading();
  }

  @HostListener('load')
  onLoad() {
    this.imgload.imagesLoadedOrError();
  }

  @HostListener('error')
  onError() {
    this.imgload.imagesLoadedOrError();
  }
}
