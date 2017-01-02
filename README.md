# Translation Validation
A tool to check translation usage in a project. Given a json file with keys you can use it to search a chunk of files for usage.

Example:

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
Given a translation file containing this json data you want to know if any of the keys are unused in your project. This package let's you search your project
 for usage like this:
 
**Usage:**
```
translation-validation PATH-TO-TRANSLATION PATH-TO-SOURCE SKIP-REGEX
// ex:
translation-validation example-project/locales/en/translation.json example-project/ example-project/locales
```