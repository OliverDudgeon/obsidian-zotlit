declare module "@ophidian/core" {
  export type Useful = any;
  export const calc: any;
  export const effect: any;
  export const use: any;
  export const modalSelect: any;
  export const deferred: any;
  export function getContext(owner: any): any;

  export class Service {
    constructor(...args: any[]);
    use<T = any>(svc: any): T;
    addChild?(child: any): void;
    register?(...args: any[]): void;
    registerEvent?(...args: any[]): void;
  }

  export class SettingsService<T = any> extends Service {
    current?: T;
    update?(fn: any): void;
    addDefaults(...args: any[]): void;
  }
}
