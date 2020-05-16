function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

// 用a拼接obj里面的每对kv，并用b分割
var joinStr = function joinStr(obj, a, b) {
  return Object.keys(obj).reduce(function (acc, cur) {
    if (obj[cur]) return acc += "".concat(b).concat(cur).concat(a).concat(obj[cur]);
    return acc += "".concat(b).concat(cur);
  }, "").slice(1);
}; // 驼峰转中横线

var decamelize = function decamelize(str) {
  return str.replace(/\B([A-Z])/g, "-$1").toLowerCase();
};
var throwNoKeyError = function throwNoKeyError(error) {
  throw new Error(error);
};
var methods = "resize,blur,circle,crop,indexcrop,rotate,bright,contrast,sharpen,format,watermark,interlace,quality,roundedCorners,autoOrient".split(",");

var ZOssImage = function ZOssImage(originUrl) {
  this.originUrl = originUrl;
  this.methodKeys = {};
  methods.forEach(function (method) {
    ZOssImage.prototype[method] = function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwNoKeyError("\u65B9\u6CD5\uFF1A".concat(method, "\uFF0C\u9700\u8981\u81F3\u5C11\u4E00\u4E2A\u53C2\u6570"));
      var value = arguments.length > 1 ? arguments[1] : undefined;

      if (_typeof(key) === "object") {
        this.methodKeys[method] = key;
      } else {
        if (!this.methodKeys[method]) this.methodKeys[method] = {};
        this.methodKeys[method][key] = value;
      }

      return this;
    };
  });
};

Object.defineProperty(ZOssImage.prototype, "url", {
  get: function get() {
    var _this = this;

    var url = new URL(this.originUrl);
    var formatParams = Object.keys(this.methodKeys).reduce(function (acc, method) {
      var str = joinStr(_this.methodKeys[method], "_", ",");
      if (!str) return acc;
      return acc += "/".concat(decamelize(method), ",").concat(str);
    }, "");
    url.searchParams.set("x-oss-process", "image".concat(formatParams));
    return url.href;
  }
}); // 对外暴露方法

function zOssImage(url) {
  return new ZOssImage(url);
}

export default zOssImage;
