import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  defer,
  fromEvent,
} from "rxjs";
import {
  map,
  throttleTime,
  startWith,
  shareReplay
} from "rxjs/operators";

// const fromRAF = (): Observable<void> => {
  // return (interval(10, animationFrameScheduler) as unknown) as Observable<void>;
// };

@Injectable()
export class ViewportResizeService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  public resize$ = defer(() => {
    return fromEvent(this.doc.defaultView, "resize").pipe(
      map(() => ({ width: this.doc.defaultView.innerWidth })),
      startWith({ width: this.doc.defaultView.innerWidth }),
      throttleTime(300) // it is possible to throttle by raf scheduler
    );
  }).pipe(shareReplay(1));
}
