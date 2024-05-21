import { Context, Effect } from "effect";
import { Random } from "./service/random";
import { Logger } from "./service/logger";

const program = Effect.gen(function*(){
    const random = yield* Random
    const logger = yield* Logger
    const randomNumber  = random.next
    return yield* logger.log(String(randomNumber))
})

// way-1 providing a service implementation using provideService methode multiple times for multiple service
const runnable1 = program.pipe(
    Effect.provideService(Random,{
        next: Effect.sync(()=> Math.random())
    }),
    Effect.provideService(Logger,{
        log:(message:string)=> Effect.sync(()=> console.log(message))
    })
)

Effect.runPromise(runnable1)

// way-2 combine service implementation into one context
const context = Context.empty().pipe(
    Context.add(Random, {
        next: Effect.sync(()=>Math.random())
    }),
    Context.add(Logger,{
        log:(message:string)=> Effect.sync(()=>console.log(message))
    })
)

// provide the entire context  to the program
const runnable2 = Effect.provide(program, context)
