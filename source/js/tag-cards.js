class TagCardsSorter {
  constructor() {
    this.container = document.querySelector('.tag-cards-container');
    if (!this.container) return;

    this.sortBySelect = document.getElementById('sort-by');
    this.sortOrderSelect = document.getElementById('sort-order');
    this.cardsGrid = document.querySelector('.tag-cards-grid');

    this.init();
  }

  init() {
    if (!this.sortBySelect || !this.sortOrderSelect || !this.cardsGrid) return;

    this.sortBySelect.addEventListener('change', () => this.sortCards());
    this.sortOrderSelect.addEventListener('change', () => this.sortCards());

    // Initial sort
    this.sortCards();
  }

  sortCards() {
    const sortBy = this.sortBySelect.value;
    const sortOrder = this.sortOrderSelect.value;
    const cards = Array.from(this.cardsGrid.children);

    cards.sort((a, b) => {
      let aValue, bValue;

      if (sortBy === 'count') {
        aValue = parseInt(a.querySelector('.tag-post-count').textContent.match(/\d+/)[0]);
        bValue = parseInt(b.querySelector('.tag-post-count').textContent.match(/\d+/)[0]);
      } else if (sortBy === 'name') {
        aValue = a.querySelector('.tag-card-title a').textContent.trim();
        bValue = b.querySelector('.tag-card-title a').textContent.trim();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    // Re-append sorted cards
    cards.forEach(card => this.cardsGrid.appendChild(card));
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TagCardsSorter();
});

// Re-initialize on PJAX
if (typeof btf !== 'undefined') {
  btf.addGlobalFn('pjaxComplete', () => {
    new TagCardsSorter();
  });
}
