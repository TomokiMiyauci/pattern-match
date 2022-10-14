// Copyright 2022-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { _ } from "./constants.ts";

type _ = typeof _;

/** Whether the type is collective type or not. */
export type IsCollective<T extends PropertyKey> = string extends T ? true
  : number extends T ? true
  : symbol extends T ? true
  : false;

/** Pattern matching definition. */
export type Pattern<T extends PropertyKey, U> = {
  [k in T]: (value: k) => U;
};

/** Pattern matching definition with context. */
export type ContextualPattern<T extends PropertyKey, U, C> = {
  [k in T]: (context: C) => U;
};

/** Pattern matching definition with fallback. */
export type CollectivePattern<T extends PropertyKey, U> =
  & Pattern<T, U>
  & { [k in _]: (value: T) => U };

/** Pattern matching definition with fallback and context. */
export type ContextualCollectivePattern<T extends PropertyKey, U, C> =
  & ContextualPattern<T, U, C>
  & { [k in _]: (context: C) => U };

/** Pattern matching operation. */
export interface MatchConstructor {
  <T extends PropertyKey, U>(
    value: T,
    pattern: IsCollective<T> extends true ? CollectivePattern<T, U>
      : Pattern<T, U>,
  ): U;
  <T extends PropertyKey, U, C>(
    value: T,
    pattern: IsCollective<T> extends true ? ContextualCollectivePattern<T, U, C>
      : ContextualPattern<T, U, C>,
    context: C,
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
