const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/index.html';

Given('ホームを開く。', () => {
  I.amOnPage(URL);
});  

Given('ホームに移動する。', () => {
  I.click('ホーム', locate('nav'));
});

Then('ホームである事を確認する。', () => {
  I.seeCurrentUrlEquals(URL);
});

export {};