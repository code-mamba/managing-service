import { Context, Effect } from "effect"

export class Random extends Context.Tag("RandomService")<Random, {
    readonly next: Effect.Effect<number>
}>(){}