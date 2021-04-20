const RESPONSIVE_CLASS = 'responsive';

export default () => {
  let activePaginationItem = document.querySelector('.c2page-item.active') || document.querySelector('.PageLinksContainer .PageLinkCurrent');
  if(!activePaginationItem) return;

  let pageLinkText = document.querySelector('.PageLinksContainer .PageLinks');
  if(pageLinkText) {
    pageLinkText.remove();
  }

  let previousPaginationItem = activePaginationItem.previousElementSibling,
      nextPaginationItem     = activePaginationItem.nextElementSibling;

  if(previousPaginationItem) {
    previousPaginationItem.classList.add(RESPONSIVE_CLASS);
  }

  if(nextPaginationItem) {
    nextPaginationItem.classList.add(RESPONSIVE_CLASS);
  }

  if(!previousPaginationItem && nextPaginationItem && nextPaginationItem.nextElementSibling) {
    nextPaginationItem.nextElementSibling.classList.add(RESPONSIVE_CLASS);
  }

  if(!nextPaginationItem && previousPaginationItem && previousPaginationItem.previousElementSibling) {
    previousPaginationItem.previousElementSibling.classList.add(RESPONSIVE_CLASS);
  }
}