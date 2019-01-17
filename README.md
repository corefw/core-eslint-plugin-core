# eslint-plugin-corefw

An eslint plugin to enforce custom rules used by the Core Framework.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-corefw`:

```
$ npm install eslint-plugin-corefw --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-corefw` globally.

## Usage

Add `corefw` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "corefw"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "corefw/rule-name": 2
    }
}
```

## Supported Rules

* [block-padding](docs/rules/block-padding.md)
* [no-arrow-functions](docs/rules/no-arrow-functions.md)
* [use-strict-padding](docs/rules/use-strict-padding.md)





