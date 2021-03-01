import PropObject from '../../PropObject';

export default class SideBar extends PropObject {
  constructor(props) {
    super(props);

    if(!this.props.sideBarContainer) {
      this.id = null;
      return;
    }

    this.id = '#' + this.props.sideBarContainer.id;

    this.props.sideBarContainer.addEventListener('click', e => {
      this.close(e);
    })
  }

  handleClick() {
    this.props.sideBarContainer.classList.toggle('open');
  }

  close(e) {
    if(e.target.classList.contains('c2-side-bar')) {
      this.props.sideBarContainer.classList.remove('open');
    }
  }
}