import assert from 'assert';

const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/index.html';

Given('ホームを開く。', () => {
  I.amOnPage(URL);
});  

Given('ホームに移動する。', () => {
  I.click('ホーム', locate('nav'));
});

Then('ホームである事を確認する。', async () => {
  const currentUrl = await I.grabCurrentUrl();
  assert.match(currentUrl, new RegExp(`^${URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\??$`));
});

export {};