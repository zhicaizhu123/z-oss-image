import { MethodsType } from './types';

export const methods: MethodsType[] = [
  'resize',
  'blur',
  'circle',
  'crop',
  'indexcrop',
  'rotate',
  'bright',
  'contrast',
  'sharpen',
  'format',
  'watermark',
  'interlace',
  'quality',
  'roundedCorners',
  'autoOrient',
];

/**
 * 用joinFlag拼接obj里面的每对kv，并用splitFlag分割
 *
 * @param {Record<string, string | number>} obj
 * @param {string} joinFlag
 * @param {string} splitFlag
 * @return {string}
 */
export function joinStr(
  obj: Record<string, string | number>,
  joinFlag: string,
  splitFlag: string,
): string {
  return Object.keys(obj)
    .reduce((acc, cur) => {
      if (obj[cur]) return (acc += `${splitFlag}${cur}${joinFlag}${obj[cur]}`);
      return (acc += `${splitFlag}${cur}`);
    }, '')
    .slice(1);
}

/**
 * 抛出错误信息
 *
 * @param {string} error 提示错误的字符串
 */
export function throwNoKeyError(error: string): Error {
  throw new Error(error);
}

/**
 * 转化为中划线值
 *
 * @export
 * @param {string} str 需要转化的字符串
 * @returns
 */
export function dasherize(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}
