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
* * **provider**(optional, object): the api provider, it is automatically created from the current environment by default.
* * **rememberLanguage**(optional, boolean): whether to remember the language selected by the user.
* * **storageKeyPrefix**(optional, string): The key prefix for storage, default is 'i18n'.
* * **textsUrl**(*required*, function): texts file path factory function.
* * **tmplVar**(optional, string): variable name used in the template, default is '$t'.
```
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
```
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
```
import { i18n } from 'mp-i18n';

Page({
  onLoad(){
    i18n.getIndex().then(console.log);
  }
})
```
```
{ "pages/index/index":"d41d8cd98f00b204e9800998ecf8427e" }
```
## getTexts( options?: object )
Get original i18n resources for the corresponding page or componet (default is current page).
* **options**: resource options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
```
import { i18n } from 'mp-i18n';

Page({
  onLoad(){
    i18n.getTexts().then(console.log);
  }
})
```
```
{
  "zh":{"hello":"你好","world":"世界","welcome":"{hello}，{world}。"},
  "en":{"hello":"Hello","world":"World","welcome":"{hello}, {world}."}
}
```
## language
Get or set current language.
## load( thisArg: any, options?: object )
Load curennt language's resources and bind to the corresponding page or componet (default is current page).
>If used in the **Taro** framework, use **this.$scope** instead of this, such as i18n.load(this.$scope);
* **thisArg**: page or component object.
* **options**: load options.
* * **path**(optional, string): the resource(page or component) path, default get current path by 'getCurrentPages'.
* * **texts**(optional, object): local texts resource, if not set, it will fetch from the remote.
* * **tempVar**(optional, string): variable name used in the template, default is '$t'.
* * **langVar**(optional, string): current language variable name, default is '$lang'.
```
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

<view>current language is {{$lang}}</view>
<view>{{$t.hello}}</view>
```
```
{hi: "嗨"}
{hello: "你好", world: "世界", welcome: "{hello}，{world}。"}

current language is zh
你好
```
## mergetTexts(texts: object, lang?: string)
Merge texts by specified or current language.
* **texts**: the multi-language texts.
* **lang**: the specified language, default use current language.
```
import { i18n } from 'mp-i18n';

i18n.mergetTexts({ zh: { hi:'你好' }, en: { hi:'Hi' } },'en'); 
```
```
{ hi:'Hi' }
```
# Customize
## API provider
By default, provider is automatically created based on the environment. If you want to change the default behavior, set the provider option when calling the config method.
> You can create a custom provider more easily by inheriting the **DefaultProvider**.
```
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
```
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
# Resource structure required
## Index file
The file includes all path and version(hash value) info.
```
{
  [page or component path]:[text resource hash value],
  "pages/home/home":"84b7f497e34e10725c4dfdf389e092b8",
  "pages/log/log":"30c481699e53cfc6b490be924ce7f4b8"
}
```
## Resource file
The file include multi-language text resources
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


