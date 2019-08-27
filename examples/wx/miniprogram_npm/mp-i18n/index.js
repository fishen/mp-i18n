module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1566884935969, function(require, module, exports) {
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {



var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultProvider = /** @class */ (function () {
    function DefaultProvider() {
        this.provider = this.getDefaultProvider();
    }
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
    DefaultProvider.prototype.getExtConfig = function () {
        var fn = this.provider && this.provider.getExtConfig;
        return this.promisify(fn);
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
    DefaultProvider.prototype.getDefaultProvider = function () {
        /* tslint:disable */
        try {
            if (Taro !== undefined) {
                return Taro;
            }
        }
        catch (error) { }
        try {
            if (wx !== undefined) {
                return wx;
            }
        }
        catch (error) { }
        try {
            if (my !== undefined) {
                return my;
            }
        }
        catch (error) { }
        try {
            if (tt !== undefined) {
                return tt;
            }
        }
        catch (error) { }
        try {
            if (swan !== undefined) {
                return swan;
            }
        }
        catch (error) { }
    };
    DefaultProvider.prototype.promisify = function (fn, params) {
        if (typeof fn !== "function") {
            throw new TypeError("Invalid provider type.");
        }
        params = Object.assign({}, params);
        return new Promise(function (success, fail) { return fn(__assign({}, params, { success: success, fail: fail })); });
    };
    return DefaultProvider;
}());
exports.DefaultProvider = DefaultProvider;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", { value: true });
var i18n_1 = __webpack_require__(2);
var i18n = new i18n_1.I18n();
exports.i18n = i18n;
var provider_1 = __webpack_require__(0);
exports.DefaultProvider = provider_1.DefaultProvider;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(3);
var store_1 = __webpack_require__(4);
var util_1 = __webpack_require__(5);
var config;
var store;
var util;
var userLanguage;
var I18n = /** @class */ (function () {
    function I18n(options) {
        this.config(options);
    }
    Object.defineProperty(I18n.prototype, "language", {
        /**
         * Get current language
         */
        get: function () {
            var rememberLanguage = config.rememberLanguage, languageStorageKey = config.languageStorageKey, provider = config.provider;
            if (rememberLanguage && languageStorageKey) {
                if (userLanguage) {
                    return userLanguage;
                }
                else {
                    var lang = provider.getStorageSync(config.languageStorageKey);
                    if (lang) {
                        return userLanguage = lang;
                    }
                }
            }
            return config.lang;
        },
        /**
         * Set current language
         */
        set: function (lang) {
            config.lang = lang;
            var rememberLanguage = config.rememberLanguage, languageStorageKey = config.languageStorageKey, provider = config.provider;
            if (rememberLanguage && languageStorageKey) {
                userLanguage = lang;
                provider.setStorage({ key: languageStorageKey, data: lang });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Configure i18n options
     * @param options
     */
    I18n.prototype.config = function (options) {
        config = Object.assign(config_1.defaultConfig, options);
        store = new store_1.I18nStore(config);
        util = new util_1.Util(config);
    };
    /**
     * Get index resource.
     */
    I18n.prototype.getIndex = function (force) {
        var _this = this;
        var indexUrl = config.indexUrl, cachable = config.cachable;
        if (!cachable || force) {
            if (!util.isFn(indexUrl)) {
                throw new Error("Please configure the 'indexUrl' option first.");
            }
            var url = indexUrl();
            if (this.getIndex.prototype.promise) {
                return this.getIndex.prototype.promise;
            }
            util.debug("Getting index resource from remote");
            var clear_1 = function () { return _this.getIndex.prototype.promise = undefined; };
            var promise = util.request(url)
                .then(function (data) { return store.clear(data); })
                .then(function (data) { return (clear_1(), data); }, function (error) { return (clear_1(), Promise.reject(error)); });
            return this.getIndex.prototype.promise = promise;
        }
        else {
            util.debug("Trying get index resource from local");
            return Promise.resolve(this.getIndex.prototype.data)
                .then(function (data) { return data || _this.getIndex(true); })
                .then(function (data) { return _this.getIndex.prototype.data = data; });
        }
    };
    /**
     * Get text resources
     * @param options options
     */
    I18n.prototype.getTexts = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var texts = options.texts;
        if (texts) {
            util.debug("Use local texts", texts);
            return Promise.resolve(this.mergeTexts(texts));
        }
        var textsUrl = config.textsUrl, cachable = config.cachable;
        if (!util.isFn(textsUrl)) {
            throw new Error("Please configure the 'textsUrl' option first.");
        }
        var path = options.path || util.getCurrentPageRoute();
        util.debug("Current i18n path is " + path);
        if (typeof path !== "string") {
            throw new TypeError("The path must be string type.");
        }
        return this.getIndex()
            .then(function (resources) { return resources[path]; })
            .then(function (hash) {
            if (!hash) {
                return Promise.reject(new Error("The path '" + path + "' was not defined in index file."));
            }
            var url = textsUrl(path, hash);
            if (cachable) {
                return store.get(path).then(function (data) {
                    if (data && data.version === hash) {
                        util.debug("Getting text resource from cache.");
                        return data;
                    }
                    else {
                        if (!data) {
                            util.debug("The cache resource not exists and getting text resource from remote");
                        }
                        else {
                            store.remove(path);
                            util.debug("The cache resource has expired.");
                        }
                        return util.request(url)
                            .then(function (res) { return (res.version = hash, res); })
                            .then(function (t) { return (store.set(path, t), t); });
                    }
                });
            }
            else {
                util.debug("Getting text resource from remote");
                return util.request(url);
            }
        })
            .then(function (t) { return _this.mergeTexts(t); });
    };
    /**
     * Merge texts
     * @param data multi-language texts
     * @param lang language
     *
     * mergetTexts({zh:{hi:'你好'},en:{hi:'Hi'}},'en')
     * result: {hi:'Hi'}
     */
    I18n.prototype.mergeTexts = function (data, lang) {
        if (!data) {
            return {};
        }
        var language = lang || this.language;
        if (!(language in data)) {
            util.debug("The resource corresponding to " + language + " does not exist.", data);
        }
        return data[language];
    };
    return I18n;
}());
exports.I18n = I18n;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = __webpack_require__(0);
exports.defaultConfig = {
    cachable: true,
    debug: false,
    lang: "zh_CN",
    languageStorageKey: "i18n_language",
    provider: new provider_1.DefaultProvider(),
    rememberLanguage: true,
    storageKeyPrefix: "i18n",
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", { value: true });
var I18nStore = /** @class */ (function () {
    function I18nStore(config) {
        this.prefix = config.storageKeyPrefix;
        this.provider = config.provider;
        this.languageKey = config.languageStorageKey;
    }
    I18nStore.prototype.get = function (path) {
        var key = this.getKey(path);
        return this.provider.getStorage({ key: key })
            .then(function (res) { return res.data; })
            .catch(function () { return null; });
    };
    I18nStore.prototype.set = function (path, data) {
        var key = this.getKey(path);
        return this.provider.setStorage({ key: key, data: data });
    };
    I18nStore.prototype.has = function (path) {
        var key = this.getKey(path);
        return this.provider.getStorageInfo()
            .then(function (res) { return res.keys.indexOf(key) >= 0; })
            .catch(function () { return false; });
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
        return this.provider.getStorageInfo()
            .then(function (info) { return info.keys; })
            .then(function (keys) { return keys.filter(function (key) { return key.startsWith(_this.prefix); }); });
    };
    I18nStore.prototype.clear = function (data) {
        var _this = this;
        var from = this.getKey("").length;
        this.getAll()
            .then(function (keys) { return keys.filter(function (key) { return key !== _this.languageKey && !(key.substr(from) in data); }); })
            .then(function (keys) { return keys.forEach(function (key) { return _this.provider.removeStorage({ key: key }); }); })
            .catch(console.error);
        return data;
    };
    I18nStore.prototype.getKey = function (path) {
        return this.prefix + "/" + path;
    };
    return I18nStore;
}());
exports.I18nStore = I18nStore;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util(config) {
        this.config = config;
    }
    Util.prototype.getCurrentPageRoute = function () {
        var pages = this.config.provider.getCurrentPages();
        var currentPage = pages[pages.length - 1];
        return currentPage.route;
    };
    Util.prototype.request = function (url) {
        this.debug("i18n request url: " + url);
        return this.config.provider.request({ url: url })
            .then(function (res) { return (res.statusCode === 200 ? res.data : Promise.reject()); })
            .then(function (data) {
            if (typeof data === "object") {
                return data;
            }
            return Promise.reject(new Error("invalid i18n config file, please check file contents."));
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
    return Util;
}());
exports.Util = Util;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1566884935969);
})()
//# sourceMappingURL=index.js.map