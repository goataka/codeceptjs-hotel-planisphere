import assert from "assert";
import fs from "node:fs";
import { inject } from "codeceptjs";
import { tryTo } from "codeceptjs/effects";

const { I } = inject();

Given('{int}秒待つ。', (sec: number) => {
  I.wait(sec);
});

Given('確認を受け入れる。', async () => {
  await tryTo(() => I.acceptPopup());
});

Given('{string}にフォーカスする。', (field: string) => {
  I.focus(field)
});

Then('{string}が表示されている。', (field: string) => {
    I.see(field);
});

Then('{string}が表示されていない。', (field: string) => {
  I.dontSee(field);
});

Then('{string}が空欄である。', (field: string) => {
  I.seeInField(field, '');
});

Then('{string}のスクリーンショットをとる。', (fileName: string) => {
  I.saveScreenshot(`${fileName}.png`, true);
});

Then('{string}のHTMLをとる。', async (fileName: string) => {
  let html = await I.grabSource();
  fs.writeFileSync(`output/${fileName}.html`, html);
});

export {};