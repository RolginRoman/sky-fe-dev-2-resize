import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { defer, fromEvent } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ViewportResizeService {
  constructor(@Inject(DOCUMENT) private doc: Document) {
  }

  public resize$ = defer(() => {
    return fromEvent(this.doc, 'resize').pipe(
      map(event => {
        console.log(event);
        return { width: this.doc.defaultView.innerWidth, height: this.doc.defaultView.innerHeight};
      })
    )
  })
}