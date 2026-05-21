import assert from "assert";

export default function() {
  return actor({
    seeNumberOfTabs: async (expected: number)=> {
      const actual = await this.grabNumberOfOpenTabs();
      assert(actual == expected, `期待されたタブの数は${expected}だが、実際は${actual}である。`);
    },
    focusOut: async () => {
      await this.click("body");
    }
  });
}
