<!-- TOC -->

- [MP-I18N](#mp-i18n)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API](#api)
    - [config( options: object)](#config-options-object)
    - [format(template: string, params: object, options?: object)](#formattemplate-string-params-object-options-object)
    - [getIndex( options?: object )](#getindex-options-object-)
    - [getLanguage() : string](#getlanguage--string)
    - [getTexts( options?: object )](#gettexts-options-object-)
    - [load( thisArg: any, options?: object )](#load-thisarg-any-options-object-)
    - [mergetTexts(texts: object, lang?: string)](#mergettextstexts-object-lang-string)
    - [setLanguage(lang : string) : void](#setlanguagelang--string--void)
- [Decorators](#decorators)
    - [@i18n(options:object)](#i18noptionsobject)
        - [Decorate method](#decorate-method)
        - [Decorate class(page)](#decorate-classpage)
        - [Decorate class(component)](#decorate-classcomponent)
- [Customize](#customize)
    - [API provider](#api-provider)
- [Resource Structure](#resource-structure)
    - [Index file](#index-file)
    - [Resource file](#resource-file)
- [Also See](#also-see)

<!-- /TOC -->
# MP-I18N
A cross-platform i18n library for muti-miniprograms (taro、wx、alipay、baidu、tt).

# Installation

>`$ npm install --save mp-i18n`

# Getting Started
```js
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
        i18n.load(this)
          .then(texts => {
            console.log(texts);
            const { hello, world, welcome } = texts;
            const hint = i18n.format(welcome, { hello, world });
            this.setData({ hint });
          })
          .catch(console.error);
    }
}

// page/index.wxss

<view class="usermotto">
  <text class="user-motto">1.{{hint}}</text>
  <text class="user-motto">2.{{$t.hello}}，{{$t.world}}。</text>
</view>

// console output:

{hello: "你好", world: "世界", welcome: "{hello}，{world}。"}

// render result:

1.你好，世界。
2.你好，世界。
```
# API
## config( options: object)
Configure global i18n options.
>It is recommended to configure i18n options in the program entry file, such as *app.js*.

>Do not enable the debug option in the production environment.
* **options**: load options.
* * **cachable**(optional, boolean): whether to enable cache, default is true.
* * **debug**(optional, boolean): whether to enable debug mode to get more info, default is false.
* * **indexUrl**(*required*, function): index file path factory function.
* * **lang**(optional, string): initial language, default is 'zh_CN', if the option 'rememberLanguage' is set to true, the rememberd language is preferred.
* * **langVar**(optional, string): current language variable name, default is '$lang'.
* * **languageStorageKey**(optional, string): the stroage key for keeping language user selected, it only works when setting 'rememberLanguage' to true, default is 'i18n_language'.
* * **lifetime**(optional,string|((prototype)=>string)): the specified lifetime for loading i18n resources.
* * **provider**(optional, object): the api provider, it is automatically created from the current environment by default.
* * **rememberLanguage**(optional, boolean): whether to remember the language selected by the user.
* * **storageKeyPrefix**(optional, string): the key prefix for storage, default is 'i18n'.
* * **textsUrl**(*required*, function): texts file path factory function.
* * **tmplVar**(optional, string): variable name used in the template, default is '$t'.
* * **[deprecated]componentLifetime**(optional, string): the specified component's lifetime for loading i18n resources, default is 'attached'.
* * **[deprecated]pageLifetime**(optional, string): the specified page's lifetime for loading i18n resources, default is 'onLoad'.
```js
import { i18n } from 'mp-i18n';

const baseUrl = 'https://raw.githubusercontent.com/fishen/assets/master/wx-i18n';
const version = '1.0.0';
i18n.config({
  lang: 'zh',
  debug: true,
  indexUrl: () => `${baseUrl}/${version}/index.json`,
  textsUrl: (hash) => `${baseUrl}/${version}/${hash}.json`
})
```
## format(template: string, params: object, options?: object)
Format a template string with the specified parameter.
>If the variable matching flag(left and right) contains special characters, please use the character '\\' to escape, such as { left:"\\\\${" }.
* **template**: the template string.
* **params**: the parameter object to format template.
* **options**: formatting options.
* * **left**(optional, string): The variable matching start flag, default is '{'.
* * **right**(optional, string): The variable matching end flag, default is '}'.
* * **defaultValue**(optional, string | object): the default value for formatting, default is ''.
```js
import { i18n } from 'mp-i18n';

i18n.format('hello, {world}!', { world:'fisher' })
i18n.format('hello, {world}!', {},{ defaultValue:'world' })
i18n.format('{hello}, {world}!', {},{ defaultValue:{ hello:'hi', world:'world' })
i18n.format('hello, ${world}!', { world:'fisher' }, { left:"\\${" })
```
```
// output:
hello, fisher!
hello, world!
hi, world!
hello, fisher!
```
## getIndex( options?: object )
Get index resource, the index resource request will only be called once between the entire  lifecycle and will be re-requested at the next time the program restart. In addition only one request will be initiated at the same time.
* **options**: resource options.
* * **forced**(optional, boolean): whether to require a forced refresh.
```js
import { i18n } from 'mp-i18n';

Page({
  onLoad(){
    i18n.getIndex().then(console.log);
  }
})
```
```json
{ "pages/index/index":"d41d8cd98f00b204e9800998ecf8427e" }
```
## getLanguage() : string
Get current language
## getTexts( options?: object )
Get original i18n resources for the corresponding page or componet (default is current page).
* **options**: resource options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
```js
import { i18n } from 'mp-i18n';

Page({
  onLoad(){
    i18n.getTexts().then(console.log);
  }
})
```
```json
{
  "zh":{"hello":"你好","world":"世界","welcome":"{hello}，{world}。"},
  "en":{"hello":"Hello","world":"World","welcome":"{hello}, {world}."}
}
```
## load( thisArg: any, options?: object )
Load curennt language's resources and bind to the corresponding page or componet (default is current page).
* **thisArg**: page or component object.
* **options**: load options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
* * **tempVar**(optional, string): variable name used in the template, default is '$t'.
* * **langVar**(optional, string): current language variable name, default is '$lang'.
```js
import { i18n } from 'mp-i18n';

Page({
  onLoad(){
    //local mode
    const texts={ zh: { hi: '嗨' }, en: { hi: 'Hi' } };
    i18n.load(this, { texts }).then(console.log)
    //remote mode
    i18n.load(this).then(console.log);
  }
})
```
```xml
<view>current language is {{$lang}}</view>
<view>{{$t.hello}}</view>
```
```js
{hi: "嗨"}
{hello: "你好", world: "世界", welcome: "{hello}，{world}。"}

current language is zh
你好
```
## mergetTexts(texts: object, lang?: string)
Merge texts by specified or current language.
* **texts**: the multi-language texts.
* **lang**: the specified language, default use current language.
```js
import { i18n } from 'mp-i18n';

i18n.mergetTexts({ zh: { hi:'你好' }, en: { hi:'Hi' } },'en'); 
```
```json
{ "hi":"Hi" }
```
## setLanguage(lang : string) : void
Set current language
# Decorators
Recommended settings
```ts
// app.ts(entry file)
import { Page, Component } from 'wxa-core';
import { i18n, I18N_LOAD_LIFETIME } from 'mp-i18n';

// config default loader
// [taro] Component.prototype[I18N_LOAD_LIFETIME] = "componentDidMount";
Page.prototype[I18N_LOAD_LIFETIME] = "onLoad";
Component.prototype[I18N_LOAD_LIFETIME] = "attached";
// or
i18n.config({
  ...
  // [taro] lifetime: 'componentDidMount',
  lifetime: (prototype) => prototype instanceof Page?'onLoad':'attached',
  ...
})
```
## @i18n(options:object)
* **options**: load options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
* * **tempVar**(optional, string): variable name used in the template, default is '$t'.
* * **langVar**(optional, string): current language variable name, default is '$lang'.
* * **lifetime**(optional, string): the specified lifetime for loading i18n resources, used to decorate classes.
* * **[deprecated]isComponent**(optional, boolean): whether the current target is a component, used to decorate classes.
* * **[deprecated]isPage**(optional, boolean): whether the current target is a page, used to decorate classes.
### Decorate method
```js
import { page, Page } from 'wxa-core';
import { i18n, I18N_LOAD_LIFETIME } from 'mp-i18n';

@page()
export default class extends Page{
  @i18n()
  onLoad(options){}
}
```
### Decorate class(page)
```js
import { page, Page } from 'wxa-core';
import { i18n } from 'mp-i18n';

@page()
@i18n()
export default class extends Page{}
``` 
### Decorate class(component)
```js
import { component, Component } from 'wxa-core';
import { i18n } from 'mp-i18n';

@component()
@i18n()
export default class extends Component{}
``` 
# Customize
## API provider
By default, provider is automatically created based on the environment. If you want to change the default behavior, set the provider option when calling the config method.
> You can create a custom provider more easily by inheriting the **DefaultProvider**.
```js
import { i18n } from 'mp-i18n';

class MyProvider{
    request(params){
      // set headers and other operations
    },
    getStorage(params){},
    ...others
}

i18n.config({
  provider: new MyProvider();
  ...others
})
```
For the complete provider definition, please refer to the following interface.
```ts
export interface IProvider {
    getSetData(p: any): (data: any, callback?: () => void) => void;
    request(params: { url: string }): Promise<{ data: any, statusCode: number, header: object }>;
    getStorageInfo(): Promise<{ keys: string[] }>;
    removeStorage(params: { key: string }): Promise<any>;
    setStorage(params: { key: string, data: any }): Promise<any>;
    getStorage(params: { key: string }): Promise<{ data: any }>;
    getStorageSync(key: string): any;
    getCurrentPages(): [{ route: string }];
}
```
# Resource Structure
## Index file
The file includes all path and version(hash value) info.
```js
{
  [page or component path]:[text resource hash value],
  "pages/home/home":"84b7f497e34e10725c4dfdf389e092b8",
  "pages/log/log":"30c481699e53cfc6b490be924ce7f4b8"
}
```
## Resource file
The file include multi-language text resources
```js
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
# Also See
[wxa-core](https://www.npmjs.com/package/wxa-core): build and use WeChat miniprogram core function with typescript.

[mp-event](https://www.npmjs.com/package/mp-event): a simple event subscription publishing system implementation;

[mp-i18n](https://www.npmjs.com/package/mp-i18n): a cross-platform i18n library for muti-miniprograms (wx、alipay、baidu、tt);

[mp-modal](https://www.npmjs.com/package/mp-modal): a helper cross-platform tool for miniprograms that can more convenient to use modal components.

[mp-mem](https://www.npmjs.com/package/mp-mem): a lightweight memoize library that can be used on both normal functions and class methods;

[auto-mapping](https://www.npmjs.com/package/auto-mapping): map and convert objects automatically in typescript;