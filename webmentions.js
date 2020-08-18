// see https://sebastiandedeyne.com/webmentions-on-a-static-site-with-github-actions/

const fs = require("fs");
const https = require("https");

fetchWebmentions().then(webmentions => {
  webmentions.forEach(webmention => {
    const slug = webmention["wm-target"]
      .replace("https://www.synesthesia.co.uk/", "")
      .replace(/\/$/, "")
      .replace("/", "--");

    //const filename = `${__dirname}/data/webmentions/${slug}.json`;
    const filename = `./data/webmentions/${slug}.json`;
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, JSON.stringify([webmention], { recursive: true }, 2));

      return;
    }

    const entries = JSON.parse(fs.readFileSync(filename))
      .filter(wm => wm["wm-id"] !== webmention["wm-id"])
      .concat([webmention]);

    entries.sort((a, b) => a["wm-id"] - b["wm-id"]);

    fs.writeFileSync(filename, JSON.stringify(entries, null, 2));
  });
});

function fetchWebmentions() {
  const token = process.env.WEBMENTIONS_TOKEN;
  console.log(token);

  const since = new Date();
  since.setDate(since.getDate() - 14);

  const url =
    "https://webmention.io/api/mentions.jf2" +
    "?domain=www.synesthesia.co.uk" +
    `&token=${token}` +
    `&since=${since.toISOString()}` +
    "&per-page=999";
  console.log(url);
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let body = "";

        res.on("data", chunk => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", error => {
        reject(error);
      });
  }).then(response => {
    if (!("children" in response)) {
      throw new Error("Invalid webmention.io response.");
    }

    return response.children;
  });
}
