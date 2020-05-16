import { decamelize, joinStr, throwNoKeyError, methods } from "./utils";

const ZOssImage = function (originUrl) {
  this.originUrl = originUrl;
  this.methodKeys = {};
  methods.forEach((method) => {
    ZOssImage.prototype[method] = function (
      key = throwNoKeyError(`方法：${method}，需要至少一个参数`),
      value
    ) {
      if (typeof key === "object") {
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
  get() {
    const url = new URL(this.originUrl);
    const formatParams = Object.keys(this.methodKeys).reduce((acc, method) => {
      const str = joinStr(this.methodKeys[method], "_", ",");
      if (!str) return acc;
      return (acc += `/${decamelize(method)},${str}`);
    }, "");
    url.searchParams.set("x-oss-process", `image${formatParams}`);
    return url.href;
  },
});

// 对外暴露方法
export default function zOssImage(url) {
  return new ZOssImage(url);
}
