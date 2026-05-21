import {
  setHeadlessWhen,
  setCommonPlugins
} from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && pnpm exec codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://hotel-example-site.takeyaqa.dev/ja/index.html',
      windowSize: '1980x1080',
      locale: 'ja-JP',
      video: true,
      keepVideoForPassedTests: true,
      disableScreenshots: false,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true,
      highlightElement: false,
      show: false,
      trace: true,
      keepTraceForPassedTests: true,
    },
  },
  include: {
    I: './steps_file'
  },
  gherkin: {
    features: [
      './features/login.feature',
      './features/mypage-new.feature',
      './features/mypage.feature',
      './features/plan.feature',
      './features/reserve.feature',
      './features/signup.feature',
    ],
    steps: [
      './step_definitions/action.ts',
      './step_definitions/confirm.ts',
      './step_definitions/home.ts',
      './step_definitions/icon.ts',
      './step_definitions/login.ts',
      './step_definitions/mypage.ts',
      './step_definitions/plan.ts',
      './step_definitions/reserve.ts',
      './step_definitions/signup.ts'
    ]
  },
  avoidDuplicateSteps: true,
  name: 'codeceptjs-hotel-planisphere'
}