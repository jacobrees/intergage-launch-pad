# Intergage Launch Pad Framework

## Usage
Be sure to have [Node.js](https://nodejs.org/) and [git](https://git-scm.com/) installed before proceeding.
```
# Clone the repo
git clone https://github.com/owenjs/intergage-launch-pad.git
cd intergage-launch-pad

# Install dependencies
npm i

# Bundle JS
npm run build-js
npm run watch-js

# Bundle SCSS
npm run build-scss
npm run watch-scss

# Serve JS and Bundle SCSS
npm start
```

## Merge with the latest Bootstrap release
First, make sure that VSCode is set as your git diff tool. Add the following to your global .gitconfig file:
```
# Start of "VSCode Diff and Merge Client"
# This is to unlock VSCode as your git diff and git merge tool
[merge]
  tool = vscode
[mergetool "vscode"]
  cmd = code --wait $MERGED
[diff]
  tool = vscode
[difftool "vscode"]
  cmd = code --wait --diff $LOCAL $REMOTE
## End of "VSCode Diff and Merge Client"
```

Next, in your local repository you need to create a 'remote' of Bootstrap's repository.
```
git remote add twbs-bootstrap https://github.com/twbs/bootstrap.git
```
Now, using git's 'difftool' command, compare the differences between our SCSS folder and Bootstrap's
```
git difftool master:scss..main:scss
```
The above command will compare our SCSS folder with the latest SCSS folder of Bootstrap's 'main' brunch which is currently the 'In Development' brunch for their upcoming Bootstrap 5 release. In the future this may change to a stable release of v5 and merging will only be necessary on future minor releases of v5.

Following the prompts in the command line open each file with differences and manually update files where necessary. Once each file has been reviewed, rerun the command to double check the changes, and then push the merge to the our master brunch.
 - Any files with the prefix 'c2' can be ignored - theses have been added by Intergage and won't need comparing.
 - Any variables with the prefix 'c2' should not be changed during the merge - theses have been added by Intergage and will be missing in Bootstrap's varsion

### ToDo
- [x] Prefix SCSS after Bundle
- [x] Create Watch Script for SCSS and JS
- [x] Move all Current JS to Bundle File
- [x] Tidy up Rollup's Config
- [x] Be able to bundle multiple SCSS files

- [ ] Don't load the whole of Bootstrap JS in the bundle file
- [ ] Have config options for SCSS so CSS file isn't massive
