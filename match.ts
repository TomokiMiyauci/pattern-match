// Copyright 2022-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

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
export const match: MatchConstructor = <T extends string | number, U>(
  value: T,
  pattern: Pattern<T, U>,
) => {
  if (value in pattern) return pattern[value](value);

  // deno-lint-ignore no-explicit-any
  return (pattern as any)[_](value);
};

/** Pattern matching wildcard. */
match._ = _;
