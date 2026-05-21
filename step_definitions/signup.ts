import { inject, locate } from 'codeceptjs';

const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/signup.html';

// TODO
const LOCATOR = {
  email: locate('#email'),
  password: locate('#password'),
  username: locate('#username'),
  rank: {
    premium: locate('#rank-premium'),
    normal: locate('#rank-normal')
  },
  address: locate('#address'),
  tel: locate('#tel'),
  gender: locate('#gender'),
  birthday: locate('#birthday'),
  notification: locate('#notification'),
};

Given('会員登録ペ―ジを開く。', () => {
    I.amOnPage(URL);
});  

Given('会員登録ペ―ジに移動する。', () => {
  I.click('会員登録', locate('nav'));
});

Then('会員登録ペ―ジである事を確認する。', () => {
  I.seeCurrentUrlEquals(URL);
});

Given('メールアドレスに{string}を入力する。', (email: string) => {
     I.fillField('メールアドレス', email);
});

Given('パスワードに{string}を入力する。', (password: string) => {
     I.fillField('パスワード', password);
});

Given('パスワード（確認）に{string}を入力する。', (password_confirm: string) => {
     I.fillField('パスワード（確認）', password_confirm);
});

Given('氏名に{string}を入力する。', (username: string) => {
     I.fillField('氏名', username);
});

Given('会員ランクを「プレミアム会員」に指定する。', () => {
     I.click('プレミアム会員');
});

Given('会員ランクを「一般会員」に指定する。', () => {
  I.click('一般会員');
});

Given('住所に{string}を入力する。', (address: string) => {
     I.fillField('住所', address);
});

Given('電話番号に{string}を入力する。', (tel: string) => {
  I.fillField('電話番号', tel);
});

Given('性別を{string}に指定する。', (gender: string) => {
  I.selectOption('性別', gender);
});

Given('生年月日に{string}を入力する。', (birthday: string) => {
  I.fillField('生年月日', birthday);
});

Given('お知らせを「受け取らない」に指定する。', (notification: string) => {
  I.uncheckOption('お知らせを受け取る');
});

Given('お知らせを「受け取る」に指定する。', (notification: string) => {
  I.checkOption('お知らせを受け取る');
});

Given('登録をする。', (notification: string) => {
  I.click('登録', locate('#signup-form'));
});

Then('メールアドレス欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#email ~ .invalid-feedback");
});

Then('パスワード欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#password ~ .invalid-feedback");
});

Then('パスワード（確認）欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#password-confirmation ~ .invalid-feedback");
});

Then('氏名欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#username ~ .invalid-feedback");
});

Then('住所欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#address ~ .invalid-feedback");
});

Then('電話番号欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#tel ~ .invalid-feedback");
});

Then('性別欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#gender ~ .invalid-feedback");
});

Then('生年月日欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, "#birthday ~ .invalid-feedback");
});


Then('メールアドレス欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#email ~ .invalid-feedback");
});

Then('パスワード欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#password ~ .invalid-feedback");
});

Then('パスワード（確認）欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#password-confirmation ~ .invalid-feedback");
});

Then('氏名欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#username ~ .invalid-feedback");
});

Then('住所欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#address ~ .invalid-feedback");
});

Then('電話番号欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#tel ~ .invalid-feedback");
});

Then('性別欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#gender ~ .invalid-feedback");
});

Then('生年月日欄にエラーが表示されていない。', (message: string) => {
  I.dontSee("#birthday ~ .invalid-feedback");
});


export {};