/* eslint-disable no-param-reassign */
const { resetDB } = require("../../src/__tests__/api/prisma/reset-db");
const { createClient } = require("@supabase/supabase-js");
const dayjs = require("dayjs");

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
  on("task", {
    "db:reset": () => resetDB().then(() => null),
  });
  on("after:run", async () => {
    // eslint-disable-next-line no-console
    console.log("Clean-up: remove avalanche and gustopher images");

    // console.log("SUPABASE_URL", !!process.env.SUPABASE_URL);
    // console.log("SUPABASE_KEY", !!process.env.SUPABASE_KEY);
    if (process.env.SUPABASE_URL) console.log("PROCESS.ENV", process.env);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );

    const musicianFiles = await getTestFileNames(supabase, "musicians");
    const photosFiles = await getTestFileNames(supabase, "photos");
    const allTestFiles = musicianFiles.concat(photosFiles);

    // eslint-disable-next-line no-console
    console.log("Removing", allTestFiles);

    if (allTestFiles.length === 0) {
      throw new Error("NO TEST FILES FOUND");
    }

    const { error } = await supabase.storage
      .from("uploads")
      .remove(allTestFiles);
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
  config.env.auth0_client_id = process.env.AUTH0_CLIENTID;
  config.env.auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;
  config.env.auth0_callback_url = process.env.AUTH0_CALLBACK_URL;
  config.env.cypress_localstorage_key = process.env.CYPRESS_LOCALSTORAGE_KEY;

  return config;
};
