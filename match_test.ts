import { match } from "./match.ts";
import {
  assertEquals,
  assertSpyCallArg,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "./dev_deps.ts";

describe("match", () => {
  it("should call on primitive value", () => {
    const fn = spy();

    const result = match("a", {
      "a": (value) => {
        fn(value);
      },
    });

    assertEquals(result, undefined);
    assertSpyCallArg(fn, 0, 0, "a");
  });

  it("should call on primitive value", () => {
    const fn = spy();
    const value = "" as "" | "a";

    const result = match(value, {
      "": (value) => {
        fn(value);

        return 0;
      },
      "a": (value) => {
        fn(value);

        return 1;
      },
    });

    assertEquals(result, 0);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, "");
  });

  it("should call on primitive value", () => {
    const fn = spy();
    const value = "abc" as string;

    const result = match(value, {
      "": (value) => {
        fn(value);

        return 0;
      },
      [match._]: (value) => {
        fn(value);

        return 1;
      },
    });

    assertEquals(result, 1);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, "abc");
  });

  it("should accept number type", () => {
    const fn = spy();
    const value = 100 as number;

    const result = match(value, {
      100: (value) => {
        fn(value);

        return 0;
      },
      [match._]: (value) => {
        fn(value);

        return 1;
      },
    });

    assertEquals(result, 0);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, 100);
  });

  it("should accept number primitive type", () => {
    const fn = spy();
    const value = 0 as 0 | 1;

    const result = match(value, {
      "0": (value) => {
        fn(value);

        return 0;
      },
      1: (value) => {
        fn(value);

        return 1;
      },
    });

    assertEquals(result, 0);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, 0);
  });

  it("should accept string as number primitive type", () => {
    const fn = spy();
    const value = 0 as 0 | 1;

    const result = match(value, {
      "0": (value) => {
        fn(value);

        return 0;
      },
      1: (value) => {
        fn(value);

        return 1;
      },
    });

    assertEquals(result, 0);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, 0);
  });

  it("should accept mixed type", () => {
    const fn = spy();
    const value = "" as 0 | 1 | string;

    const result = match(value, {
      "0": () => {
        fn(value);

        return 0;
      },
      "1": () => {
        fn(value);

        return 1;
      },

      [match._]: (value) => {
        fn(value);

        return 2;
      },
    });

    assertEquals(result, 2);
    assertSpyCalls(fn, 1);
    assertSpyCallArg(fn, 0, 0, "");
  });
});
