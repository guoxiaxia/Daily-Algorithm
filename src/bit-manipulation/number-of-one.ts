/**
 * 二进制中1的个数
 */

/**
 * n >>= 1 位数移动 1 === /2
 * 类比 10 进制 减少一位，就除以 10
 * 每次除以 2 之后和 1 进行对比
 *
 * @param n 数字
 *
 */
export function numberOfOne(n: number) {
  let count = 0;
  for (count = 0; n; n >>= 1) // 循环移位
    count += n & 1; // 如果当前位是1，则计数器加1
  return count
}

/**
 * n & (n - 1) => 1000_1000 & 1000_0111 =>  1000_0000
 * 把最后一个 1 置 0
 * @param n
 */
export function numberOfOneOptimize1(n: number) {
  let count = 0;
  while (n) {
    n = n & (n - 1)
    count++
  }
  return count
};


/**
 * 平行方法
 * 先将n写成二进制形式，然后相邻位相加，重复这个过程，直到只剩下一位
 * 1  0  0  1  1
 * 1     0     2
 * 1           2
 *             3
 * @param n
 */
export function numberOfOneOptimize2(n: number) {
  n = (n & 0x55555555) + ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  n = (n & 0x0f0f0f0f) + ((n >> 4) & 0x0f0f0f0f);
  n = (n & 0x00ff00ff) + ((n >> 8) & 0x00ff00ff);
  n = (n & 0x0000ffff) + ((n >> 16) & 0x0000ffff);

  return n;
}

/**
 * 查表法
 * @param n
 *
 * 首先构造一个包含256个元素的表table，table[i]即i中1的个数，这里的i是[0-255]之间任意一个值。然后对于任意一个32bit无符号整数n，我们将其拆分成四个8bit，然后分别求出每个8bit中1的个数，再累加求和即可，这里用移位的方法，每次右移8位，并与0xff相与，取得最低位的8bit，累加后继续移位，如此往复，直到n为0。
 * 所以对于任意一个32位整数，需要查表4次。
 * 以十进制数2882400018为例，其对应的二进制数为 10101011110011011110111100010010
 *
 */
function numberOfOneOptimize3(n: number) {
  let table =
    [
      0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4,
      1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
      1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
      1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
      2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
      3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
      3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
      4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8,
    ]

  return table[n & 0xff] +
    table[(n >> 8) & 0xff] +
    table[(n >> 16) & 0xff] +
    table[(n >> 24) & 0xff];
}

// other
