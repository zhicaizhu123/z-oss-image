import {
  MethodsType,
  OssResize,
  OssBlur,
  OssCircle,
  OssCrop,
  OssIndexcrop,
  OssRotate,
  OssBright,
  OssContrast,
  OssSharpen,
  OssFormat,
  OssAutoOrient,
  OssInterlace,
  OssQuality,
  OssRoundedCorners,
  OssWatermark,
  ApiHandler,
} from './types';
import { joinStr, methods, throwNoKeyError, dasherize } from './utils';

export class OssImage {
  /**
   * oss 图片设置的处理函数
   *
   * @private
   * @type {MethodsType[]}
   * @memberof OssImage
   */
  private methods = methods;

  resize!: ApiHandler<OssResize>;

  blur!: ApiHandler<OssBlur>;

  circle!: ApiHandler<OssCircle>;

  crop!: ApiHandler<OssCrop>;

  indexcrop!: ApiHandler<OssIndexcrop>;

  rotate!: ApiHandler<OssRotate>;

  bright!: ApiHandler<OssBright>;

  contrast!: ApiHandler<OssContrast>;

  sharpen!: ApiHandler<OssSharpen>;

  format!: ApiHandler<OssFormat>;

  watermark!: ApiHandler<OssWatermark>;

  interlace!: ApiHandler<OssInterlace>;

  quality!: ApiHandler<OssQuality>;

  roundedCorners!: ApiHandler<OssRoundedCorners>;

  autoOrient!: ApiHandler<OssAutoOrient>;

  private methodKeys: Record<string, any> = {};

  constructor(private originUrl: string) {
    this.originUrl = originUrl;

    this.methods.forEach((method: MethodsType) => {
      OssImage.prototype[method] = function (
        key: any = throwNoKeyError(`方法：${method}，需要至少一个参数`),
        value?: any,
      ) {
        if (typeof key === 'object') {
          this.methodKeys[method] = key;
        } else {
          if (!this.methodKeys[method]) this.methodKeys[method] = {};
          this.methodKeys[method][key] = value;
        }
        return this;
      };
    });
  }

  /**
   * 获取处理后的链接
   *
   * @readonly
   * @memberof OssImage
   */
  get url() {
    const url = new URL(this.originUrl);
    const formatParams = Object.keys(this.methodKeys).reduce((acc, method) => {
      const str = joinStr(this.methodKeys[method], '_', ',');
      if (!str) return acc;
      return (acc += `/${dasherize(method)},${str}`);
    }, '');
    url.searchParams.set('x-oss-process', `image${formatParams}`);
    return url.href;
  }
}

/**
 * 暴露处理方法
 * @example
 * ```
 * import ossImage from 'path/to/oss'
 * const url  = ossImage('xxx').quality({q: 50}).resize({w: 100, h: 100}).url
 * ```
 *
 * @export
 * @param {string} url 需要处理的url
 * @return {OssImage} 处理oss url类的实例
 */
export default function ossImage(url: string): OssImage {
  return new OssImage(url);
}
