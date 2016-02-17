# Slush Eslint Babel React
This is a generator for Eslint using Babel and React.

## What does it do?

It generates eslint config with a babel parser and react support. It also installs all the required dev dependencies.

- generate .eslintrc
- generate .eslintignore
- (optional) generate .editorconfig
- (optional) generate .babelrc

## Installation

```
sudo npm install slush -g
sudo npm install slush-eslint-babel-react -g
```

## .eslintrc

```json
{
  "parser"  : "babel-eslint",
  "extends" : [
    "standard",
    "standard-react"
  ],
  "env"     : {
    "browser" : true
  },
  "rules": {
    "semi" : [2, "<%= semiColonsRule %>"], // depends if you want semi colons (asked)
    "space-infix-ops": 0,
    "max-len": [2, 120, 2]
  }
}
```

## .editorconfig
```json
# http://editorconfig.org

# A special property that should be specified at the top of the file outside of
# any sections. Set to true to stop .editor config file search on current file
root = true

[*]
# Indentation style
# Possible values - tab, space
indent_style = space

# Indentation size in single-spaced characters
# Possible values - an integer, tab
indent_size = 2

# Line ending file format
# Possible values - lf, crlf, cr
end_of_line = lf

# File character encoding
# Possible values - latin1, utf-8, utf-16be, utf-16le
charset = utf-8

# Denotes whether to trim whitespace at the end of lines
# Possible values - true, false
trim_trailing_whitespace = true

# Denotes whether file should end with a newline
# Possible values - true, false
insert_final_newline = true
```

## .babelrc

```json
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": ["transform-runtime"]
}
```
