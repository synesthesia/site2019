# Publishing from Jupyter notebooks

This feature takes advantage of the [Academic CLI](https://github.com/GetRD/academic-file-converter) Bibtex-to-Markdown converter to automatically import Jupyter notebooks into the site.

## Use

1. Ensure you have an installation of Anaconda or Miniconda on the machine you use to maintain this site.
2. Create a virtual environment using the `environment.yml` in this folder
3. activate that environment
4. create Jupyter notebooks
5. commit to `master` and push
6. the GitHub action generates markdown pages and creates a PR for their addition to the site
