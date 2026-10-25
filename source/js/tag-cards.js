class TagCardsSorter {
  constructor() {
    this.container = document.querySelector('.tag-cards-container');
    if (!this.container) return;

    this.sortBySelect = document.getElementById('sort-by');
    this.sortOrderSelect = document.getElementById('sort-order');
    this.cardsGrid = document.querySelector('.tag-cards-grid');

    if (!this.sortBySelect || !this.sortOrderSelect || !this.cardsGrid) return;

    // 先解绑，防止重复绑定
    this.sortBySelect.removeEventListener('change', this._boundSort);
    this.sortOrderSelect.removeEventListener('change', this._boundSort);

    this._boundSort = () => this.sortCards();
    this.sortBySelect.addEventListener('change', this._boundSort);
    this.sortOrderSelect.addEventListener('change', this._boundSort);

    this.sortCards();
  }

  sortCards() {
    // 给 sortBy 和 sortOrder 一个安全的默认回退值
    const sortBy = this.sortBySelect.value || 'count';
    const sortOrder = this.sortOrderSelect.value || 'desc';
    const cards = Array.from(this.cardsGrid.children);

    if (cards.length === 0) return;

    cards.sort((a, b) => {
      let aValue, bValue;

      if (sortBy === 'count') {
        const aEl = a.querySelector('.tag-post-count');
        const bEl = b.querySelector('.tag-post-count');
        aValue = aEl ? parseInt((aEl.textContent.match(/\d+/) || ['0'])[0], 10) : 0;
        bValue = bEl ? parseInt((bEl.textContent.match(/\d+/) || ['0'])[0], 10) : 0;
      } else if (sortBy === 'name') {
        const aEl = a.querySelector('.tag-card-title a');
        const bEl = b.querySelector('.tag-card-title a');
        aValue = aEl ? aEl.textContent.trim() : '';
        bValue = bEl ? bEl.textContent.trim() : '';
      } else {
        return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    cards.forEach(card => this.cardsGrid.appendChild(card));
  }
}

// 单例，防止 PJAX 后重复创建
let tagCardsSorterInstance = null;

function initTagCardsSorter() {
  if (tagCardsSorterInstance) return;
  tagCardsSorterInstance = new TagCardsSorter();
}

// 首次加载
document.addEventListener('DOMContentLoaded', initTagCardsSorter);

// PJAX 切换页面后重新初始化（标准事件）
window.addEventListener('pjax:complete', initTagCardsSorter);