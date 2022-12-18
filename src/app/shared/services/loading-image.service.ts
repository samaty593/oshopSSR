import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingImageService {
  private _imagesLoding = new Subject<number>();
  private imagesLoading: number = 0;

  imagesLoading$ = this._imagesLoding.asObservable();

  imageLoading() {
      this.imagesLoading++;
      this._imagesLoding.next(this.imagesLoading);
  }

  imagesLoadedOrError() {
      this.imagesLoading--;
      this._imagesLoding.next(this.imagesLoading);
  }
}

