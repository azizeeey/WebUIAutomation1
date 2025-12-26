const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Tugas Sesi 9 - Web UI Automation Fundamental', function() {
  this.timeout(30000);
  let driver;

  // HOOK 1: before
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  // HOOK 2: beforeEach
  beforeEach(async function() {
    console.log(`\n>>> Memulai Test Case: "${this.currentTest.title}"`);
  });

  // Test Case 1: Login
  it('Harus sukses login dengan standard_user', async function() {
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    let titleElement = await driver.findElement(By.className('title'));
    let titleText = await titleElement.getText();
    assert.strictEqual(titleText, 'Products');
  });

  // Test Case 2: Sort Z-A
  it('Harus berhasil mengurutkan produk dari Z-A', async function() {
    let sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.click();

    await driver.findElement(By.css('option[value="za"]')).click();

    let firstItem = await driver.findElement(By.css('.inventory_item_name')).getText();
    console.log(`    (Info: Barang teratas adalah '${firstItem}')`); // Log tambahan
    assert.strictEqual(firstItem, 'Test.allTheThings() T-Shirt (Red)');
  });

  // HOOK 3: afterEach
  afterEach(async function() {
    await driver.sleep(1000); 
    console.log(`<<< Selesai Test Case: "${this.currentTest.title}"`);
  });

  // HOOK 4: after
  after(async function() {
    await driver.sleep(3000);
    await driver.quit();
  });
});