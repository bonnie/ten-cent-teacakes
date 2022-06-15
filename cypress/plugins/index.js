/* eslint-disable no-param-reassign */
const { resetDB } = require("../../src/__tests__/api/prisma/reset-db");
const { createClient } = require("@supabase/supabase-js");
const dayjs = require("dayjs");
/* eslint-disable no-unused-vars */
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
// eslint-disable-next-line import/no-extraneous-dependencies
const ReportGenerator = require("lighthouse/report/generator/report-generator");
const fs = require("fs");
const path = require("path");

const outDir = "cypress/reports";

const getTestFileNames = async (supabase, folderName) => {
  const { data, error } = await supabase.storage
    .from("uploads")
    .list(folderName);
  if (error) {
    throw new Error(
      `could not clean up -- ${folderName} query resulted in error`,
      error,
    );
  }
  if (!data) {
    throw new Error(`could not clean up -- no ${folderName} data found`, data);
  }

  return data
    .filter((item) => dayjs().diff(item.created_at, "minute") < 60)
    .map((item) => item.name)
    .filter(
      (name) =>
        name.startsWith("avalanche-of-cheese") || name.startsWith("gustopher"),
    )
    .map((name) => `${folderName}/${name}`);
};

export default (on, config) => {
  // a way to get around env vars not being available in after:spec
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;

  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });
  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      try {
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
        const dateString = new Date().toISOString();
        const fileName = path.join(
          outDir,
          `lighthouse-report-${dateString}.html`,
        );

        fs.writeFileSync(
          fileName,
          ReportGenerator.generateReport(lighthouseReport.lhr, "html"),
        );
        // eslint-disable-next-line no-console
        console.log("---- INFO: wrote lighthouse report to", fileName);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "---- ERROR: failed to generate lighthouse report",
          error,
        );
      }
    }),
  });

  on("task", {
    "db:reset": () => resetDB().then(() => null),
  });
  on("after:spec", async (spec) => {
    let bucketDir;
    if (spec.name === "musicians.test.js") {
      bucketDir = "musicians";
    } else if (spec.name === "photos.test.js") {
      bucketDir = "photos";
    } else {
      return;
    }

    // eslint-disable-next-line no-console
    console.log("Clean-up: remove avalanche and gustopher images");

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const testFiles = await getTestFileNames(supabase, bucketDir);
    // eslint-disable-next-line no-console
    console.log("Removing", testFiles);

    if (testFiles.length === 0) {
      throw new Error("NO TEST FILES FOUND");
    }

    const { error } = await supabase.storage.from("uploads").remove(testFiles);
    if (error) {
      throw new Error("could not delete files from supabase", error);
    } else {
      // eslint-disable-next-line no-console
      console.log("SUCCESS: clean-up");
    }
  });

  config.env.auth0_username = process.env.AUTH0_USERNAME;
  config.env.auth0_password = process.env.AUTH0_PASSWORD;
  config.env.auth0_domain = process.env.AUTH0_DOMAIN;
  config.env.auth0_audience = process.env.AUTH0_AUDIENCE;
  config.env.auth0_scope = process.env.AUTH0_SCOPE;
  config.env.auth0_client_id = process.env.AUTH0_CLIENT_ID;
  config.env.auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;
  config.env.auth0_callback_url = process.env.AUTH0_CALLBACK_URL;
  config.env.cypress_localstorage_key = process.env.CYPRESS_LOCALSTORAGE_KEY;
  config.env.cypress_baseUrl = process.env.CYPRESS_baseUrl;
  config.env.cypress_baseUrl = process.env.CYPRESS_baseUrl;
  config.env.revalidation_secret = process.env.REVALIDATION_SECRET;
  config.env.github_action = process.env.GITHUB_ACTION;

  return config;
};
