# transval
A tool to check translation usage in a project. Given a json file with keys you can use it to search a chunk of files for usage.

**Installation:**
```
npm install --save-dev transval
```
 
**Usage:**
```
transval <FILE-TO-TRANSLATION> <PATH-TO-SOURCE> <SKIP-REGEX>
// ex:
transval example-project/locales/en/translation.json example-project/ example-project/locales
```
The *PATH-TO-SOURCE* can be a comma separated list (with no spaces in the separator).

If you have a translation file like the one below then this module will look for usage of the keys in your code. It will concatenate the keys with dots.

**Translation.json:**

```json
{
  "mainMenu": {
    "home": "Home",
    "products": "Products",
    "about": "About"
  }
}
```
Given this translation file this module will search for the following keys:
 * mainMenu.home
 * mainMenu.products
 * mainMenu.about

**Development:**

If you've downloaded the code from GitHub you will have to install the node modules first before you can run test it.
```
npm install 
```

To run the test, simply run the test command:
```
npm run test
```

To run the example, run the following command:
```
npm run example 
```