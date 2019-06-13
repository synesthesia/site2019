#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# if public dir exists, delete it
if [ -d public ]; then
  rm -rf ./public
fi

# clone the github pages repo
git clone git@github.com:synesthesia/synesthesia.github.io.git public


# build the site

hugo -t academic --gc --minify -b https://synesthesia.github.io

# Go to the build folder
cd public

git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back up to the Project Root
cd ..

rm -rf ./public



