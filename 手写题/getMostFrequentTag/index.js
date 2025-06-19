/**
 * 1. 统计页面内出现次数最多的 HTML标签，如果多个标签数量一样，则返回一个列表
 */
function getMostFrequentTags() {
  const tags = [...document.querySelectorAll('*')]
    .reduce((acc, el) => {
      const tag = el.tagName;
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  const maxCount = Math.max(...Object.values(tags), 0);

  return Object.entries(tags)
    .filter(([_, count]) => count === maxCount)
    .map(([tag]) => tag);
}

/**
 * 2. 统计页面内出现次数前n的标签, 相同出现次数分配相同的排名
 * @param n 
 */
function getTopNMostFrequentTags(n = 3) {
  const tags = [...document.querySelectorAll('*')]
    .reduce((acc, el) => {
      const tag = el.tagName;
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  const sortedTags = Object.entries(tags)
    .sort((a, b) => b[1] - a[1]); // 按次数降序排列

  const result = [];
  let currentRank = 0;
  let currentCount = Infinity;
  let rankSize = 0; // 当前排名的标签数量

  for (const [tag, count] of sortedTags) {
    // 当新的次数出现时，开始新排名
    if (count < currentCount) {
      currentRank = result.length + 1;
      currentCount = count;
      rankSize = 0;
    }

    // 检查添加当前标签是否会超出前n个排名
    if (currentRank <= n) {
      result.push({ rank: currentRank, tag, count });
      rankSize++;
    } else {
      break;
    }
  }

  return result;
}