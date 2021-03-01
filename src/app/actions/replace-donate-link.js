export default () => {
  let headerDonateBtn = document.querySelector('.c2-header-desktop-btns a.donate-btn');
  if(!headerDonateBtn) return;

  headerDonateBtn.href = 'https://www.justgiving.com/my-time';
  headerDonateBtn.setAttribute('target', '_blank');
};