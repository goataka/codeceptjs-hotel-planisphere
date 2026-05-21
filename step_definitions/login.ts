import { inject, locate } from 'codeceptjs';

const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/login.html';

Given('ログインペ―ジを開く', () => {
  I.amOnPage(URL);
});

Given('ログインペ―ジに移動する。', () => {
  I.click('ログイン', locate('nav'));
});

Given('ログアウトする。', () => {
  I.click('ログアウト', locate('nav'));
});

Then('ログインペ―ジである事を確認する。', () => {
  I.seeCurrentUrlEquals(URL);
});

const login = (email: string, password:string) => {
  I.fillField('メールアドレス', email);
  I.fillField('パスワード', password);
  I.click('ログイン', '#login-button');
};

Given('{string} {string}でログインする。', login);

Given('一般会員でログインする。', () => {
  login('sakura@example.com', 'pass1234');
});

Given('プレミアム会員でログインする。', () => {
  login('ichiro@example.com', 'password');
});

Then('メールアドレス欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#email-message");
});

Then('パスワード欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#password-message");
});

export {};
