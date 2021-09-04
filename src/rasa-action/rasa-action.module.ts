import { DynamicModule, Module } from '@nestjs/common';

import { IConstructor } from '../../sdk/class';
import { IRunnableAction } from '../../sdk';
import { getControllerClass } from './rasa-action.controller';

@Module({})
export class RasaActionModule {
  static forRoot(actions: IConstructor<IRunnableAction>[], options: IRasaActionModuleOptions): DynamicModule {
    const controller = getControllerClass(options.path);

    return {
      module: RasaActionModule,
      controllers: [controller],
      providers: actions.map((c) => ({
        provide: c,
        useClass: c,
      })),
    };
  }
}

export interface IRasaActionModuleOptions {
  /**
   * POST path of the action endpoint.
   */
  path: string;
}
