const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver = new Builder().forBrowser(Browser.CHROME).build();

beforeAll(async () => {
  await driver.get(
    "C:/Users/danie/OneDrive/Documents/School/Exercises/assessment-qa-devops/public/index.html"
  );
});

afterAll(async () => {
  await driver.quit();
});


describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.wait(until.titleIs("Duel Duo"), 1000);
    await driver.sleep(2000);
  });

  test("Select Draw Button", async () => {
    const drawButton = await driver.findElement(By.id('draw'));
    await drawButton.click();

    const choicesContainer = await driver.findElement(By.id('choices'));
    expect(choicesContainer).toEqual(expect.anything());
    await driver.sleep(2000);
  });

  test("Select bot1", async () => {
    const addButton1 = await driver.findElement(By.xpath('//*[@id="choices"]/div[1]/button'));
    await addButton1.click();

    const playerContainer = await driver.findElement(By.xpath('//*[@id="player-duo"]/div'));
    expect(playerContainer).toEqual(expect.anything());
    await driver.sleep(2000);
  });

  test("Select bot2", async () => {
    const addButton2 = await driver.findElement(By.xpath('//*[@id="choices"]/div[1]/button'));
    await addButton2.click();

    const playerContainer2 = await driver.findElement(By.xpath('//*[@id="player-duo"]/div[1]'));
    expect(playerContainer2).toEqual(expect.anything());
    await driver.sleep(2000);
  });

  test("Start Duel!", async () => {
    const duelButton = await driver.findElement(By.id('duel'));
    await duelButton.click();

    const results = await driver.findElement(By.id('results'));
    const resultsText = await results.getText()
    expect(resultsText).toBe("Dueling...");
    await driver.sleep(2000);

    const resultsText2 = await results.getText()
    if (resultsText2 === "You won!") {
      expect(resultsText2).toContain("You won!");
    } else {
      expect(resultsText2).toContain("You lost!");
    }
    await driver.sleep(2000);
    
  });

  test("Selecting Play Again", async () => {
    const playAgainBtn = await driver.findElement(By.id('play-again'));
    await playAgainBtn.click();

    const chooseHeader = await driver.findElement(By.id('choose-header'));
    const chooseHeaderText = await chooseHeader.getText();
    expect(chooseHeaderText).toBe('Choose 2!');
    await driver.sleep(2000);
  });
});

