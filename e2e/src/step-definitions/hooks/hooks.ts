import { BeforeAll, Before, AfterAll, After, Status } from "@cucumber/cucumber";
const { chromium } = require("playwright");

BeforeAll(async () => {
    global.browser = await chromium.launch({
        headless: false,
    })
});

AfterAll(async () => {
    await global.browser.close();
});

Before(async (scenario) =>{
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: './reports/video/'+scenario.pickle.name,
        }
    });

    global.page = await global.context.newPage();
});

After(async (scenario) =>{
    const scenarioStatus = scenario.result?.status;
        if (scenarioStatus === 'FAILED') {
            await global.page.screenshot({
                path: `./reports/screenshots/${scenario.pickle.name}.png`
            })
        }


        await global.page.close();
});