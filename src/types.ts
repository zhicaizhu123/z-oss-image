import { OssImage } from './index';

export interface ApiHandler<T> {
  (params: T): OssImage;
}

/**
 * 指定缩放的模式
 *
 * - lfit: 等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
 * - mfit：等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
 * - fill：将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，之后将超出的部分进行居中裁剪。
 * - pad：将原图缩放为指定w与h的矩形内的最大图片，之后使用指定颜色居中填充空白部分。
 * - fixed：固定宽高，强制缩放。
 */
type OssResizeMode = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';

export interface OssResize {
  /**
   * 指定缩放的模式
   */
  m?: OssResizeMode;
  /**
   * 指定目标缩放图的宽度
   * - [1,4096]
   */
  w?: number;
  /**
   * 指定目标缩放图的高度。
   * - [1,4096]
   */
  h?: number;
  /**
   * 指定目标缩放图的最长边。
   * - [1,4096]
   */
  l?: number;
  /**
   * 指定目标缩放图的最长边。
   * - [1,4096]
   */
  s?: number;
  /**
   * 指定当目标缩放图大于原图时是否进行缩放。
   * - 1（默认值）：表示不按指定参数进行缩放，直接返回原图。
   * - 0：按指定参数进行缩放。
   */
  limit?: 0 | 1;
  /**
   * 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色
   * - RGB颜色值，例如：000000表示黑色，FFFFFF表示白色。
   * - 默认值：FFFFFF（白色）
   */
  color?: string;
}

export interface OssCircle {
  /**
   * 指定内切圆的半径。
   * - [1,4096]
   */
  r?: number;
}

export interface OssCrop {
  /**
   * 指定裁剪宽度。
   */
  w?: number;
  /**
   * 指定裁剪高度。
   */
  h?: number;
  /**
   * 指定裁剪起点横坐标（默认左上角为原点）
   */
  x?: number;
  /**
   * 指定裁剪起点纵坐标（默认左上角为原点）
   */
  y?: number;
  /**
   * 设置裁剪的原点位置。原点按照九宫格的形式分布，一共有九个位置可以设置，为每个九宫格的左上角顶点。
   * - nw：左上
   * - north：中上
   * - ne：右上
   * - west：左中
   * - center：中部
   * - east：右中
   * - sw：左下
   * - south：中下
   * - se：右下
   */
  g?: 'nw' | 'north' | 'ne' | 'west' | 'center' | 'sw' | 'south' | 'se';
}

export interface OssIndexcrop {
  /**
   * 指定在x轴切割出的每块区域的长度。x参数与y参数只能任选其一。
   * - [1,图片宽度]
   */
  x?: number;
  /**
   * 指定在y轴切割出的每块区域的长度。x参数与y参数只能任选其一。
   * - [1,图片高度]
   */
  y?: number;
  /**
   * 选择切割后返回的图片区域。
   * - [0,区域数)默认为0，表示第一块。
   */
  i?: number;
}

export interface OssRoundedCorners {
  /**
   * 将图片切出圆角，指定圆角的半径。
   * - [1,4096]
   */
  r?: number;
}

/**
 * 指定图片是否进行自适应旋转。
 * - 0：保持原图方向，不进行自适应旋转。
 * - 1：将图片进行自适应旋转。
 */
export type OssAutoOrient = 0 | 1;

/**
 * 图片按顺时针旋转的角度。
 * - [0,360] 默认值：0，表示不旋转。
 */
export type OssRotate = number;

export interface OssBlur {
  /**
   * 设置模糊半径。
   * - [1,50] 该值越大，图片越模糊。
   */
  r?: number;
  /**
   * 设置正态分布的标准差
   * - [1,50] 该值越大，图片越模糊。
   */
  s?: number;
}

/**
 * 指定图片的亮度。
 * - [-100, 100]
 * - 取值＜0：降低图片亮度。
 * - 取值=0：不调整图片亮度。
 * - 取值＞0：提高图片亮度。
 */
export type OssBright = number;

