export default class PropObject {
  constructor(props, defaultOptions, defaultEvents) {
    // Define the Props
    this.props = {};
    for (let prop in props) {
      this.props[prop] = props[prop];
    }

    // If Default Options are given, merge them with options passed 
    // through by the props
    if(defaultOptions) {
      this.options = Object.assign({...defaultOptions}, this.props.options || {});
    }

    // If Default Events are given, merge them with Events passed 
    // through by the props
    if(defaultEvents) {
      this.events = Object.assign({...defaultEvents}, this.props.events || {});
    }
  }
}