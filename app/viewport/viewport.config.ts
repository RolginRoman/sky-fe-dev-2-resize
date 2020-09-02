import { InjectionToken } from "@angular/core";

export interface IConfig {
  readonly medium: number;
  readonly large: number;
}

export const VIEWPORT_CONFIG_TOKEN = new InjectionToken<IConfig>('Viewport Config Token');