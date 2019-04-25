require("dotenv").config();

exports.config = {  
  services: ["selenium-standalone"],
  capabilities: [
    {
      "browserName": "chrome",
      "goog:chromeOptions": {
        "args": ["disable-infobars"]
      }
    }
  ],
  updateJob: false,
  specs: [],
  exclude: [],
  suites: {},
  logLevel: "silent",
  coloredLogs: true,
  screenshotPath: "./reports/ErrorShots",
  waitforTimeout: 30000,
  deprecationWarnings: false,
  plugins: {
    "wdio-screenshot": {}
  },
  framework: "mocha",
  reporters: ["dot"],
  mochaOpts: {
    ui: "bdd",
    compilers: ["js:babel-register"],
    timeout: 60 * 1000
  },

  // Gets executed before all workers get launched.
  onPrepare() {},
  // Gets executed before test execution begins. At this point you will have access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before(capabilities, specs) {
    // Chai section
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    chai.Should();

    // create reporting folders
    const fs = require('fs');
    const mkdirSync = function (dirPath) {
      try {
        fs.mkdirSync(dirPath)
      } catch (err) {
        if (err.code !== 'EEXIST') throw err
      }
    };
    mkdirSync("./reports/");
    mkdirSync("./reports/ErrorShots/");

    // declared globals
    country = "";
    siteSuffix = "";
    sitePrefix = "";
    referenceNumber = "";
    envcol = "";
    OMSUniqueID = "";
    skuslist = [];
    OMScheckReleased = false;
    site = "";
    environment = "";
    env = "";

    // set specname global
    specname = String(specs);
    specname = specname.split("\\");
    let specnamelength = specname.length - 1;
    specname = specname[specnamelength];
    console.log("Running file: " + specname);

    // set runStartTime global
    var screendate = new Date();
    let hour = ("0" + screendate.getHours()).slice(-2);
    let minute = ("0" + screendate.getMinutes()).slice(-2);
    let seconds = ("0" + screendate.getSeconds()).slice(-2);
    runStartTime = hour + "_" + minute + "_" + seconds;

    // determine form factor
    formFactor = "";
    if (capabilities["real_mobile"] === 'true') {
      formFactor = "mobile";
    } else if (capabilities["platformName"] === 'Android') {
      formFactor = "mobile";
    } else {
      formFactor = "desktop";
    }
    if (formFactor === "desktop") {
      browser.maximizeWindow();
    }
  },
  after() {},
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete() {}
};
