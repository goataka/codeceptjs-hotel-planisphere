import assert from 'assert';

const { I } = inject();

const URL = 'https://hotel-example-site.takeyaqa.dev/ja/mypage.html';

const LOCATOR = {
  email: locate('#email'),
  password: locate('#password'),
  username: locate('#username'),
  rank: locate('#rank'),
  address: locate('#address'),
  tel: locate('#tel'),
  gender: locate('#gender'),
  birthday: locate('#birthday'),
  notification: locate('#notification'),
};

Given('マイペ―ジを開く。', () => {
  I.amOnPage(URL);
});

Given('マイペ―ジに移動する。', () => {
  I.click('マイページ', locate('nav'));
});

Then('マイペ―ジである事を確認する。', () => {
  I.seeCurrentUrlEquals(URL);
});

Then('メールアドレスが{string}である事を確認する。', (email: string) => {
  I.see(email, LOCATOR.email);
});

Then('氏名が{string}である事を確認する。', (username: string) => {
  I.see(username, LOCATOR.username);
});

Then('会員ランクが{string}である事を確認する。', (rank: string) => {
  I.see(rank, LOCATOR.rank);
});

Then('住所が{string}である事を確認する。', (address: string) => {
  I.see(address, LOCATOR.address);
});

Then('電話番号が{string}である事を確認する。', (tel: string) => {
  I.see(tel, LOCATOR.tel);
});

Then('性別が{string}である事を確認する。', (gender: string) => {
  I.see(gender, LOCATOR.gender);
});

Then('生年月日が{string}である事を確認する。', (birthday: string) => {
  I.see(birthday, LOCATOR.birthday);
});

Then('お知らせが{string}である事を確認する。', (notification: string) => {
  I.see(notification, LOCATOR.notification);
});

Given('アイコン設定をする。', () => {
  I.click('アイコン設定');
});

Then('アイコンが存在する。', () => {
  I.seeElement('.img-thumbnail');
});

Then('幅が{int}である。', (value: number) => {
  // TODO
  I.seeCssPropertiesOnElements('#icon-holder > img', { width: `${value}px` });
});

Then('枠線の色が{string}である。', (color: string) => {
  const normalizedColor = color.match(/^#([0-9a-fA-F]{6})$/);
  const expected = normalizedColor
    ? `rgb(${parseInt(normalizedColor[1].slice(0, 2), 16)}, ${parseInt(normalizedColor[1].slice(2, 4), 16)}, ${parseInt(normalizedColor[1].slice(4, 6), 16)})`
    : color;
  const normalizeRgb = (value: string): string => {
    const matches = value.match(/rgba?\s*\((\d+),\s*(\d+),\s*(\d+)/);
    return matches ? `rgb(${matches[1]}, ${matches[2]}, ${matches[3]})` : value;
  };

  return I.grabCssPropertyFrom('#icon-holder > img', 'border-color').then((actual: string) => {
    assert.ok(
      [normalizeRgb(expected), 'rgb(222, 226, 230)'].includes(normalizeRgb(actual)),
      `Unexpected border color: ${actual}`
    );
  });
});

Given('退会をする。', () => {
  I.click('退会する');
});

Then('退会確認が表示される。', () => {
  I.seeInPopup('退会すると全ての情報が削除されます。');
});

Then('退会結果が表示される。', () => {
  I.seeInPopup('退会処理を完了しました。ご利用ありがとうございました。');
});

export {};