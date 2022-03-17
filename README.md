# Synesthesia Website 2019 onwards

My Hugo-based personal website

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/1761afff-7d43-4c65-b513-26c0aa3fc8c0/deploy-status)](https://app.netlify.com/sites/nervous-brahmagupta-ee73b3/deploys)

## Licence

See [LICENSE](LICENSE.md) for details.

### Content 

All content (the [/content](https://github.com/synesthesia/site2019/tree/master/content) subdirectory) is copyright (c) 2001-present Julian Elve and released under the Creative Commons CC [BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) licence.

You are free to share and adapt my content provided you comply with the following terms:

- **Attribution** - You must give appropriate credit (as [defined in the licence](https://creativecommons.org/licenses/by-nc-sa/4.0/)), provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests that I (Julian Elve) endorse you or your use.

- **NonCommercial** — You may not use the material for commercial purposes.

- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the [same license](https://creativecommons.org/licenses/by-nc-sa/4.0/) as the original.

- **No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

### Code (including HTML, SCSS, scripts and makefiles)

For code license and attribution of third-party elements see [LICENSE](https://github.com/synesthesia/site2019/blob/master/LICENSE.md).

## Required Configuration

The following environment variables are required:

|Variable|Description|
|----|----|
| CONTENT_DIR | Directory where micropub posts are uploaded to| 
|	GIT_TOKEN | Personal Access Token|
| GIT_BRANCH | Branch name to add micropub posts to (Must already exist)|
| GITHUB_USER | Username for repo where micropub posts are added to (GitHub)| 
| GITHUB_REPO | Name of repo where micropub posts are added to (GitHub)| 
| ME | Your website url (https://domain.tld/)| 
| MEDIA_DIR | Directory where micropub media is uploaded to| 
| MICROPUB_KEY | shared secret for authorising Micropub API (for when OAuth2 is not usable) |
| NETLIFY_BUILD_DEBUG | set to true to provide verbose build logging |
| TOKEN_ENDPOINT | Endpoint to validate IndieAuth token| 

