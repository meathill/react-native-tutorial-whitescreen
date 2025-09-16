/**
 * 根据传入的十六进制 (hex) 背景色，计算并返回具有最佳对比度的字体颜色（黑色或白色）。
 *
 * @param hexColor 输入的十六-进制颜色字符串，可以包含 #，也可以是 3 位或 6 位。例如: '#FFF', '#C71585', 'FFD700'。
 * @returns 返回 '#000000' (黑色) 或 '#FFFFFF' (白色)。
 */
export function getTextColorForHex(hexColor: string): '#000000' | '#FFFFFF' {
  // 1. 标准化 Hex 输入
  hexColor = hexColor.trim();
  let cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  cleanHex = cleanHex.substring(0, 6);

  // 处理 3 位缩写形式 (例如 'F0C' -> 'FF00CC')
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  // 确保是 6 位 hex
  if (cleanHex.length !== 6) return '#000000';

  // 2. 提取 R, G, B 值
  const r = parseInt(cleanHex.substring(0, 2), 16); // Red
  const g = parseInt(cleanHex.substring(2, 4), 16); // Green
  const b = parseInt(cleanHex.substring(4, 6), 16); // Blue

  // 3. 计算颜色的感知亮度 (YIQ formula)
  // 公式: (R*299 + G*587 + B*114) / 1000
  // 这个公式考虑了人眼对不同颜色的敏感度（对绿色最敏感）
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // 4. 根据亮度阈值返回最合适的颜色
  // 阈值通常选择在 128 到 186 之间，149 是一个不错的选择
  return brightness >= 149 ? '#000000' : '#FFFFFF';
}
