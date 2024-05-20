import { Console, Context, Effect } from "effect";
import { Random } from "./service/random";
import { Logger } from "./service/logger";

const program = Effect.gen(function* () {
  const RandomRep = yield* Random;
  const LoggerRep = yield* Logger;
  const random = yield* RandomRep.next;
  return yield* LoggerRep.log(String(random));
});

const context = Context.empty().pipe(
  Context.add(Random, {next: Effect.sync(() => Math.random())}),
  Context.add(Logger, {log: (message:string) => Console.log(message)})
);

const runnable2 = Effect.provide(program, context)
Effect.runSync(runnable2)
