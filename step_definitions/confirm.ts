import { inject } from 'codeceptjs';

const { I } = inject();

const verifyTotalBill = (increment: number, term: number, calcTotalBill: Function) => {
    const start = new Date();
    start.setDate(start.getDate() + increment);
  
    const totalBill = `合計 ${calcTotalBill(start)}円（税込み）`
    I.see(totalBill, "#total-bill");
};

Then('合計が正しく表示されている。', () => {
    // TODO
    const calcTotalBill = (date: Date): string => {
        if (date.getDay() === 6 || date.getDay() === 7) {
          return '8,750';
        } 
        return '7,000';
    };
    verifyTotalBill(1, 1, calcTotalBill);
});

Then('合計が{int}日後に{int}泊の料金となっている。', (increment: number, term: number) => {
    // TODO
    const calcTotalBill = (date: Date): string => {
        if (date.getDay() === 6) {
            return '112,000';
        } else if (date.getDay() === 5 || date.getDay() === 7) {
            return '102,000';
        } else {
            return '92,000';
        }
    };
    verifyTotalBill(increment, term, calcTotalBill);
});

Then('プランが{string}となっている。', (planName: string) => {
    I.see(planName, "#plan-name");
});

Then('期間が{int}日後から{int}泊となっている。', (increment: number, term: number) => {
    // TODO
    const start = new Date();
    start.setDate(start.getDate() + increment);

    const end = new Date();
    end.setDate(end.getDate() + increment + term);

    const toFormat = (date: Date): string => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }
    const message = `${toFormat(start)} 〜 ${toFormat(end)} ${term}泊`
    I.see(message, "#term");
});

Then('人数が{string}名様となっている。', (headCount: string) => {
    I.see(headCount, "#head-count");
});

Then('追加プランに{string}が指定されている。', (plans: string) => {
    I.see(plans, "#plans");
});

Then('追加プランに{string}が指定されていない。', (plans: string) => {
    I.dontSee(plans, "#plans");
});

Then('お名前が{string}様となっている。', (username: string) => {
    I.see(username, "#username");
});

Then('確認のご連絡が{string}となっている。', (contact: string) => {
    I.see(contact, "#contact");
});

Then('ご要望・ご連絡事項等が{string}となっている。', (comment: string) => {
    I.see(comment, "#comment");
});

Given('この内容で予約する。', () => {
  I.click('この内容で予約する');
});

export {};