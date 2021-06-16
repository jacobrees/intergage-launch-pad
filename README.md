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

## Enabling E-Commerce Layouts
The Launch Pad framework includes default formating for the Basket and Checkout pages, although it's not included in the complied CSS by default. To enable the styles set this variable to 'Ecom' in site/_variables.scss:
```scss
$c2-cms-base-product: 'Ecom';
```
There is also some Javascipt that needs to added to the main.bundle.js file. Remove the commented code labeled 'Ecom' in src/app/index.js

When a copy of the Launch Pad is upgraded to E-Commerce it will use to legacy markup by default, this is not styled by the framework. Instead there are display templates available which need to be selected in 'E-Commerce Settings' > 'Layout':
- ✅ Use Responsive Checkout
- Basket Display Template -> 'Ecom Basket Layout'
- Default Basket Item Display Template -> 'Ecom Basket Item Layout'

When creating the Basket and Checkout pages on the new site these steps need to be followed in order for the default styles to be applied:

### Basket Page
The 'E-Commerce Basket Item' must be inserted inside a 'Container' item with *'c2-basket-item-wrapper'* added to the 'Additional Classes' field under the 'Advance' tab.

### Checkout Page
The Page Template should be set to 'Blank'. The default checkout page consists of two items: 'Checkout Item' and 'E-Commerce Basket Link Item'. These items both need the markup below are their 'Custom Layout':
```html
<!-- Checkout Item Custom Layout -->

<div class="c2-basket-stage">
  <div class="c2-basket-stage__menu-upper">$MENU$</div>

  <div class="c2-basket-stage__content">$STAGE_CONTENT$</div>

  <div class="c2-basket-stage__menu-lower">$MENU$</div>
</div>
```
```html
<!-- E-Commerce Basket Link Item -->

<div class="c2-checkout-basket">
  <div>$ITEM_CONTENTS_TAX$</div>

  <p class="h6">Delivery Price: <span class="float-end">$SHIP_TOTAL$</span></p>

  <p class="h5">Total Price: <span class="float-end">$ORDER_TOTAL$</span></p>
</div>

<p class="mt-3" style="text-align: center;"><span class="rte-btn-outline-primary">Return to your basket</span></p>
```
These items are inserted into a custom column layout using a 'HTML Content Item' which is then inserted into a 'Container' item.
```html
<!-- Custom Column Layout -->

<div>
  <div class="row position-relative">
    <div class="col-12 col-lg-7 col-xl-8">$INSERT: Checkout Column$</div>
    <div class="col-12 col-lg-5 col-xl-4 sticky-top align-self-start">$INSERT: Basket Column$</div>
  </div>
</div>
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
