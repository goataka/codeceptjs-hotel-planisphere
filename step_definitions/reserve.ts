import { tryTo } from 'codeceptjs/effects';

const { I } = inject();

Given('プラン名が{string}である。', (planName: string) => {
  I.see(planName);
});

Given('宿泊日に{string}を入力にする。', (date) => {
  I.fillField('宿泊日', date);
});

const formatDate = (increment: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + increment);
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}/${month}/${day}`;
}

Given('宿泊日を今日にする。', () => {
  const today = formatDate();

  I.fillField('宿泊日', today);
});

Given('宿泊日を{string}にする。', (date: string) => {
  I.fillField('宿泊日', date);
});

Given('宿泊日を{int}日後にする。', (increment: number) => {
  const date = formatDate(increment);
  I.fillField('宿泊日', date);
  tryTo(() => I.click('閉じる'));
});

Then('宿泊日が明日である。', () => {
  const tomorrow = formatDate(1);
  
  I.seeInField('宿泊日', tomorrow);
});
  
Then('宿泊数が{string}である。', (reserveTerm: string) => {
  I.seeInField('宿泊数', reserveTerm);
});

Given('宿泊数に{string}を入力にする。', (term: string) => {
  I.fillField('宿泊数', term);
});

Then('人数が{string}である。', (headCount: string) => {
    I.seeInField('人数', headCount);
});

Given('人数に{string}を入力にする。', (headCount: string) => {
  I.fillField('人数', headCount);
});

Given('氏名に{string}を入力にする。', (username: string) => {
  I.fillField('氏名', username);
});

Given('メールアドレスに{string}を入力にする。', (email: string) => {
  I.fillField('メールアドレス', email);
});

Given('電話番号に{string}を入力にする。', (tel: string) => {
  I.fillField('電話番号', tel);
});

Given('確認のご連絡を「メールでのご連絡」に指定する。', () => {
    I.selectOption('確認のご連絡','メールでのご連絡');
});

Given('確認のご連絡を「電話でのご連絡」に指定する。', () => {
    I.selectOption('確認のご連絡','電話でのご連絡');
});

Given('確認のご連絡を「希望しない」に指定する。', () => {
    I.selectOption('確認のご連絡','希望しない');
});

Given('ご要望・ご連絡事項等に{string}を入力にする。', (comment: string) => {
  I.fillField('ご要望・ご連絡事項等', comment);
});

Then('氏名が{string}となっている。', (username: string) => {
  I.seeInField('氏名', username);
});

Then('メールアドレスが{string}となっている。', (email: string) => {
  I.seeInField('メールアドレス', email);
});

Then('電話番号が{string}となっている。', (tel: string) => {
  I.seeInField('電話番号', tel);
});

Given('予約内容を確認する。', () => {
  I.click('予約内容を確認する');
});

Then('部屋情報が{string}となっている。', async (room: string) => {
  I.switchTo({ frame: '.embed-responsive-item' });
  // Frame content is not visible without h5.
  I.see(room, 'h5');
});

Then('氏名欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#username ~ .invalid-feedback');
});

Then('メールアドレス欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#email ~ .invalid-feedback');
});

Then('電話番号欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#tel ~ .invalid-feedback');
});

Then('宿泊日欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#date ~ .invalid-feedback');
});

Then('宿泊数欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#term ~ .invalid-feedback');
});

Then('人数欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, '#head-count ~ .invalid-feedback');
});

Then('ダイアログに{string}と言うメッセージが表示される。', (message: string) => {
  I.see(message, locate('.modal-body').inside('#success-modal'));
});

Given('ダイアログを閉じる。', () => {
  I.click('閉じる');
});

Given('宿泊予約確認が閉じられる。', () => {
  I.seeNumberOfTabs(1);
});

Given('追加プランに「朝食バイキング」を指定する。', () => {
  I.checkOption('朝食バイキング');
});

Given('追加プランに「昼からチェックインプラン」を指定する。', () => {
  I.checkOption('昼からチェックインプラン');
});

Given('追加プランに「お得な観光プラン」を指定しない。', () => {
  I.uncheckOption('お得な観光プラン');
});

export {};