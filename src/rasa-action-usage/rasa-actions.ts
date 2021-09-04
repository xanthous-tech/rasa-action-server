import { ModuleRef } from '@nestjs/core';
import { IActionDispatcher, IActionDomain, IActionTracker, IEvent, IRunnableAction, events } from '../../sdk';
import { Action } from '../rasa-action/rasa-action.decorators';

@Action({ name: 'hello_action' })
export class HelloAction implements IRunnableAction {
  // Inject module ref to prove Nest Dependency Injection works.
  constructor(private readonly ref: ModuleRef) {}

  async run(tracker: IActionTracker, dispatcher: IActionDispatcher, domain: IActionDomain): Promise<IEvent<any>[] | void> {
    console.log(tracker, dispatcher, domain);
    console.log(`DI works! : ${!!this.ref}\n`);

    dispatcher.utterMessage({
      text: 'Hello, World!',
    });

    return [
      new events.ReminderScheduled({
        trigger_date_time: new Date(),
        kill_on_user_message: false,
        intent_name: 'some_intent',
        timestamp: Date.now(),
      }),
    ];
  }
}
