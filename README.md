# mp-i18n
A cross-platform i18n library for muti-miniprograms (wx、alipay、baidu、tt).

# Installation

>`$ npm install --save mp-i18n`

# Getting started
```
// app.js

import { i18n } from 'mp-i18n';

const baseUrl = 'https://raw.githubusercontent.com/fishen/assets/master/wx-i18n';
const version = '1.0.0';
i18n.config({
  lang: 'zh',
  indexUrl: () => `${baseUrl}/${version}/index.json`,
  textsUrl: (hash) => `${baseUrl}/${version}/${hash}.json`
})

// pages/index.js

import { i18n } from 'mp-i18n';

Page({
    onLoad: function () {
        i18n.getTexts().then(console.log).catch(console.error);
    }
}

// output:

{hello: "你好", world: "世界", welcome: "{hello}，{world}。"}
```
# Necessary resource structure

## Index file
The file includes all path and version(hash value) info.
```
{
  [page or component path]:[text resource hash value],
  "pages/home/home":"84b7f497e34e10725c4dfdf389e092b8",
  "pages/log/log":"30c481699e53cfc6b490be924ce7f4b8"
}
```
## Page/Component text file
The file include multi language text resources
```
{
  [lang]: {
    [key] : [value]
  },
  "zh": {
    "hello":"你好",
    "world":"世界",
    "welcome":"{hello}，{world}。"
  },
  "en": {
    "hello" : "Hello",
    "world" : "World",
    "welcome":"{hello}, {world}."
  }
}
```

# todo...


