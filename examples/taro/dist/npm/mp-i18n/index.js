(function (e, a) {
  for (var i in a) e[i] = a[i];
})(exports, /******/function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/__webpack_require__.t = function (value, mode) {
    /******/if (mode & 1) value = __webpack_require__(value);
    /******/if (mode & 8) return value;
    /******/if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/var ns = Object.create(null);
    /******/__webpack_require__.r(ns);
    /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    /******/return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 2);
  /******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var DefaultProvider = /** @class */function () {
    function DefaultProvider(provider) {
      this.provider = provider;
    }
    DefaultProvider.prototype.getSetData = function (p) {
      if (p && typeof p.setData === "function") {
        return function (data, callback) {
          return p.setData(data, callback);
        };
      } else if (p && typeof p.setState === "function") {
        return function (data, callback) {
          return p.setState(data, callback);
        };
      }
    };
    DefaultProvider.prototype.request = function (params) {
      var fn = this.provider && this.provider.request;
      return this.promisify(fn, params);
    };
    DefaultProvider.prototype.getStorageInfo = function () {
      var fn = this.provider && this.provider.getStorageInfo;
      return this.promisify(fn);
    };
    DefaultProvider.prototype.removeStorage = function (params) {
      var fn = this.provider && this.provider.removeStorage;
      return this.promisify(fn, params);
    };
    DefaultProvider.prototype.setStorage = function (params) {
      var fn = this.provider && this.provider.setStorage;
      return this.promisify(fn, params);
    };
    DefaultProvider.prototype.getStorage = function (params) {
      var fn = this.provider && this.provider.getStorage;
      return this.promisify(fn, params);
    };
    DefaultProvider.prototype.getStorageSync = function (key) {
      var fn = this.provider && this.provider.getStorageSync;
      return fn(key);
    };
    DefaultProvider.prototype.getCurrentPages = function () {
      var fn = this.provider && this.provider.getCurrentPages;
      fn = fn || getCurrentPages;
      return fn();
    };
    DefaultProvider.prototype.promisify = function (fn, params) {
      if (typeof fn !== "function") {
        throw new TypeError("Invalid provider type.");
      }
      params = Object.assign({}, params);
      return new Promise(function (success, fail) {
        return fn(__assign({}, params, { success: success, fail: fail }));
      }).catch(function (err) {
        return console.log(err), Promise.reject(err);
      });
    };
    return DefaultProvider;
  }();
  exports.DefaultProvider = DefaultProvider;

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", { value: true });
  var default_provider_1 = __webpack_require__(0);
  var TTProvider = /** @class */function (_super) {
    __extends(TTProvider, _super);
    function TTProvider() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TTProvider.prototype.getStorageSync = function (key) {
      return _super.prototype.getStorageSync.call(this, key).data;
    };
    return TTProvider;
  }(default_provider_1.DefaultProvider);
  exports.TTProvider = TTProvider;

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var i18n_1 = __webpack_require__(3);
  exports.i18n = i18n_1.i18n;
  var default_provider_1 = __webpack_require__(0);
  exports.DefaultProvider = default_provider_1.DefaultProvider;

  /***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var config_1 = __webpack_require__(4);
  var store_1 = __webpack_require__(7);
  var util_1 = __webpack_require__(8);
  var store;
  var util;
  var userLanguage;
  function i18n(options) {
    var decorator = function (target, name, descriptor) {
      if (typeof target === "function") {
        var lifetime = options.lifetime;
        lifetime = lifetime || options.isPage && exports.config.pageLifetime;
        lifetime = lifetime || options.isComponent && exports.config.componentLifetime;
        if (!lifetime) {
          console.warn("When Used to decorate class with 'i18n', please set 'isComponent' or 'isPage' option");
          return;
        }
        var originalValue_1 = target.prototype[lifetime];
        target.prototype[lifetime] = function () {
          var _this = this;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return decorator.fn.call(this).finally(function () {
            return originalValue_1 && originalValue_1.apply(_this, args);
          });
        };
      } else {
        var originalValue_2 = descriptor.value;
        descriptor.value = function () {
          var _this = this;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return decorator.fn.call(this).finally(function () {
            return originalValue_2.apply(_this, args);
          });
        };
      }
    };
    decorator.fn = function () {
      return i18n.load(this, options);
    };
    return decorator;
  }
  exports.i18n = i18n;
  /**
   * Get current language
   */
  i18n.getLanguage = function () {
    var rememberLanguage = exports.config.rememberLanguage,
        languageStorageKey = exports.config.languageStorageKey,
        provider = exports.config.provider;
    if (rememberLanguage && languageStorageKey) {
      if (userLanguage) {
        return userLanguage;
      } else {
        var lang = provider.getStorageSync(exports.config.languageStorageKey);
        if (lang) {
          return userLanguage = lang;
        }
      }
    }
    return exports.config.lang;
  };
  /**
   * Set current language
   */
  i18n.setLanguage = function (lang) {
    exports.config.lang = lang;
    var rememberLanguage = exports.config.rememberLanguage,
        languageStorageKey = exports.config.languageStorageKey,
        provider = exports.config.provider;
    if (rememberLanguage && languageStorageKey) {
      userLanguage = lang;
      provider.setStorage({ key: languageStorageKey, data: lang });
    }
  };
  /**
   * Configure i18n options
   * @param options
   */
  i18n.config = function (options) {
    exports.config = Object.assign(config_1.defaultConfig, options);
    store = new store_1.I18nStore(exports.config);
    util = new util_1.Util(exports.config);
    util.debug("Current i18n config:", exports.config);
  };
  /**
   * Get index resource.
   * @param options options.
   */
  i18n.getIndex = function (options) {
    if (options === undefined) {
      options = {};
    }
    var indexUrl = exports.config.indexUrl,
        cachable = exports.config.cachable;
    if (!cachable || options.forced) {
      if (!util.isFn(indexUrl)) {
        throw new Error("Please configure the 'indexUrl' option first.");
      }
      var url = indexUrl();
      if (i18n.getIndex.prototype.promise) {
        return i18n.getIndex.prototype.promise;
      }
      util.debug("Getting index resource from remote");
      var clear_1 = function () {
        return i18n.getIndex.prototype.promise = undefined;
      };
      var promise = util.request(url).then(function (data) {
        return store.clear(data);
      }).then(function (data) {
        return clear_1(), data;
      }, function (error) {
        return clear_1(), Promise.reject(error);
      });
      return i18n.getIndex.prototype.promise = promise;
    } else {
      util.debug("Trying get index resource from local");
      return Promise.resolve(i18n.getIndex.prototype.data).then(function (data) {
        return data || i18n.getIndex({ forced: true });
      }).then(function (data) {
        return i18n.getIndex.prototype.data = data;
      });
    }
  };
  /**
   * Get original i18n resources for the corresponding page or componet (default is current page).
   * @param options options.
   * @returns the original resources.
   *
   * @example
   * i18n.getTexts().then(console.log).catch(console.error);//{ zh:{ hello:"你好" },en:{ hello:"Hello" } }
   */
  i18n.getTexts = function (options) {
    if (options === undefined) {
      options = {};
    }
    var texts = options.texts;
    if (texts) {
      util.debug("Use local texts", texts);
      return Promise.resolve(texts);
    }
    var textsUrl = exports.config.textsUrl,
        cachable = exports.config.cachable;
    if (!util.isFn(textsUrl)) {
      throw new Error("Please configure the 'textsUrl' option first.");
    }
    var path = options.path || util.getCurrentPageRoute();
    util.debug("Current i18n path is " + path);
    if (typeof path !== "string") {
      throw new TypeError("The path must be string type.");
    }
    return i18n.getIndex().then(function (resources) {
      return resources[path];
    }).then(function (hash) {
      if (!hash) {
        return Promise.reject(new Error("The path '" + path + "' was not defined in index file."));
      }
      var url = textsUrl(hash, path);
      if (cachable) {
        return store.get(path).then(function (data) {
          if (data && data.version === hash) {
            util.debug("Getting text resource from cache.");
            return data;
          } else {
            if (!data) {
              util.debug("The cache resource not exists and getting text resource from remote");
            } else {
              store.remove(path);
              util.debug("The cache resource has expired.");
            }
            return util.request(url).then(function (res) {
              return res.version = hash, res;
            }).then(function (t) {
              return store.set(path, t), t;
            });
          }
        });
      } else {
        util.debug("Getting text resource from remote");
        return util.request(url);
      }
    });
  };
  /**
   * Load curennt language's resources and bind to the corresponding page or componet (default is current page).
   * @param thisArg page or component object.
   * @param options load options.
   * @returns the i18n resources.
   *
   * @example
   * //index.js
   * const { i18n }=require("mp-i18n");
   * Page({
   *  onLoad(){
   *    i18n.load(this)
   *  }
   * })
   *
   * //index.wxss
   * <view>{{$t.key}}</view>
   */
  i18n.load = function (thisArg, options) {
    if (options === undefined) {
      options = {};
    }
    var setData = exports.config.provider.getSetData(thisArg);
    if (!util.isFn(setData)) {
      throw new TypeError("param 'thisArg' has no method 'setData'.");
    }
    var tmplVar = options.tmplVar || exports.config.tmplVar || config_1.defaultConfig.tmplVar;
    var langVar = options.langVar || exports.config.langVar || config_1.defaultConfig.langVar;
    var getData = function (texts) {
      var _a;
      return _a = {}, _a[tmplVar] = texts, _a[langVar] = i18n.getLanguage(), _a;
    };
    return i18n.getTexts(options).then(function (t) {
      return i18n.mergeTexts(t);
    }).then(function (texts) {
      return new Promise(function (resolve) {
        return setData(getData(texts), function () {
          return resolve(texts);
        });
      });
    });
  };
  /**
   * Format a template string with the specified parameter.
   * @param template the template string.
   * @param params the parameter object to format template.
   * @param options formatting options, if the matching symbol(left and right) contains
   * special characters, please use the character '\' to escape, such as { left:"\\${" }.
   * @returns the formatting result.
   *
   * @example
   * i18n.format('hello, {world}!', { world:'fisher' }) //hello, fisher!
   * i18n.format('hello, {world}!', {},{ defaultValue:'world' }) //hello, world!
   * i18n.format('hello, ${world}!', { world:'fisher' }, { left:"\\${" }) //hello, fisher!
   */
  i18n.format = function (template, params, options) {
    if (!template) {
      return template;
    }
    if (!util.isStr(template)) {
      throw new TypeError("The param 'template' must be string type.");
    }
    options = Object.assign({ left: "{", right: "}", defaultValue: "" }, options);
    var left = options.left,
        right = options.right,
        defaultValue = options.defaultValue;
    var regex = new RegExp(left + "(.+?)" + right, "g");
    var result = template.replace(regex, function (substr, key) {
      key = key.trim();
      var value = params && params[key];
      if (value === undefined && defaultValue !== undefined) {
        value = typeof defaultValue === "object" ? defaultValue[key] : defaultValue;
      }
      return value;
    });
    return result;
  };
  /**
   * Merge texts by specified or current language.
   * @param data multi-language texts.
   * @param lang the specified language, default use current language.
   *
   * @example
   * i18n.mergetTexts({ zh:{ hi:'你好' },en:{ hi:'Hi' } },'en') //{ hi:'Hi' }
   */
  i18n.mergeTexts = function (data, lang) {
    if (!data) {
      return {};
    }
    var language = lang || i18n.getLanguage();
    if (!(language in data)) {
      util.debug("The resource corresponding to " + language + " does not exist.", data);
    }
    return data[language];
  };

  /***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var provider_factory_1 = __webpack_require__(5);
  exports.defaultConfig = {
    cachable: true,
    componentLifetime: "attached",
    debug: false,
    lang: "zh_CN",
    langVar: "$lang",
    languageStorageKey: "i18n_language",
    pageLifetime: "onLoad",
    provider: provider_factory_1.createProvider(),
    rememberLanguage: true,
    storageKeyPrefix: "i18n",
    tmplVar: "$t"
  };

  /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var alipay_provider_1 = __webpack_require__(6);
  var default_provider_1 = __webpack_require__(0);
  var toutiao_provider_1 = __webpack_require__(1);
  function createProvider() {
    try {
      if (wx !== undefined) {
        return new default_provider_1.DefaultProvider(wx);
      }
    } catch (error) {}
    try {
      if (my !== undefined) {
        return new alipay_provider_1.AliProvider(my);
      }
    } catch (error) {}
    try {
      if (tt !== undefined) {
        return new toutiao_provider_1.TTProvider(tt);
      }
    } catch (error) {}
    try {
      if (swan !== undefined) {
        return new default_provider_1.DefaultProvider(tt);
      }
    } catch (error) {}
  }
  exports.createProvider = createProvider;

  /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", { value: true });
  var toutiao_provider_1 = __webpack_require__(1);
  var AliProvider = /** @class */function (_super) {
    __extends(AliProvider, _super);
    function AliProvider() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    AliProvider.prototype.request = function (params) {
      return _super.prototype.request.call(this, params).then(function (res) {
        return res.statusCode = res.status, res;
      });
    };
    return AliProvider;
  }(toutiao_provider_1.TTProvider);
  exports.AliProvider = AliProvider;

  /***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var I18nStore = /** @class */function () {
    function I18nStore(config) {
      this.prefix = config.storageKeyPrefix;
      this.provider = config.provider;
      this.languageKey = config.languageStorageKey;
    }
    I18nStore.prototype.get = function (path) {
      var key = this.getKey(path);
      return this.provider.getStorage({ key: key }).then(function (res) {
        return res.data;
      }).catch(function () {
        return null;
      });
    };
    I18nStore.prototype.set = function (path, data) {
      var key = this.getKey(path);
      return this.provider.setStorage({ key: key, data: data });
    };
    I18nStore.prototype.has = function (path) {
      var key = this.getKey(path);
      return this.provider.getStorageInfo().then(function (res) {
        return res.keys.indexOf(key) >= 0;
      }).catch(function () {
        return false;
      });
    };
    I18nStore.prototype.remove = function (path) {
      var key = this.getKey(path);
      return this.provider.removeStorage({ key: key });
    };
    I18nStore.prototype.getAll = function () {
      var _this = this;
      if (!this.prefix) {
        return Promise.reject(new Error("missing i18n configuration option 'storageKeyPrefix'"));
      }
      return this.provider.getStorageInfo().then(function (info) {
        return info.keys;
      }).then(function (keys) {
        return keys.filter(function (key) {
          return key.startsWith(_this.prefix);
        });
      });
    };
    I18nStore.prototype.clear = function (data) {
      var _this = this;
      var from = this.getKey("").length;
      this.getAll().then(function (keys) {
        return keys.filter(function (key) {
          return key !== _this.languageKey && !(key.substr(from) in data);
        });
      }).then(function (keys) {
        return keys.forEach(function (key) {
          return _this.provider.removeStorage({ key: key });
        });
      }).catch(console.error);
      return data;
    };
    I18nStore.prototype.getKey = function (path) {
      return this.prefix + "/" + path;
    };
    return I18nStore;
  }();
  exports.I18nStore = I18nStore;

  /***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", { value: true });
  var Util = /** @class */function () {
    function Util(config) {
      this.config = config;
    }
    Util.prototype.getCurrentPageRoute = function () {
      var pages = this.config.provider.getCurrentPages();
      var currentPage = pages[pages.length - 1];
      return currentPage.route;
    };
    Util.prototype.request = function (url) {
      var _this = this;
      this.debug("i18n request url: " + url);
      return this.config.provider.request({ url: url }).then(function (res) {
        return res.statusCode = res.statusCode || res.status, res;
      }).then(function (_a) {
        var statusCode = _a.statusCode,
            data = _a.data;
        return statusCode === 200 ? data : Promise.reject(new Error("Incorrent status code " + statusCode));
      }).then(function (data) {
        if (typeof data === "object") {
          return data;
        }
        return Promise.reject(new Error("invalid i18n config file, please check file contents."));
      }).catch(function (error) {
        return _this.debug("request error:", error), Promise.reject(error);
      });
    };
    Util.prototype.debug = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.config.debug) {
        console.log.apply(console, args);
      }
    };
    Util.prototype.isFn = function (fn) {
      return typeof fn === "function";
    };
    Util.prototype.isObj = function (obj) {
      return typeof obj === "function";
    };
    Util.prototype.isStr = function (str) {
      return typeof str === "string";
    };
    return Util;
  }();
  exports.Util = Util;

  /***/
}]
/******/));
//# sourceMappingURL=index.js.map