export default class PropObject {
  constructor(props) {
    // Define the Props
    this.props = {};
    for (let prop in props) {
      this.props[prop] = props[prop];
    }
  }
}