/**
 * 设置锐化效果的强度。
 * - [50,399]
 * - 取值越大，图片越清晰，但过大的值可能会导致图片失真。为达到较优效果，推荐取值为100。
 */
export type OssSharpen = number;

/**
 * 指定图片的对比度。
 * - [-100,100]
 * - 取值＜0：降低图片对比度
 * - 取值=0：维持原图对比度。
 * - 取值＞0：提高图片对比度。
 */
export type OssContrast = number;

/**
 * 渐进显示
 * - 1 表示保存成渐进显示的 jpg 格式。
 * - 0 表示保存成普通的 jpg 格式。
 */
export type OssInterlace = 0 | 1;

export interface OssQuality {
  /**
   * 设置图片的相对质量，对原图按百分比进行质量压缩。
例如原图质量为100%，添加quality,q_90参数会得到质量为90％的图片。原图质量为80%，添加quality,q_90参数会得到质量72%的图片。
   * - [1,100]
   */
  q?: number;
  /**
   * 设置图片的绝对质量，将原图质量压缩至Q%，如果原图质量小于指定参数值，则按照原图质量重新进行压缩。
例如原图质量是95%，添加quality,Q_90参数会得到质量90％的图片。原图质量是80%，添加quality,Q_90只能得到质量80%的图片。
  * - [1, 100]
   */
  Q?: number;
}

/**
 * 格式转换
 */
export type OssFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff';

export interface OssWatermark {
  t?: number;
  /**
   * 指定水印在图片中的位置。
   * - nw：左上
   * - north：中上
   * - ne：右上
   * - west：左中
   * - center：中部
   * - east：右中
   * - sw：左下
   * - south：中下
   * - se：右下
   */
  g?: 'nw' | 'north' | 'ne' | 'west' | 'center' | 'sw' | 'south' | 'se';
  /**
   * 指定水印的水平边距， 即距离图片边缘的水平距离。这个参数只有当水印位置是左上、左中、左下、右上、右中、右下才有意义。
   * - [0, 4096]
   * - 默认值：10
   * - 单位：像素（px）
   */
  x?: number;
  /**
   * 指定水印的垂直边距，即距离图片边缘的垂直距离， 这个参数只有当水印位置是左上、中上、右上、左下、中下、右下才有意义。
   * - [0, 4096]
   * - 默认值：10
   * - 单位：像素（px）
   */
  y?: number;
  /**
   * 指定水印的中线垂直偏移。当水印位置在左中、中部、右中时，可以指定水印位置根据中线往上或者往下偏移。
   * - [-1000, 1000]
   * - 默认值：10
   * - 单位：像素（px）
   */
  voffet?: number;
  /**
   * 用于指定作为水印图片的完整Object名称，Object名称需进行Base64编码。详情请参见水印编码。
   * - Base64编码后的字符串。
   */
  image?: string;
  /**
   * 指定水印图片按照主图的比例进行缩放，取值为缩放的百分比。如设置参数值为10，如果主图为100×100， 水印图片大小就为10×10。当主图变成了200×200，水印图片大小就为20×20。
   * - [1, 100]
   */
  P?: number;
  /**
   * 指定文字水印的文字内容，文字内容需进行Base64编码。
   * - Base64编码后的字符串，最大长度为64个字符（最多21个汉字）
   */
  text?: string;
  /**
   * 指定文字水印的字体，字体名称需进行Base64编码。
   * - 默认值：wqy-zenhei（ 编码后的值为d3F5LXplbmhlaQ）
   *
   */
  type?: string;
  color?: string;
  size?: number;
  shadow?: number;
  rotate?: number;
  fill: 0 | 1;
  order: 0 | 1;
  align: 0 | 1 | 2;
  interval: number;
}

export type MethodsType =
  | 'resize'
  | 'blur'
  | 'circle'
  | 'crop'
  | 'indexcrop'
  | 'rotate'
  | 'bright'
  | 'contrast'
  | 'sharpen'
  | 'format'
  | 'watermark'
  | 'interlace'
  | 'quality'
  | 'roundedCorners'
  | 'autoOrient';

export type Method = (key: any, value?: any) => OssImage;
