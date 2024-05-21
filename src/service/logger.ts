import { Context, Effect } from "effect";

export class Logger extends Context.Tag("LogService")<Logger, {
    readonly log:(message:string) => Effect.Effect<void>
}>(){}