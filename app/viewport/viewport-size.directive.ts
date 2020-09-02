import {
  Directive,
  OnInit,
  Input,
  Optional,
  Inject,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { VIEWPORT_CONFIG_TOKEN, IConfig } from "./viewport.config";
import { ViewportResizeService } from "./viewport-resize.service";
import { map, takeUntil, catchError } from "rxjs/operators";
import { Subject, of } from "rxjs";

const enum ViewportBoundaries {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

const widthPredicate = (config: IConfig, boundary: ViewportBoundaries) => {
  return ({ width }) => {
    switch (boundary) {
      case ViewportBoundaries.SMALL: {
        return width < config.medium;
      }
      case ViewportBoundaries.MEDIUM: {
        return config.medium <= width && width < config.large;
      }
      case ViewportBoundaries.LARGE: {
        return config.large <= width;
      }
      default: {
        return false;
      }
    }
  };
};

@Directive({
  selector: "[ifViewportSize]"
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  @Input("ifViewportSize")
  public ifViewportSize: ViewportBoundaries;

  private destroy$ = new Subject<void>();

  constructor(
    private template: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private viewportService: ViewportResizeService,
    @Optional() @Inject(VIEWPORT_CONFIG_TOKEN) private viewportConfig: IConfig,
  ) {
    if (!viewportConfig) {
      throw new Error("Provider for @IConfig doesn't found");
    }
  }

  ngOnInit() {
    const predicate = widthPredicate(this.viewportConfig, this.ifViewportSize);
    this.viewportService.resize$
      .pipe(
        map(predicate),
        catchError(() => of(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(shouldRender => {
        console.log(`Result: ${this.ifViewportSize} ${shouldRender}`);
        this.vcr.clear(); // should viewRef be detached or cleared? Depends on task
        if (shouldRender) {
          this.vcr.createEmbeddedView(this.template);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
