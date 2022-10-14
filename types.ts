// Copyright 2022-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { _ } from "./constants.ts";

type _ = typeof _;

/** Whether the type is collective type or not. */
export type IsCollective<T extends string | number> = string extends T ? true
  : number extends T ? true
  : false;

/** Pattern matching definition. */
export type Pattern<T extends PropertyKey, U> = {
  [k in T]: (value: k) => U;
};

/** Pattern matching definition with fallback. */
export type CollectivePattern<T extends PropertyKey, U> =
  & Pattern<T, U>
  & { [k in _]: (value: T) => U };

/** Pattern matching operation. */
export interface MatchConstructor {
  <T extends string | number, U>(
    value: T,
    pattern: IsCollective<T> extends true ? CollectivePattern<T, U>
      : Pattern<T, U>,
  ): U;

  /** Pattern patching wildcard.
   *
   * @example
   * ```ts
   * import { match } from "https://deno.land/x/pattern_match@$VERSION/mod.ts"
   *
   * declare const value: string;
   * const result = match(value, {
   *   0: () => "Zero",
   *   1: () => "One",
   *   [match._]: () => "Any"
   * })
   * ```
   */
  _: _;
}
