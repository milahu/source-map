function run_test() {
  for (var k in SOURCE_MAP_TEST_MODULE) {
    if (/^test/.test(k)) {
      SOURCE_MAP_TEST_MODULE[k](assert);
    }
  }
}


var SOURCE_MAP_TEST_MODULE =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	var libUtil = __webpack_require__(1);
	
	exports['test urls'] = function (assert) {
	  var assertUrl = function (url) {
	    assert.equal(url, libUtil.urlGenerate(libUtil.urlParse(url)));
	  };
	  assertUrl('http://');
	  assertUrl('http://www.example.com');
	  assertUrl('http://user:pass@www.example.com');
	  assertUrl('http://www.example.com:80');
	  assertUrl('http://www.example.com/');
	  assertUrl('http://www.example.com/foo/bar');
	  assertUrl('http://www.example.com/foo/bar/');
	  assertUrl('http://user:pass@www.example.com:80/foo/bar/');
	
	  assertUrl('//');
	  assertUrl('//www.example.com');
	  assertUrl('file:///www.example.com');
	
	  assert.equal(libUtil.urlParse(''), null);
	  assert.equal(libUtil.urlParse('.'), null);
	  assert.equal(libUtil.urlParse('..'), null);
	  assert.equal(libUtil.urlParse('a'), null);
	  assert.equal(libUtil.urlParse('a/b'), null);
	  assert.equal(libUtil.urlParse('a//b'), null);
	  assert.equal(libUtil.urlParse('/a'), null);
	  assert.equal(libUtil.urlParse('data:foo,bar'), null);
	
	  var parsed = libUtil.urlParse('http://x-y.com/bar');
	  assert.equal(parsed.scheme, 'http');
	  assert.equal(parsed.host, 'x-y.com');
	  assert.equal(parsed.path, '/bar');
	
	  var webpackURL = 'webpack:///webpack/bootstrap 67e184f9679733298d44'
	  parsed = libUtil.urlParse(webpackURL);
	  assert.equal(parsed.scheme, 'webpack');
	  assert.equal(parsed.host, '');
	  assert.equal(parsed.path, '/webpack/bootstrap 67e184f9679733298d44');
	  assert.equal(webpackURL, libUtil.urlGenerate(parsed));
	};
	
	exports['test normalize()'] = function (assert) {
	  assert.equal(libUtil.normalize('/..'), '/');
	  assert.equal(libUtil.normalize('/../'), '/');
	  assert.equal(libUtil.normalize('/../../../..'), '/');
	  assert.equal(libUtil.normalize('/../../../../a/b/c'), '/a/b/c');
	  assert.equal(libUtil.normalize('/a/b/c/../../../d/../../e'), '/e');
	
	  assert.equal(libUtil.normalize('..'), '..');
	  assert.equal(libUtil.normalize('../'), '../');
	  assert.equal(libUtil.normalize('../../a/'), '../../a/');
	  assert.equal(libUtil.normalize('a/..'), '.');
	  assert.equal(libUtil.normalize('a/../../..'), '../..');
	
	  assert.equal(libUtil.normalize('/.'), '/');
	  assert.equal(libUtil.normalize('/./'), '/');
	  assert.equal(libUtil.normalize('/./././.'), '/');
	  assert.equal(libUtil.normalize('/././././a/b/c'), '/a/b/c');
	  assert.equal(libUtil.normalize('/a/b/c/./././d/././e'), '/a/b/c/d/e');
	
	  assert.equal(libUtil.normalize(''), '.');
	  assert.equal(libUtil.normalize('.'), '.');
	  assert.equal(libUtil.normalize('./'), '.');
	  assert.equal(libUtil.normalize('././a'), 'a');
	  assert.equal(libUtil.normalize('a/./'), 'a/');
	  assert.equal(libUtil.normalize('a/././.'), 'a');
	
	  assert.equal(libUtil.normalize('/a/b//c////d/////'), '/a/b/c/d/');
	  assert.equal(libUtil.normalize('///a/b//c////d/////'), '///a/b/c/d/');
	  assert.equal(libUtil.normalize('a/b//c////d'), 'a/b/c/d');
	
	  assert.equal(libUtil.normalize('.///.././../a/b//./..'), '../../a')
	
	  assert.equal(libUtil.normalize('http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.normalize('http://www.example.com/'), 'http://www.example.com/');
	  assert.equal(libUtil.normalize('http://www.example.com/./..//a/b/c/.././d//'), 'http://www.example.com/a/b/d/');
	};
	
	exports['test join()'] = function (assert) {
	  assert.equal(libUtil.join('a', 'b'), 'a/b');
	  assert.equal(libUtil.join('a/', 'b'), 'a/b');
	  assert.equal(libUtil.join('a//', 'b'), 'a/b');
	  assert.equal(libUtil.join('a', 'b/'), 'a/b/');
	  assert.equal(libUtil.join('a', 'b//'), 'a/b/');
	  assert.equal(libUtil.join('a/', '/b'), '/b');
	  assert.equal(libUtil.join('a//', '//b'), '//b');
	
	  assert.equal(libUtil.join('a', '..'), '.');
	  assert.equal(libUtil.join('a', '../b'), 'b');
	  assert.equal(libUtil.join('a/b', '../c'), 'a/c');
	
	  assert.equal(libUtil.join('a', '.'), 'a');
	  assert.equal(libUtil.join('a', './b'), 'a/b');
	  assert.equal(libUtil.join('a/b', './c'), 'a/b/c');
	
	  assert.equal(libUtil.join('a', 'http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('a', 'data:foo,bar'), 'data:foo,bar');
	
	
	  assert.equal(libUtil.join('', 'b'), 'b');
	  assert.equal(libUtil.join('.', 'b'), 'b');
	  assert.equal(libUtil.join('', 'b/'), 'b/');
	  assert.equal(libUtil.join('.', 'b/'), 'b/');
	  assert.equal(libUtil.join('', 'b//'), 'b/');
	  assert.equal(libUtil.join('.', 'b//'), 'b/');
	
	  assert.equal(libUtil.join('', '..'), '..');
	  assert.equal(libUtil.join('.', '..'), '..');
	  assert.equal(libUtil.join('', '../b'), '../b');
	  assert.equal(libUtil.join('.', '../b'), '../b');
	
	  assert.equal(libUtil.join('', '.'), '.');
	  assert.equal(libUtil.join('.', '.'), '.');
	  assert.equal(libUtil.join('', './b'), 'b');
	  assert.equal(libUtil.join('.', './b'), 'b');
	
	  assert.equal(libUtil.join('', 'http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('.', 'http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('', 'data:foo,bar'), 'data:foo,bar');
	  assert.equal(libUtil.join('.', 'data:foo,bar'), 'data:foo,bar');
	
	
	  assert.equal(libUtil.join('..', 'b'), '../b');
	  assert.equal(libUtil.join('..', 'b/'), '../b/');
	  assert.equal(libUtil.join('..', 'b//'), '../b/');
	
	  assert.equal(libUtil.join('..', '..'), '../..');
	  assert.equal(libUtil.join('..', '../b'), '../../b');
	
	  assert.equal(libUtil.join('..', '.'), '..');
	  assert.equal(libUtil.join('..', './b'), '../b');
	
	  assert.equal(libUtil.join('..', 'http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('..', 'data:foo,bar'), 'data:foo,bar');
	
	
	  assert.equal(libUtil.join('a', ''), 'a');
	  assert.equal(libUtil.join('a', '.'), 'a');
	  assert.equal(libUtil.join('a/', ''), 'a');
	  assert.equal(libUtil.join('a/', '.'), 'a');
	  assert.equal(libUtil.join('a//', ''), 'a');
	  assert.equal(libUtil.join('a//', '.'), 'a');
	  assert.equal(libUtil.join('/a', ''), '/a');
	  assert.equal(libUtil.join('/a', '.'), '/a');
	  assert.equal(libUtil.join('', ''), '.');
	  assert.equal(libUtil.join('.', ''), '.');
	  assert.equal(libUtil.join('.', ''), '.');
	  assert.equal(libUtil.join('.', '.'), '.');
	  assert.equal(libUtil.join('..', ''), '..');
	  assert.equal(libUtil.join('..', '.'), '..');
	  assert.equal(libUtil.join('http://foo.org/a', ''), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a', '.'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a/', ''), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a/', '.'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a//', ''), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a//', '.'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org', ''), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org', '.'), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org/', ''), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org/', '.'), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org//', ''), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org//', '.'), 'http://foo.org/');
	  assert.equal(libUtil.join('//www.example.com', ''), '//www.example.com/');
	  assert.equal(libUtil.join('//www.example.com', '.'), '//www.example.com/');
	
	
	  assert.equal(libUtil.join('http://foo.org/a', 'b'), 'http://foo.org/a/b');
	  assert.equal(libUtil.join('http://foo.org/a/', 'b'), 'http://foo.org/a/b');
	  assert.equal(libUtil.join('http://foo.org/a//', 'b'), 'http://foo.org/a/b');
	  assert.equal(libUtil.join('http://foo.org/a', 'b/'), 'http://foo.org/a/b/');
	  assert.equal(libUtil.join('http://foo.org/a', 'b//'), 'http://foo.org/a/b/');
	  assert.equal(libUtil.join('http://foo.org/a/', '/b'), 'http://foo.org/b');
	  assert.equal(libUtil.join('http://foo.org/a//', '//b'), 'http://b');
	
	  assert.equal(libUtil.join('http://foo.org/a', '..'), 'http://foo.org/');
	  assert.equal(libUtil.join('http://foo.org/a', '../b'), 'http://foo.org/b');
	  assert.equal(libUtil.join('http://foo.org/a/b', '../c'), 'http://foo.org/a/c');
	
	  assert.equal(libUtil.join('http://foo.org/a', '.'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/a', './b'), 'http://foo.org/a/b');
	  assert.equal(libUtil.join('http://foo.org/a/b', './c'), 'http://foo.org/a/b/c');
	
	  assert.equal(libUtil.join('http://foo.org/a', 'http://www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('http://foo.org/a', 'data:foo,bar'), 'data:foo,bar');
	
	
	  assert.equal(libUtil.join('http://foo.org', 'a'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/', 'a'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org//', 'a'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org', '/a'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org/', '/a'), 'http://foo.org/a');
	  assert.equal(libUtil.join('http://foo.org//', '/a'), 'http://foo.org/a');
	
	
	  assert.equal(libUtil.join('http://', 'www.example.com'), 'http://www.example.com');
	  assert.equal(libUtil.join('file:///', 'www.example.com'), 'file:///www.example.com');
	  assert.equal(libUtil.join('http://', 'ftp://example.com'), 'ftp://example.com');
	
	  assert.equal(libUtil.join('http://www.example.com', '//foo.org/bar'), 'http://foo.org/bar');
	  assert.equal(libUtil.join('//www.example.com', '//foo.org/bar'), '//foo.org/bar');
	};
	
	// TODO Issue #128: Define and test this function properly.
	exports['test relative()'] = function (assert) {
	  assert.equal(libUtil.relative('/the/root', '/the/root/one.js'), 'one.js');
	  assert.equal(libUtil.relative('http://the/root', 'http://the/root/one.js'), 'one.js');
	  assert.equal(libUtil.relative('/the/root', '/the/rootone.js'), '../rootone.js');
	  assert.equal(libUtil.relative('http://the/root', 'http://the/rootone.js'), '../rootone.js');
	  assert.equal(libUtil.relative('/the/root', '/therootone.js'), '/therootone.js');
	  assert.equal(libUtil.relative('http://the/root', '/therootone.js'), '/therootone.js');
	
	  assert.equal(libUtil.relative('', '/the/root/one.js'), '/the/root/one.js');
	  assert.equal(libUtil.relative('.', '/the/root/one.js'), '/the/root/one.js');
	  assert.equal(libUtil.relative('', 'the/root/one.js'), 'the/root/one.js');
	  assert.equal(libUtil.relative('.', 'the/root/one.js'), 'the/root/one.js');
	
	  assert.equal(libUtil.relative('/', '/the/root/one.js'), 'the/root/one.js');
	  assert.equal(libUtil.relative('/', 'the/root/one.js'), 'the/root/one.js');
	};
	
	exports['test computeSourceURL'] = function (assert) {
	  // Tests with sourceMapURL.
	  assert.equal(libUtil.computeSourceURL('', 'src/test.js', 'http://example.com'),
	               'http://example.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL(undefined, 'src/test.js', 'http://example.com'),
	               'http://example.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL('src', 'test.js', 'http://example.com'),
	               'http://example.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL('src/', 'test.js', 'http://example.com'),
	               'http://example.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL('src', '/test.js', 'http://example.com'),
	               'http://example.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL('http://mozilla.com', 'src/test.js', 'http://example.com'),
	               'http://mozilla.com/src/test.js');
	  assert.equal(libUtil.computeSourceURL('', 'test.js', 'http://example.com/src/test.js.map'),
	               'http://example.com/src/test.js');
	
	  // Legacy code won't pass in the sourceMapURL.
	  assert.equal(libUtil.computeSourceURL('', 'src/test.js'), 'src/test.js');
	  assert.equal(libUtil.computeSourceURL(undefined, 'src/test.js'), 'src/test.js');
	  assert.equal(libUtil.computeSourceURL('src', 'test.js'), 'src/test.js');
	  assert.equal(libUtil.computeSourceURL('src/', 'test.js'), 'src/test.js');
	  assert.equal(libUtil.computeSourceURL('src', '/test.js'), 'src/test.js');
	  assert.equal(libUtil.computeSourceURL('src', '../test.js'), 'test.js');
	  assert.equal(libUtil.computeSourceURL('src/dir', '../././../test.js'), 'test.js');
	
	  // This gives different results with the old algorithm and the new
	  // spec-compliant algorithm.
	  assert.equal(libUtil.computeSourceURL('http://example.com/dir', '/test.js'),
	               'http://example.com/dir/test.js');
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	
	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;
	
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	
	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;
	
	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;
	
	var MAX_CACHED_INPUTS = 32;
	
	/**
	 * Takes some function `f(input) -> result` and returns a memoized version of
	 * `f`.
	 *
	 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	 * memoization is a dumb-simple, linear least-recently-used cache.
	 */
	function lruMemoize(f) {
	  var cache = [];
	
	  return function(input) {
	    for (var i = 0; i < cache.length; i++) {
	      if (cache[i].input === input) {
	        var temp = cache[0];
	        cache[0] = cache[i];
	        cache[i] = temp;
	        return cache[0].result;
	      }
	    }
	
	    var result = f(input);
	
	    cache.unshift({
	      input,
	      result,
	    });
	
	    if (cache.length > MAX_CACHED_INPUTS) {
	      cache.pop();
	    }
	
	    return result;
	  };
	}
	
	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	var normalize = lruMemoize(function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);
	  // Split the path into parts between `/` characters. This is much faster than
	  // using `.split(/\/+/g)`.
	  var parts = [];
	  var start = 0;
	  var i = 0;
	  while (true) {
	    start = i;
	    i = path.indexOf("/", start);
	    if (i === -1) {
	      parts.push(path.slice(start));
	      break;
	    } else {
	      parts.push(path.slice(start, i));
	      while (i < path.length && path[i] === "/") {
	        i++;
	      }
	    }
	  }
	
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');
	
	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }
	
	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	});
	exports.normalize = normalize;
	
	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }
	
	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }
	
	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }
	
	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }
	
	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
	
	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;
	
	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
	};
	
	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	
	  aRoot = aRoot.replace(/\/$/, '');
	
	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }
	
	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }
	
	    ++level;
	  }
	
	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	
	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());
	
	function identity (s) {
	  return s;
	}
	
	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }
	
	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	
	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }
	
	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	
	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }
	
	  var length = s.length;
	
	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }
	
	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }
	
	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	
	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }
	
	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }
	
	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	
	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }
	
	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }
	
	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }
	
	  if (aStr1 > aStr2) {
	    return 1;
	  }
	
	  return -1;
	}
	
	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareMappings(a, b) {
	  var cmp = a.generatedLine - b.generatedLine;
	  if (cmp != 0) return cmp;
	
	  cmp = a.generatedColumn - b.generatedColumn;
	  if (cmp != 0) return cmp;
	
	  cmp = strcmp(a.source, b.source);
	  if (cmp != 0) return cmp;
	
	  cmp = a.originalLine - b.originalLine;
	  if (cmp != 0) return cmp;
	
	  cmp = a.originalColumn - b.originalColumn;
	  if (cmp != 0) return cmp;
	
	  return strcmp(a.name, b.name);
	}
	exports.compareMappings = compareMappings;
	
	/**
	 * Test two mappings for equality.
	 */
	function areEqualMappings(a, b) {
	    return (
	      // sorted by selectivity
	      a.generatedColumn == b.generatedColumn &&
	      a.originalColumn == b.originalColumn &&
	      a.name == b.name &&
	      a.generatedLine == b.generatedLine &&
	      a.originalLine == b.originalLine &&
	      a.source == b.source
	    );
	}
	exports.areEqualMappings = areEqualMappings;
	
	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	
	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';
	
	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }
	
	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    var parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error("sourceMapURL could not be parsed");
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      var index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }
	
	  return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWM4YjdhYTg3ZjU0OTI3ZjY1NGMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLGlCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pRQSxpQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWE7QUFDYjs7QUFFQTtBQUNBLGVBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdF91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWM4YjdhYTg3ZjU0OTI3ZjY1NGMiLCIvKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTQgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5cbnZhciBsaWJVdGlsID0gcmVxdWlyZSgnLi4vbGliL3V0aWwnKTtcblxuZXhwb3J0c1sndGVzdCB1cmxzJ10gPSBmdW5jdGlvbiAoYXNzZXJ0KSB7XG4gIHZhciBhc3NlcnRVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHVybCwgbGliVXRpbC51cmxHZW5lcmF0ZShsaWJVdGlsLnVybFBhcnNlKHVybCkpKTtcbiAgfTtcbiAgYXNzZXJ0VXJsKCdodHRwOi8vJyk7XG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xuICBhc3NlcnRVcmwoJ2h0dHA6Ly91c2VyOnBhc3NAd3d3LmV4YW1wbGUuY29tJyk7XG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbTo4MCcpO1xuICBhc3NlcnRVcmwoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vJyk7XG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbS9mb28vYmFyJyk7XG4gIGFzc2VydFVybCgnaHR0cDovL3d3dy5leGFtcGxlLmNvbS9mb28vYmFyLycpO1xuICBhc3NlcnRVcmwoJ2h0dHA6Ly91c2VyOnBhc3NAd3d3LmV4YW1wbGUuY29tOjgwL2Zvby9iYXIvJyk7XG5cbiAgYXNzZXJ0VXJsKCcvLycpO1xuICBhc3NlcnRVcmwoJy8vd3d3LmV4YW1wbGUuY29tJyk7XG4gIGFzc2VydFVybCgnZmlsZTovLy93d3cuZXhhbXBsZS5jb20nKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnJyksIG51bGwpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnLicpLCBudWxsKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJy4uJyksIG51bGwpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC51cmxQYXJzZSgnYScpLCBudWxsKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2EvYicpLCBudWxsKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2EvL2InKSwgbnVsbCk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnVybFBhcnNlKCcvYScpLCBudWxsKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwudXJsUGFyc2UoJ2RhdGE6Zm9vLGJhcicpLCBudWxsKTtcblxuICB2YXIgcGFyc2VkID0gbGliVXRpbC51cmxQYXJzZSgnaHR0cDovL3gteS5jb20vYmFyJyk7XG4gIGFzc2VydC5lcXVhbChwYXJzZWQuc2NoZW1lLCAnaHR0cCcpO1xuICBhc3NlcnQuZXF1YWwocGFyc2VkLmhvc3QsICd4LXkuY29tJyk7XG4gIGFzc2VydC5lcXVhbChwYXJzZWQucGF0aCwgJy9iYXInKTtcblxuICB2YXIgd2VicGFja1VSTCA9ICd3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY3ZTE4NGY5Njc5NzMzMjk4ZDQ0J1xuICBwYXJzZWQgPSBsaWJVdGlsLnVybFBhcnNlKHdlYnBhY2tVUkwpO1xuICBhc3NlcnQuZXF1YWwocGFyc2VkLnNjaGVtZSwgJ3dlYnBhY2snKTtcbiAgYXNzZXJ0LmVxdWFsKHBhcnNlZC5ob3N0LCAnJyk7XG4gIGFzc2VydC5lcXVhbChwYXJzZWQucGF0aCwgJy93ZWJwYWNrL2Jvb3RzdHJhcCA2N2UxODRmOTY3OTczMzI5OGQ0NCcpO1xuICBhc3NlcnQuZXF1YWwod2VicGFja1VSTCwgbGliVXRpbC51cmxHZW5lcmF0ZShwYXJzZWQpKTtcbn07XG5cbmV4cG9ydHNbJ3Rlc3Qgbm9ybWFsaXplKCknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi4nKSwgJy8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi4vJyksICcvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4uLy4uLy4uLy4uJyksICcvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4uLy4uLy4uLy4uL2EvYi9jJyksICcvYS9iL2MnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvYS9iL2MvLi4vLi4vLi4vZC8uLi8uLi9lJyksICcvZScpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi4nKSwgJy4uJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi4vJyksICcuLi8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLi8uLi9hLycpLCAnLi4vLi4vYS8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdhLy4uJyksICcuJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS8uLi8uLi8uLicpLCAnLi4vLi4nKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy8uJyksICcvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4vJyksICcvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy4vLi8uLy4nKSwgJy8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvLi8uLy4vLi9hL2IvYycpLCAnL2EvYi9jJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnL2EvYi9jLy4vLi8uL2QvLi8uL2UnKSwgJy9hL2IvYy9kL2UnKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJycpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4nKSwgJy4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcuLycpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJy4vLi9hJyksICdhJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnYS8uLycpLCAnYS8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdhLy4vLi8uJyksICdhJyk7XG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCcvYS9iLy9jLy8vL2QvLy8vLycpLCAnL2EvYi9jL2QvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLy8vYS9iLy9jLy8vL2QvLy8vLycpLCAnLy8vYS9iL2MvZC8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdhL2IvL2MvLy8vZCcpLCAnYS9iL2MvZCcpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLm5vcm1hbGl6ZSgnLi8vLy4uLy4vLi4vYS9iLy8uLy4uJyksICcuLi8uLi9hJylcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5ub3JtYWxpemUoJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tLycpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbS8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwubm9ybWFsaXplKCdodHRwOi8vd3d3LmV4YW1wbGUuY29tLy4vLi4vL2EvYi9jLy4uLy4vZC8vJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tL2EvYi9kLycpO1xufTtcblxuZXhwb3J0c1sndGVzdCBqb2luKCknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdiJyksICdhL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnYicpLCAnYS9iJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvLycsICdiJyksICdhL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdiLycpLCAnYS9iLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJ2IvLycpLCAnYS9iLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLycsICcvYicpLCAnL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8vJywgJy8vYicpLCAnLy9iJyk7XG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICcuLicpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4uL2InKSwgJ2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS9iJywgJy4uL2MnKSwgJ2EvYycpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLicpLCAnYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhJywgJy4vYicpLCAnYS9iJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvYicsICcuL2MnKSwgJ2EvYi9jJyk7XG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYScsICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyksICdodHRwOi8vd3d3LmV4YW1wbGUuY29tJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcblxuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdiJyksICdiJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnYicpLCAnYicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnYi8nKSwgJ2IvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnYi8nKSwgJ2IvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICdiLy8nKSwgJ2IvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnYi8vJyksICdiLycpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuLicpLCAnLi4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuLicpLCAnLi4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJy4uL2InKSwgJy4uL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuLi9iJyksICcuLi9iJyk7XG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJy4nKSwgJy4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuJyksICcuJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJycsICcuL2InKSwgJ2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLicsICcuL2InKSwgJ2InKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcnLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJ2RhdGE6Zm9vLGJhcicpLCAnZGF0YTpmb28sYmFyJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4nLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcblxuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2InKSwgJy4uL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnYi8nKSwgJy4uL2IvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2IvLycpLCAnLi4vYi8nKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICcuLicpLCAnLi4vLi4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnLi4vYicpLCAnLi4vLi4vYicpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4nKSwgJy4uJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJy4vYicpLCAnLi4vYicpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy4uJywgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnZGF0YTpmb28sYmFyJyksICdkYXRhOmZvbyxiYXInKTtcblxuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnJyksICdhJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EnLCAnLicpLCAnYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLycsICcnKSwgJ2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignYS8nLCAnLicpLCAnYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdhLy8nLCAnJyksICdhJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2EvLycsICcuJyksICdhJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy9hJywgJycpLCAnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignL2EnLCAnLicpLCAnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignJywgJycpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJycpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJycpLCAnLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuJywgJy4nKSwgJy4nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignLi4nLCAnJyksICcuLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcuLicsICcuJyksICcuLicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJycpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8nLCAnJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8vJywgJycpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLy8nLCAnLicpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZycsICcnKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZycsICcuJyksICdodHRwOi8vZm9vLm9yZy8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvJywgJycpLCAnaHR0cDovL2Zvby5vcmcvJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLycsICcuJyksICdodHRwOi8vZm9vLm9yZy8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvLycsICcnKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8vJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvL3d3dy5leGFtcGxlLmNvbScsICcnKSwgJy8vd3d3LmV4YW1wbGUuY29tLycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCcvL3d3dy5leGFtcGxlLmNvbScsICcuJyksICcvL3d3dy5leGFtcGxlLmNvbS8nKTtcblxuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnYicpLCAnaHR0cDovL2Zvby5vcmcvYS9iJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvJywgJ2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hLy8nLCAnYicpLCAnaHR0cDovL2Zvby5vcmcvYS9iJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnYi8nKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYi8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICdiLy8nKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYi8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8nLCAnL2InKSwgJ2h0dHA6Ly9mb28ub3JnL2InKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYS8vJywgJy8vYicpLCAnaHR0cDovL2InKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4uJyksICdodHRwOi8vZm9vLm9yZy8nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuLi9iJyksICdodHRwOi8vZm9vLm9yZy9iJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EvYicsICcuLi9jJyksICdodHRwOi8vZm9vLm9yZy9hL2MnKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJy4nKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvYScsICcuL2InKSwgJ2h0dHA6Ly9mb28ub3JnL2EvYicpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hL2InLCAnLi9jJyksICdodHRwOi8vZm9vLm9yZy9hL2IvYycpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnL2EnLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpLCAnaHR0cDovL3d3dy5leGFtcGxlLmNvbScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy9hJywgJ2RhdGE6Zm9vLGJhcicpLCAnZGF0YTpmb28sYmFyJyk7XG5cblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZycsICdhJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLycsICdhJyksICdodHRwOi8vZm9vLm9yZy9hJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly9mb28ub3JnLy8nLCAnYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZycsICcvYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vZm9vLm9yZy8nLCAnL2EnKSwgJ2h0dHA6Ly9mb28ub3JnL2EnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovL2Zvby5vcmcvLycsICcvYScpLCAnaHR0cDovL2Zvby5vcmcvYScpO1xuXG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignaHR0cDovLycsICd3d3cuZXhhbXBsZS5jb20nKSwgJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuam9pbignZmlsZTovLy8nLCAnd3d3LmV4YW1wbGUuY29tJyksICdmaWxlOi8vL3d3dy5leGFtcGxlLmNvbScpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5qb2luKCdodHRwOi8vJywgJ2Z0cDovL2V4YW1wbGUuY29tJyksICdmdHA6Ly9leGFtcGxlLmNvbScpO1xuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJ2h0dHA6Ly93d3cuZXhhbXBsZS5jb20nLCAnLy9mb28ub3JnL2JhcicpLCAnaHR0cDovL2Zvby5vcmcvYmFyJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmpvaW4oJy8vd3d3LmV4YW1wbGUuY29tJywgJy8vZm9vLm9yZy9iYXInKSwgJy8vZm9vLm9yZy9iYXInKTtcbn07XG5cbi8vIFRPRE8gSXNzdWUgIzEyODogRGVmaW5lIGFuZCB0ZXN0IHRoaXMgZnVuY3Rpb24gcHJvcGVybHkuXG5leHBvcnRzWyd0ZXN0IHJlbGF0aXZlKCknXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy90aGUvcm9vdCcsICcvdGhlL3Jvb3Qvb25lLmpzJyksICdvbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJ2h0dHA6Ly90aGUvcm9vdCcsICdodHRwOi8vdGhlL3Jvb3Qvb25lLmpzJyksICdvbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy90aGUvcm9vdCcsICcvdGhlL3Jvb3RvbmUuanMnKSwgJy4uL3Jvb3RvbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJ2h0dHA6Ly90aGUvcm9vdCcsICdodHRwOi8vdGhlL3Jvb3RvbmUuanMnKSwgJy4uL3Jvb3RvbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy90aGUvcm9vdCcsICcvdGhlcm9vdG9uZS5qcycpLCAnL3RoZXJvb3RvbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJ2h0dHA6Ly90aGUvcm9vdCcsICcvdGhlcm9vdG9uZS5qcycpLCAnL3RoZXJvb3RvbmUuanMnKTtcblxuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnJywgJy90aGUvcm9vdC9vbmUuanMnKSwgJy90aGUvcm9vdC9vbmUuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy4nLCAnL3RoZS9yb290L29uZS5qcycpLCAnL3RoZS9yb290L29uZS5qcycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5yZWxhdGl2ZSgnJywgJ3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcuJywgJ3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XG5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwucmVsYXRpdmUoJy8nLCAnL3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLnJlbGF0aXZlKCcvJywgJ3RoZS9yb290L29uZS5qcycpLCAndGhlL3Jvb3Qvb25lLmpzJyk7XG59O1xuXG5leHBvcnRzWyd0ZXN0IGNvbXB1dGVTb3VyY2VVUkwnXSA9IGZ1bmN0aW9uIChhc3NlcnQpIHtcbiAgLy8gVGVzdHMgd2l0aCBzb3VyY2VNYXBVUkwuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJycsICdzcmMvdGVzdC5qcycsICdodHRwOi8vZXhhbXBsZS5jb20nKSxcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCh1bmRlZmluZWQsICdzcmMvdGVzdC5qcycsICdodHRwOi8vZXhhbXBsZS5jb20nKSxcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJ3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXG4gICAgICAgICAgICAgICAnaHR0cDovL2V4YW1wbGUuY29tL3NyYy90ZXN0LmpzJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYy8nLCAndGVzdC5qcycsICdodHRwOi8vZXhhbXBsZS5jb20nKSxcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJy90ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbScpLFxuICAgICAgICAgICAgICAgJ2h0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qcycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdodHRwOi8vbW96aWxsYS5jb20nLCAnc3JjL3Rlc3QuanMnLCAnaHR0cDovL2V4YW1wbGUuY29tJyksXG4gICAgICAgICAgICAgICAnaHR0cDovL21vemlsbGEuY29tL3NyYy90ZXN0LmpzJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJycsICd0ZXN0LmpzJywgJ2h0dHA6Ly9leGFtcGxlLmNvbS9zcmMvdGVzdC5qcy5tYXAnKSxcbiAgICAgICAgICAgICAgICdodHRwOi8vZXhhbXBsZS5jb20vc3JjL3Rlc3QuanMnKTtcblxuICAvLyBMZWdhY3kgY29kZSB3b24ndCBwYXNzIGluIHRoZSBzb3VyY2VNYXBVUkwuXG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJycsICdzcmMvdGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCh1bmRlZmluZWQsICdzcmMvdGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJ3Rlc3QuanMnKSwgJ3NyYy90ZXN0LmpzJyk7XG4gIGFzc2VydC5lcXVhbChsaWJVdGlsLmNvbXB1dGVTb3VyY2VVUkwoJ3NyYy8nLCAndGVzdC5qcycpLCAnc3JjL3Rlc3QuanMnKTtcbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnc3JjJywgJy90ZXN0LmpzJyksICdzcmMvdGVzdC5qcycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMnLCAnLi4vdGVzdC5qcycpLCAndGVzdC5qcycpO1xuICBhc3NlcnQuZXF1YWwobGliVXRpbC5jb21wdXRlU291cmNlVVJMKCdzcmMvZGlyJywgJy4uLy4vLi8uLi90ZXN0LmpzJyksICd0ZXN0LmpzJyk7XG5cbiAgLy8gVGhpcyBnaXZlcyBkaWZmZXJlbnQgcmVzdWx0cyB3aXRoIHRoZSBvbGQgYWxnb3JpdGhtIGFuZCB0aGUgbmV3XG4gIC8vIHNwZWMtY29tcGxpYW50IGFsZ29yaXRobS5cbiAgYXNzZXJ0LmVxdWFsKGxpYlV0aWwuY29tcHV0ZVNvdXJjZVVSTCgnaHR0cDovL2V4YW1wbGUuY29tL2RpcicsICcvdGVzdC5qcycpLFxuICAgICAgICAgICAgICAgJ2h0dHA6Ly9leGFtcGxlLmNvbS9kaXIvdGVzdC5qcycpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVzdC90ZXN0LXV0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogLSotIE1vZGU6IGpzOyBqcy1pbmRlbnQtbGV2ZWw6IDI7IC0qLSAqL1xuLypcbiAqIENvcHlyaWdodCAyMDExIE1vemlsbGEgRm91bmRhdGlvbiBhbmQgY29udHJpYnV0b3JzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBsaWNlbnNlLiBTZWUgTElDRU5TRSBvcjpcbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2VcbiAqL1xuXG4vKipcbiAqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24gZm9yIGdldHRpbmcgdmFsdWVzIGZyb20gcGFyYW1ldGVyL29wdGlvbnNcbiAqIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIGFyZ3MgVGhlIG9iamVjdCB3ZSBhcmUgZXh0cmFjdGluZyB2YWx1ZXMgZnJvbVxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIGFyZSBnZXR0aW5nLlxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSBBbiBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gaWYgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmdcbiAqIGZyb20gdGhlIG9iamVjdC4gSWYgdGhpcyBpcyBub3Qgc3BlY2lmaWVkIGFuZCB0aGUgcHJvcGVydHkgaXMgbWlzc2luZywgYW5cbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICovXG5mdW5jdGlvbiBnZXRBcmcoYUFyZ3MsIGFOYW1lLCBhRGVmYXVsdFZhbHVlKSB7XG4gIGlmIChhTmFtZSBpbiBhQXJncykge1xuICAgIHJldHVybiBhQXJnc1thTmFtZV07XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIHJldHVybiBhRGVmYXVsdFZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignXCInICsgYU5hbWUgKyAnXCIgaXMgYSByZXF1aXJlZCBhcmd1bWVudC4nKTtcbiAgfVxufVxuZXhwb3J0cy5nZXRBcmcgPSBnZXRBcmc7XG5cbnZhciB1cmxSZWdleHAgPSAvXig/OihbXFx3K1xcLS5dKyk6KT9cXC9cXC8oPzooXFx3KzpcXHcrKUApPyhbXFx3Li1dKikoPzo6KFxcZCspKT8oLiopJC87XG52YXIgZGF0YVVybFJlZ2V4cCA9IC9eZGF0YTouK1xcLC4rJC87XG5cbmZ1bmN0aW9uIHVybFBhcnNlKGFVcmwpIHtcbiAgdmFyIG1hdGNoID0gYVVybC5tYXRjaCh1cmxSZWdleHApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzY2hlbWU6IG1hdGNoWzFdLFxuICAgIGF1dGg6IG1hdGNoWzJdLFxuICAgIGhvc3Q6IG1hdGNoWzNdLFxuICAgIHBvcnQ6IG1hdGNoWzRdLFxuICAgIHBhdGg6IG1hdGNoWzVdXG4gIH07XG59XG5leHBvcnRzLnVybFBhcnNlID0gdXJsUGFyc2U7XG5cbmZ1bmN0aW9uIHVybEdlbmVyYXRlKGFQYXJzZWRVcmwpIHtcbiAgdmFyIHVybCA9ICcnO1xuICBpZiAoYVBhcnNlZFVybC5zY2hlbWUpIHtcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5zY2hlbWUgKyAnOic7XG4gIH1cbiAgdXJsICs9ICcvLyc7XG4gIGlmIChhUGFyc2VkVXJsLmF1dGgpIHtcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5hdXRoICsgJ0AnO1xuICB9XG4gIGlmIChhUGFyc2VkVXJsLmhvc3QpIHtcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5ob3N0O1xuICB9XG4gIGlmIChhUGFyc2VkVXJsLnBvcnQpIHtcbiAgICB1cmwgKz0gXCI6XCIgKyBhUGFyc2VkVXJsLnBvcnRcbiAgfVxuICBpZiAoYVBhcnNlZFVybC5wYXRoKSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwucGF0aDtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuZXhwb3J0cy51cmxHZW5lcmF0ZSA9IHVybEdlbmVyYXRlO1xuXG52YXIgTUFYX0NBQ0hFRF9JTlBVVFMgPSAzMjtcblxuLyoqXG4gKiBUYWtlcyBzb21lIGZ1bmN0aW9uIGBmKGlucHV0KSAtPiByZXN1bHRgIGFuZCByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZlxuICogYGZgLlxuICpcbiAqIFdlIGtlZXAgYXQgbW9zdCBgTUFYX0NBQ0hFRF9JTlBVVFNgIG1lbW9pemVkIHJlc3VsdHMgb2YgYGZgIGFsaXZlLiBUaGVcbiAqIG1lbW9pemF0aW9uIGlzIGEgZHVtYi1zaW1wbGUsIGxpbmVhciBsZWFzdC1yZWNlbnRseS11c2VkIGNhY2hlLlxuICovXG5mdW5jdGlvbiBscnVNZW1vaXplKGYpIHtcbiAgdmFyIGNhY2hlID0gW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWNoZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNhY2hlW2ldLmlucHV0ID09PSBpbnB1dCkge1xuICAgICAgICB2YXIgdGVtcCA9IGNhY2hlWzBdO1xuICAgICAgICBjYWNoZVswXSA9IGNhY2hlW2ldO1xuICAgICAgICBjYWNoZVtpXSA9IHRlbXA7XG4gICAgICAgIHJldHVybiBjYWNoZVswXS5yZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGYoaW5wdXQpO1xuXG4gICAgY2FjaGUudW5zaGlmdCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlc3VsdCxcbiAgICB9KTtcblxuICAgIGlmIChjYWNoZS5sZW5ndGggPiBNQVhfQ0FDSEVEX0lOUFVUUykge1xuICAgICAgY2FjaGUucG9wKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgcGF0aCwgb3IgdGhlIHBhdGggcG9ydGlvbiBvZiBhIFVSTDpcbiAqXG4gKiAtIFJlcGxhY2VzIGNvbnNlY3V0aXZlIHNsYXNoZXMgd2l0aCBvbmUgc2xhc2guXG4gKiAtIFJlbW92ZXMgdW5uZWNlc3NhcnkgJy4nIHBhcnRzLlxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICc8ZGlyPi8uLicgcGFydHMuXG4gKlxuICogQmFzZWQgb24gY29kZSBpbiB0aGUgTm9kZS5qcyAncGF0aCcgY29yZSBtb2R1bGUuXG4gKlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIHVybCB0byBub3JtYWxpemUuXG4gKi9cbnZhciBub3JtYWxpemUgPSBscnVNZW1vaXplKGZ1bmN0aW9uIG5vcm1hbGl6ZShhUGF0aCkge1xuICB2YXIgcGF0aCA9IGFQYXRoO1xuICB2YXIgdXJsID0gdXJsUGFyc2UoYVBhdGgpO1xuICBpZiAodXJsKSB7XG4gICAgaWYgKCF1cmwucGF0aCkge1xuICAgICAgcmV0dXJuIGFQYXRoO1xuICAgIH1cbiAgICBwYXRoID0gdXJsLnBhdGg7XG4gIH1cbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCk7XG4gIC8vIFNwbGl0IHRoZSBwYXRoIGludG8gcGFydHMgYmV0d2VlbiBgL2AgY2hhcmFjdGVycy4gVGhpcyBpcyBtdWNoIGZhc3RlciB0aGFuXG4gIC8vIHVzaW5nIGAuc3BsaXQoL1xcLysvZylgLlxuICB2YXIgcGFydHMgPSBbXTtcbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN0YXJ0ID0gaTtcbiAgICBpID0gcGF0aC5pbmRleE9mKFwiL1wiLCBzdGFydCk7XG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQpKTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0cy5wdXNoKHBhdGguc2xpY2Uoc3RhcnQsIGkpKTtcbiAgICAgIHdoaWxlIChpIDwgcGF0aC5sZW5ndGggJiYgcGF0aFtpXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIHBhcnQsIHVwID0gMCwgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgcGFydCA9IHBhcnRzW2ldO1xuICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKHBhcnQgPT09ICcuLicpIHtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCA+IDApIHtcbiAgICAgIGlmIChwYXJ0ID09PSAnJykge1xuICAgICAgICAvLyBUaGUgZmlyc3QgcGFydCBpcyBibGFuayBpZiB0aGUgcGF0aCBpcyBhYnNvbHV0ZS4gVHJ5aW5nIHRvIGdvXG4gICAgICAgIC8vIGFib3ZlIHRoZSByb290IGlzIGEgbm8tb3AuIFRoZXJlZm9yZSB3ZSBjYW4gcmVtb3ZlIGFsbCAnLi4nIHBhcnRzXG4gICAgICAgIC8vIGRpcmVjdGx5IGFmdGVyIHRoZSByb290LlxuICAgICAgICBwYXJ0cy5zcGxpY2UoaSArIDEsIHVwKTtcbiAgICAgICAgdXAgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMuc3BsaWNlKGksIDIpO1xuICAgICAgICB1cC0tO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwYXRoID0gcGFydHMuam9pbignLycpO1xuXG4gIGlmIChwYXRoID09PSAnJykge1xuICAgIHBhdGggPSBpc0Fic29sdXRlID8gJy8nIDogJy4nO1xuICB9XG5cbiAgaWYgKHVybCkge1xuICAgIHVybC5wYXRoID0gcGF0aDtcbiAgICByZXR1cm4gdXJsR2VuZXJhdGUodXJsKTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn0pO1xuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XG5cbi8qKlxuICogSm9pbnMgdHdvIHBhdGhzL1VSTHMuXG4gKlxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBqb2luZWQgd2l0aCB0aGUgcm9vdC5cbiAqXG4gKiAtIElmIGFQYXRoIGlzIGEgVVJMIG9yIGEgZGF0YSBVUkksIGFQYXRoIGlzIHJldHVybmVkLCB1bmxlc3MgYVBhdGggaXMgYVxuICogICBzY2hlbWUtcmVsYXRpdmUgVVJMOiBUaGVuIHRoZSBzY2hlbWUgb2YgYVJvb3QsIGlmIGFueSwgaXMgcHJlcGVuZGVkXG4gKiAgIGZpcnN0LlxuICogLSBPdGhlcndpc2UgYVBhdGggaXMgYSBwYXRoLiBJZiBhUm9vdCBpcyBhIFVSTCwgdGhlbiBpdHMgcGF0aCBwb3J0aW9uXG4gKiAgIGlzIHVwZGF0ZWQgd2l0aCB0aGUgcmVzdWx0IGFuZCBhUm9vdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlIHRoZSByZXN1bHRcbiAqICAgaXMgcmV0dXJuZWQuXG4gKiAgIC0gSWYgYVBhdGggaXMgYWJzb2x1dGUsIHRoZSByZXN1bHQgaXMgYVBhdGguXG4gKiAgIC0gT3RoZXJ3aXNlIHRoZSB0d28gcGF0aHMgYXJlIGpvaW5lZCB3aXRoIGEgc2xhc2guXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cbiAqL1xuZnVuY3Rpb24gam9pbihhUm9vdCwgYVBhdGgpIHtcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XG4gICAgYVJvb3QgPSBcIi5cIjtcbiAgfVxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcbiAgICBhUGF0aCA9IFwiLlwiO1xuICB9XG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcbiAgdmFyIGFSb290VXJsID0gdXJsUGFyc2UoYVJvb3QpO1xuICBpZiAoYVJvb3RVcmwpIHtcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgJy8nO1xuICB9XG5cbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcbiAgaWYgKGFQYXRoVXJsICYmICFhUGF0aFVybC5zY2hlbWUpIHtcbiAgICBpZiAoYVJvb3RVcmwpIHtcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcbiAgICB9XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFQYXRoVXJsKTtcbiAgfVxuXG4gIGlmIChhUGF0aFVybCB8fCBhUGF0aC5tYXRjaChkYXRhVXJsUmVnZXhwKSkge1xuICAgIHJldHVybiBhUGF0aDtcbiAgfVxuXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxuICBpZiAoYVJvb3RVcmwgJiYgIWFSb290VXJsLmhvc3QgJiYgIWFSb290VXJsLnBhdGgpIHtcbiAgICBhUm9vdFVybC5ob3N0ID0gYVBhdGg7XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcbiAgfVxuXG4gIHZhciBqb2luZWQgPSBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJ1xuICAgID8gYVBhdGhcbiAgICA6IG5vcm1hbGl6ZShhUm9vdC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIGFQYXRoKTtcblxuICBpZiAoYVJvb3RVcmwpIHtcbiAgICBhUm9vdFVybC5wYXRoID0gam9pbmVkO1xuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XG4gIH1cbiAgcmV0dXJuIGpvaW5lZDtcbn1cbmV4cG9ydHMuam9pbiA9IGpvaW47XG5cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uIChhUGF0aCkge1xuICByZXR1cm4gYVBhdGguY2hhckF0KDApID09PSAnLycgfHwgdXJsUmVnZXhwLnRlc3QoYVBhdGgpO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgcGF0aCByZWxhdGl2ZSB0byBhIFVSTCBvciBhbm90aGVyIHBhdGguXG4gKlxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBtYWRlIHJlbGF0aXZlIHRvIGFSb290LlxuICovXG5mdW5jdGlvbiByZWxhdGl2ZShhUm9vdCwgYVBhdGgpIHtcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XG4gICAgYVJvb3QgPSBcIi5cIjtcbiAgfVxuXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sICcnKTtcblxuICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHBhdGggdG8gYmUgYWJvdmUgdGhlIHJvb3QuIEluIHRoaXMgY2FzZSwgc2ltcGx5XG4gIC8vIGNoZWNraW5nIHdoZXRoZXIgdGhlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlIHBhdGggd29uJ3Qgd29yay4gSW5zdGVhZCwgd2VcbiAgLy8gbmVlZCB0byByZW1vdmUgY29tcG9uZW50cyBmcm9tIHRoZSByb290IG9uZSBieSBvbmUsIHVudGlsIGVpdGhlciB3ZSBmaW5kXG4gIC8vIGEgcHJlZml4IHRoYXQgZml0cywgb3Igd2UgcnVuIG91dCBvZiBjb21wb25lbnRzIHRvIHJlbW92ZS5cbiAgdmFyIGxldmVsID0gMDtcbiAgd2hpbGUgKGFQYXRoLmluZGV4T2YoYVJvb3QgKyAnLycpICE9PSAwKSB7XG4gICAgdmFyIGluZGV4ID0gYVJvb3QubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBhUGF0aDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgb25seSBwYXJ0IG9mIHRoZSByb290IHRoYXQgaXMgbGVmdCBpcyB0aGUgc2NoZW1lIChpLmUuIGh0dHA6Ly8sXG4gICAgLy8gZmlsZTovLy8sIGV0Yy4pLCBvbmUgb3IgbW9yZSBzbGFzaGVzICgvKSwgb3Igc2ltcGx5IG5vdGhpbmcgYXQgYWxsLCB3ZVxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXG4gICAgYVJvb3QgPSBhUm9vdC5zbGljZSgwLCBpbmRleCk7XG4gICAgaWYgKGFSb290Lm1hdGNoKC9eKFteXFwvXSs6XFwvKT9cXC8qJC8pKSB7XG4gICAgICByZXR1cm4gYVBhdGg7XG4gICAgfVxuXG4gICAgKytsZXZlbDtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXG4gIHJldHVybiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIuLi9cIikgKyBhUGF0aC5zdWJzdHIoYVJvb3QubGVuZ3RoICsgMSk7XG59XG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XG5cbnZhciBzdXBwb3J0c051bGxQcm90byA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gISgnX19wcm90b19fJyBpbiBvYmopO1xufSgpKTtcblxuZnVuY3Rpb24gaWRlbnRpdHkgKHMpIHtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxuICogaGF2ZSB0byBwcmVmaXggYWxsIHRoZSBzdHJpbmdzIGluIG91ciBzZXQgd2l0aCBhbiBhcmJpdHJhcnkgY2hhcmFjdGVyLlxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8zMFxuICpcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxuICovXG5mdW5jdGlvbiB0b1NldFN0cmluZyhhU3RyKSB7XG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XG4gICAgcmV0dXJuICckJyArIGFTdHI7XG4gIH1cblxuICByZXR1cm4gYVN0cjtcbn1cbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XG5cbmZ1bmN0aW9uIGZyb21TZXRTdHJpbmcoYVN0cikge1xuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xuICAgIHJldHVybiBhU3RyLnNsaWNlKDEpO1xuICB9XG5cbiAgcmV0dXJuIGFTdHI7XG59XG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcblxuZnVuY3Rpb24gaXNQcm90b1N0cmluZyhzKSB7XG4gIGlmICghcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSkgIT09IDk1ICAvKiAnXycgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAyKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDMpICE9PSAxMTEgLyogJ28nICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNCkgIT09IDExNiAvKiAndCcgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA1KSAhPT0gMTExIC8qICdvJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDYpICE9PSAxMTQgLyogJ3InICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNykgIT09IDExMiAvKiAncCcgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA4KSAhPT0gOTUgIC8qICdfJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAgLyogJ18nICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDEwOyBpID49IDA7IGktLSkge1xuICAgIGlmIChzLmNoYXJDb2RlQXQoaSkgIT09IDM2IC8qICckJyAqLykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2hlcmUgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKlxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4sIGJ1dCBkaWZmZXJlbnQgZ2VuZXJhdGVkXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxuICogc3R1YmJlZCBvdXQgbWFwcGluZy5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XG4gIHZhciBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XG59XG5leHBvcnRzLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zID0gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnM7XG5cbi8qKlxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGRlZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBpbmRpY2VzIHdoZXJlXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKlxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uLCBidXQgZGlmZmVyZW50XG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxuICogbWFwcGluZyB3aXRoIGEgc3R1YmJlZCBvdXQgbWFwcGluZy5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcbn1cbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZDtcblxuZnVuY3Rpb24gc3RyY21wKGFTdHIxLCBhU3RyMikge1xuICBpZiAoYVN0cjEgPT09IGFTdHIyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoYVN0cjEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTsgLy8gYVN0cjIgIT09IG51bGxcbiAgfVxuXG4gIGlmIChhU3RyMiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAtMTsgLy8gYVN0cjEgIT09IG51bGxcbiAgfVxuXG4gIGlmIChhU3RyMSA+IGFTdHIyKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGluZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBzdHJpbmdzIHdoZXJlXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVNYXBwaW5ncyhhLCBiKSB7XG4gIHZhciBjbXAgPSBhLmdlbmVyYXRlZExpbmUgLSBiLmdlbmVyYXRlZExpbmU7XG4gIGlmIChjbXAgIT0gMCkgcmV0dXJuIGNtcDtcblxuICBjbXAgPSBhLmdlbmVyYXRlZENvbHVtbiAtIGIuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9IDApIHJldHVybiBjbXA7XG5cbiAgY21wID0gc3RyY21wKGEuc291cmNlLCBiLnNvdXJjZSk7XG4gIGlmIChjbXAgIT0gMCkgcmV0dXJuIGNtcDtcblxuICBjbXAgPSBhLm9yaWdpbmFsTGluZSAtIGIub3JpZ2luYWxMaW5lO1xuICBpZiAoY21wICE9IDApIHJldHVybiBjbXA7XG5cbiAgY21wID0gYS5vcmlnaW5hbENvbHVtbiAtIGIub3JpZ2luYWxDb2x1bW47XG4gIGlmIChjbXAgIT0gMCkgcmV0dXJuIGNtcDtcblxuICByZXR1cm4gc3RyY21wKGEubmFtZSwgYi5uYW1lKTtcbn1cbmV4cG9ydHMuY29tcGFyZU1hcHBpbmdzID0gY29tcGFyZU1hcHBpbmdzO1xuXG4vKipcbiAqIFRlc3QgdHdvIG1hcHBpbmdzIGZvciBlcXVhbGl0eS5cbiAqL1xuZnVuY3Rpb24gYXJlRXF1YWxNYXBwaW5ncyhhLCBiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHNvcnRlZCBieSBzZWxlY3Rpdml0eVxuICAgICAgYS5nZW5lcmF0ZWRDb2x1bW4gPT0gYi5nZW5lcmF0ZWRDb2x1bW4gJiZcbiAgICAgIGEub3JpZ2luYWxDb2x1bW4gPT0gYi5vcmlnaW5hbENvbHVtbiAmJlxuICAgICAgYS5uYW1lID09IGIubmFtZSAmJlxuICAgICAgYS5nZW5lcmF0ZWRMaW5lID09IGIuZ2VuZXJhdGVkTGluZSAmJlxuICAgICAgYS5vcmlnaW5hbExpbmUgPT0gYi5vcmlnaW5hbExpbmUgJiZcbiAgICAgIGEuc291cmNlID09IGIuc291cmNlXG4gICAgKTtcbn1cbmV4cG9ydHMuYXJlRXF1YWxNYXBwaW5ncyA9IGFyZUVxdWFsTWFwcGluZ3M7XG5cbi8qKlxuICogU3RyaXAgYW55IEpTT04gWFNTSSBhdm9pZGFuY2UgcHJlZml4IGZyb20gdGhlIHN0cmluZyAoYXMgZG9jdW1lbnRlZFxuICogaW4gdGhlIHNvdXJjZSBtYXBzIHNwZWNpZmljYXRpb24pLCBhbmQgdGhlbiBwYXJzZSB0aGUgc3RyaW5nIGFzXG4gKiBKU09OLlxuICovXG5mdW5jdGlvbiBwYXJzZVNvdXJjZU1hcElucHV0KHN0cikge1xuICByZXR1cm4gSlNPTi5wYXJzZShzdHIucmVwbGFjZSgvXlxcKV19J1teXFxuXSpcXG4vLCAnJykpO1xufVxuZXhwb3J0cy5wYXJzZVNvdXJjZU1hcElucHV0ID0gcGFyc2VTb3VyY2VNYXBJbnB1dDtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBVUkwgb2YgYSBzb3VyY2UgZ2l2ZW4gdGhlIHRoZSBzb3VyY2Ugcm9vdCwgdGhlIHNvdXJjZSdzXG4gKiBVUkwsIGFuZCB0aGUgc291cmNlIG1hcCdzIFVSTC5cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVNvdXJjZVVSTChzb3VyY2VSb290LCBzb3VyY2VVUkwsIHNvdXJjZU1hcFVSTCkge1xuICBzb3VyY2VVUkwgPSBzb3VyY2VVUkwgfHwgJyc7XG5cbiAgaWYgKHNvdXJjZVJvb3QpIHtcbiAgICAvLyBUaGlzIGZvbGxvd3Mgd2hhdCBDaHJvbWUgZG9lcy5cbiAgICBpZiAoc291cmNlUm9vdFtzb3VyY2VSb290Lmxlbmd0aCAtIDFdICE9PSAnLycgJiYgc291cmNlVVJMWzBdICE9PSAnLycpIHtcbiAgICAgIHNvdXJjZVJvb3QgKz0gJy8nO1xuICAgIH1cbiAgICAvLyBUaGUgc3BlYyBzYXlzOlxuICAgIC8vICAgTGluZSA0OiBBbiBvcHRpb25hbCBzb3VyY2Ugcm9vdCwgdXNlZnVsIGZvciByZWxvY2F0aW5nIHNvdXJjZVxuICAgIC8vICAgZmlsZXMgb24gYSBzZXJ2ZXIgb3IgcmVtb3ZpbmcgcmVwZWF0ZWQgdmFsdWVzIGluIHRoZVxuICAgIC8vICAg4oCcc291cmNlc+KAnSBlbnRyeS4gIFRoaXMgdmFsdWUgaXMgcHJlcGVuZGVkIHRvIHRoZSBpbmRpdmlkdWFsXG4gICAgLy8gICBlbnRyaWVzIGluIHRoZSDigJxzb3VyY2XigJ0gZmllbGQuXG4gICAgc291cmNlVVJMID0gc291cmNlUm9vdCArIHNvdXJjZVVSTDtcbiAgfVxuXG4gIC8vIEhpc3RvcmljYWxseSwgU291cmNlTWFwQ29uc3VtZXIgZGlkIG5vdCB0YWtlIHRoZSBzb3VyY2VNYXBVUkwgYXNcbiAgLy8gYSBwYXJhbWV0ZXIuICBUaGlzIG1vZGUgaXMgc3RpbGwgc29tZXdoYXQgc3VwcG9ydGVkLCB3aGljaCBpcyB3aHlcbiAgLy8gdGhpcyBjb2RlIGJsb2NrIGlzIGNvbmRpdGlvbmFsLiAgSG93ZXZlciwgaXQncyBwcmVmZXJhYmxlIHRvIHBhc3NcbiAgLy8gdGhlIHNvdXJjZSBtYXAgVVJMIHRvIFNvdXJjZU1hcENvbnN1bWVyLCBzbyB0aGF0IHRoaXMgZnVuY3Rpb25cbiAgLy8gY2FuIGltcGxlbWVudCB0aGUgc291cmNlIFVSTCByZXNvbHV0aW9uIGFsZ29yaXRobSBhcyBvdXRsaW5lZCBpblxuICAvLyB0aGUgc3BlYy4gIFRoaXMgYmxvY2sgaXMgYmFzaWNhbGx5IHRoZSBlcXVpdmFsZW50IG9mOlxuICAvLyAgICBuZXcgVVJMKHNvdXJjZVVSTCwgc291cmNlTWFwVVJMKS50b1N0cmluZygpXG4gIC8vIC4uLiBleGNlcHQgaXQgYXZvaWRzIHVzaW5nIFVSTCwgd2hpY2ggd2Fzbid0IGF2YWlsYWJsZSBpbiB0aGVcbiAgLy8gb2xkZXIgcmVsZWFzZXMgb2Ygbm9kZSBzdGlsbCBzdXBwb3J0ZWQgYnkgdGhpcyBsaWJyYXJ5LlxuICAvL1xuICAvLyBUaGUgc3BlYyBzYXlzOlxuICAvLyAgIElmIHRoZSBzb3VyY2VzIGFyZSBub3QgYWJzb2x1dGUgVVJMcyBhZnRlciBwcmVwZW5kaW5nIG9mIHRoZVxuICAvLyAgIOKAnHNvdXJjZVJvb3TigJ0sIHRoZSBzb3VyY2VzIGFyZSByZXNvbHZlZCByZWxhdGl2ZSB0byB0aGVcbiAgLy8gICBTb3VyY2VNYXAgKGxpa2UgcmVzb2x2aW5nIHNjcmlwdCBzcmMgaW4gYSBodG1sIGRvY3VtZW50KS5cbiAgaWYgKHNvdXJjZU1hcFVSTCkge1xuICAgIHZhciBwYXJzZWQgPSB1cmxQYXJzZShzb3VyY2VNYXBVUkwpO1xuICAgIGlmICghcGFyc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3VyY2VNYXBVUkwgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcbiAgICB9XG4gICAgaWYgKHBhcnNlZC5wYXRoKSB7XG4gICAgICAvLyBTdHJpcCB0aGUgbGFzdCBwYXRoIGNvbXBvbmVudCwgYnV0IGtlZXAgdGhlIFwiL1wiLlxuICAgICAgdmFyIGluZGV4ID0gcGFyc2VkLnBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHBhcnNlZC5wYXRoID0gcGFyc2VkLnBhdGguc3Vic3RyaW5nKDAsIGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZVVSTCA9IGpvaW4odXJsR2VuZXJhdGUocGFyc2VkKSwgc291cmNlVVJMKTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemUoc291cmNlVVJMKTtcbn1cbmV4cG9ydHMuY29tcHV0ZVNvdXJjZVVSTCA9IGNvbXB1dGVTb3VyY2VVUkw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=