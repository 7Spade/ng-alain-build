/**
 * 檔案大小格式化工具
 * 
 * 提供統一的檔案大小格式化功能，避免在多個組件中重複實現
 * 
 * @example
 * ```typescript
 * import { formatFileSize } from '@shared/utils/file-size.util';
 * 
 * const size = formatFileSize(1024); // '1 KB'
 * const size2 = formatFileSize(1048576); // '1 MB'
 * ```
 */

/**
 * 格式化檔案大小
 * @param bytes 位元組數
 * @param decimals 小數位數（預設 2）
 * @returns 格式化後的字串（如 '1.5 MB'）
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 格式化儲存空間（與 formatFileSize 相同，提供語義化別名）
 * @param bytes 位元組數
 * @param decimals 小數位數（預設 2）
 * @returns 格式化後的字串
 */
export function formatStorage(bytes: number, decimals: number = 2): string {
  return formatFileSize(bytes, decimals);
}

/**
 * 解析格式化的檔案大小字串為位元組數
 * @param sizeStr 格式化的大小字串（如 '1.5 MB'）
 * @returns 位元組數
 */
export function parseFileSize(sizeStr: string): number {
  const match = sizeStr.match(/^([\d.]+)\s*([KMGT]?B)$/i);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const k = 1024;
  
  const unitMap: Record<string, number> = {
    'B': 1,
    'KB': k,
    'MB': k * k,
    'GB': k * k * k,
    'TB': k * k * k * k
  };
  
  return value * (unitMap[unit] || 1);
}

