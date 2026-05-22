import { inject, locate } from 'codeceptjs';

const { I } = inject();

Given('アイコン画像に{string}を登録する。', (fileName: string) => {
  I.attachFile('アイコン画像', `data/${fileName}`);
  //TODO
});

Then('アイコン画像欄に{string}と言うエラーが表示される。', (message: string) => {
  I.see(message, locate('.invalid-feedback'));
});

Given('拡大・縮小に{int}を指定する。', (value: number) => {
  // TODO
  I.dragSlider('#zoom', value);
});

Given('枠線の色に{string}を指定する。', (color: string) => {
  I.executeScript((value) => {
    const input = document.querySelector('#color') as HTMLInputElement | null;
    if (!input) return;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, color);
});

Given('確定する。', () => {
  I.click('確定');
});

export {};