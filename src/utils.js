// 用a拼接obj里面的每对kv，并用b分割
export const joinStr = function (obj, a, b) {
  return Object.keys(obj)
    .reduce((acc, cur) => {
      if (obj[cur]) return (acc += `${b}${cur}${a}${obj[cur]}`);
      return (acc += `${b}${cur}`);
    }, "")
    .slice(1);
};

// 驼峰转中横线
export const decamelize = (str) =>
  str.replace(/\B([A-Z])/g, "-$1").toLowerCase();

export const throwNoKeyError = (error) => {
  throw new Error(error);
};

export const methods = "resize,blur,circle,crop,indexcrop,rotate,bright,contrast,sharpen,format,watermark,interlace,quality,roundedCorners,autoOrient".split(
  ","
);
