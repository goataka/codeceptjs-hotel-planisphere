import assert from 'assert';
import { inject, locate } from 'codeceptjs';

const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/index.html';
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

Given('ホームを開く。', () => {
  I.amOnPage(URL);
});  

Given('ホームに移動する。', () => {
  I.click('ホーム', locate('nav'));
});

Then('ホームである事を確認する。', async () => {
  const currentUrl = await I.grabCurrentUrl();
  assert.match(currentUrl, new RegExp(`^${escapeRegExp(URL)}\\??$`));
});

export {};