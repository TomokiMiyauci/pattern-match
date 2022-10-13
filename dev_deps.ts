export * from "https://deno.land/std@0.159.0/testing/asserts.ts";
export * from "https://deno.land/std@0.159.0/testing/bdd.ts";
export * from "https://deno.land/std@0.159.0/testing/mock.ts";

// deno-lint-ignore no-explicit-any
export type Fn<F extends (...args: any) => any> = [
  ...Parameters<F>,
  ReturnType<F>,
];
