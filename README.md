# 阿里云文件链接处理

### 支持的图片处理方法

各种方法的配置项可以查看[参考指南](https://help.aliyun.com/document_detail/44686.html?spm=a2c4g.11186623.6.1399.1457c1f6t2WbAx)

- `resize`：图片缩放
- `circle`：内切圆
- `crop`：自定义裁剪
- `indexcrop`：索引切割
- `roundedCorners`：圆角矩形
- `rotate`：旋转
- `autoOrient`：自适应方向
- `blur`：模糊效果
- `bright`：亮度
- `contrast`：对比度
- `sharpen`：锐化
- `format`：格式转换
- `interlace`：渐进显示，jpg 格式自上而下的扫描式，先模糊后逐渐清晰（在网络环境比较差时明显）
- `quality`：质量变换
- `watermark`：图片水印

### 示例

```js
import zOssImg from "zOssImg";

// 原图片链接：https://res.shiguangkey.com/file/ocean/wehub/20200516/09/1589591821138PkDy7a.png
const url = zOssImg(url).resize({ w: 160, h: 90 }).quality(80).url;
// => 处理后的图片链接：https://res.shiguangkey.com/file/ocean/wehub/20200516/09/1589591821138PkDy7a.png?x-oss-process=image%2Fresize%2Cw_160%2Ch_90%2Fquality%2C80
```
