# OSS 图片链接处理

## 安装
``` sh
yarn add z-oss-image 
# 或
npm i z-oss-image -S
```
## 引入方式
``` ts
import ossImage from 'z-oss-image'

const imageUrl = ossImage('图片链接').resize({ w: 100, h: 100 }).quality({ q: 80 }).url

```
## 图片处理方法

> 方法的配置项可以查看[oss官方API文档](https://help.aliyun.com/document_detail/44686.html?spm=a2c4g.11186623.6.1399.1457c1f6t2WbAx)

| 方法名称       | 描述                                                                           |                                                 文档链接                                                  |
| :------------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------: |
| resize         | 图片缩放                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44688.htm?spm=a2c63.p38356.b99.183.731d27e7A5oEKj) |
| circle         | 内切圆                                                                         | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44695.htm?spm=a2c63.p38356.b99.184.13802520KTnyBj) |
| crop           | 自定义裁剪                                                                     | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44693.htm?spm=a2c63.p38356.b99.185.c93c64adIHSyco) |
| indexcrop      | 索引切割                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44696.htm?spm=a2c63.p38356.b99.186.64786b1etWeJGj) |
| roundedCorners | 圆角矩形                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44694.htm?spm=a2c63.p38356.b99.187.38a37ca3JRXNna) |
| rotate         | 旋转                                                                           | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44690.htm?spm=a2c63.p38356.b99.189.342b2e63KARw4A) |
| autoOrient     | 自适应方向                                                                     | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44691.htm?spm=a2c63.p38356.b99.188.7a164ea9F1pnVW) |
| blur           | 模糊效果                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44701.htm?spm=a2c63.p38356.b99.190.190d72adCf9Y8u) |
| bright         | 亮度                                                                           | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44698.htm?spm=a2c63.p38356.b99.191.234a1d297ZmJNF) |
| contrast       | 对比度                                                                         | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44699.htm?spm=a2c63.p38356.b99.193.3a6a61bdATEoss) |
| sharpen        | 锐化                                                                           | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44700.htm?spm=a2c63.p38356.b99.192.de4a3d610IgxZ5) |
| format         | 格式转换                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44703.htm?spm=a2c63.p38356.b99.196.7ea13e06rAYZqW) |
| interlace      | 渐进显示，jpg 格式自上而下的扫描式，先模糊后逐渐清晰（在网络环境比较差时明显） | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44704.htm?spm=a2c63.p38356.b99.194.7c023e06A62Re9) |
| quality        | 质量变换                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44705.htm?spm=a2c63.p38356.b99.195.5d5a3721SDqvkG) |
| watermark      | 图片水印                                                                       | [文档](https://www.alibabacloud.com/help/zh/doc-detail/44957.htm?spm=a2c63.p38356.b99.197.5a23e04afHm7O2) |
