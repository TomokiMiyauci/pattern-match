# pattern-match

Type-safe functional style pattern matching.

## Why

`Switch` statements are sometimes difficult to use because they are statements.

In particular, they are prone to deep nesting and variable sharing, and you may
encounter situations where you need to use `let`.

`match` can return a value because it is an expression. It also guarantees
pattern comprehensiveness and is as expressive as a `switch` statement.

In addition, the bundle size is extremely small and the overhead is minimal.

## Primitive data types

Given a finite set, TypeScript will instruct it to enumerate all patterns.

```ts
import { match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts";

declare const value: "deno" | "node";

const result = match(value, {
  deno: () => "deno is 🦕",
  node: () => "node is 🌳",
});
```

## Collective data types

If the value is an infinite set, not all patterns can be enumerated. Instead, it
defines wildcard patterns that will be matched if no pattern is matched.

The compiler will force you to do this.

The special symbol `_` represents a wildcard. `match` provides `_` in
properties.

```ts
import { match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts";

declare const runtime: string;

const latests = match(runtime, {
  deno: () => "1.26.1",
  node: () => "18.10.1",

  [match._]: () => "Unknown",
});
```

Also, `_` is globally exported.

```ts
import { _, match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts";
```

## License

Copyright © 2022-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
