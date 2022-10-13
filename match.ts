import { MatchConstructor, Pattern } from "./types.ts";
import { _ } from "./constants.ts";

/** Pattern matching.
 *
 * @example
 * ```ts
 * import { match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts"
 *
 * declare const value: "GET" | "POST"
 * match(value, {
 *   GET: (get) => "match on Get",
 *   POST: (post) => "match on Post"
 * })
 * ```
 *
 * @example
 * ```ts
 * import { match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts"
 *
 * declare const value: string
 * match(value, {
 *   GET: (get) => "match on Get",
 *   POST: (post) => "match on Post",
 *   [match._]: () => "match on others"
 * })
 * ```
 */
export const match: MatchConstructor = <T extends string, U>(
  value: T,
  pattern: Pattern<T, U>,
) => {
  const entries = Object.entries(pattern) as [string, (value: T) => U][];

  for (const [key, handler] of entries) {
    if (Object.is(key, value)) return handler(value);
  }

  // deno-lint-ignore no-explicit-any
  return (pattern as any)[_](value);
};

/** Pattern matching wildcard. */
match._ = _;
