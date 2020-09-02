import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { defer, fromEvent } from "rxjs";
import { map, throttleTime, startWith, shareReplay } from "rxjs/operators";

interface ViewportSizeEvent {
  readonly width: number;
}

@Injectable()
export class ViewportResizeService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  public resize$ = defer(() => {
    return fromEvent(this.doc.defaultView, "resize").pipe(
      map(() => this.getCurrentViewportSizeEvent()),
      startWith(this.getCurrentViewportSizeEvent()),
      throttleTime(300) // it is possible to throttle by raf scheduler
    );
  }).pipe(shareReplay(1));

  private getCurrentViewportSizeEvent(): ViewportSizeEvent {
    return { width: this.getCurrentViewportWidth() };
  }

  private getCurrentViewportWidth(): number {
    return this.doc.defaultView ? this.doc.defaultView.innerWidth : undefined;
  }
}
