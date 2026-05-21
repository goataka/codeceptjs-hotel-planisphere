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
  I.see('枠線の色', color);
});

Given('退会をする。', () => {
  // TODO
  I.amAcceptingPopups();
  I.click('退会する');
  I.seeInPopup('退会すると全ての情報が削除されます。');
  I.acceptPopup();
});

Then('退会確認が表示される。', () => {
  //TODO
});

Then('退会結果が表示される。', () => {
  I.seeInPopup('退会処理を完了しました。ご利用ありがとうございました。');
  I.acceptPopup();
});

export {};