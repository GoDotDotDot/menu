

import React from 'react';
import {joinClasses, classSet, KeyCode} from 'rc-util';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    ['onKeyDown', 'onMouseLeave', 'onMouseEnter', 'onClick'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  componentWillUnmount() {
    const props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
  }

  onKeyDown(e) {
    const keyCode = e.keyCode;
    if (keyCode === KeyCode.ENTER) {
      this.onClick(e);
      return true;
    }
  }

  onMouseLeave() {
    this.props.onHover(null);
  }

  onMouseEnter() {
    const props = this.props;
    props.onHover(props.eventKey);
  }

  onClick(e) {
    const props = this.props;
    const eventKey = props.eventKey;
    props.onClick(eventKey, this, e);
    if (props.multiple) {
      if (props.selected) {
        props.onDeselect(eventKey, this, e);
      } else {
        props.onSelect(eventKey, this, e);
      }
    } else if (!props.selected) {
      props.onSelect(eventKey, this, e);
    }
  }

  getPrefixCls() {
    return this.props.rootPrefixCls + '-item';
  }

  getActiveClassName() {
    return this.getPrefixCls() + '-active';
  }

  getSelectedClassName() {
    return this.getPrefixCls() + '-selected';
  }

  getDisabledClassName() {
    return this.getPrefixCls() + '-disabled';
  }

  render() {
    const props = this.props;
    const classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = props.selected;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    const attrs = {
      title: props.title,
      className: joinClasses(props.className, classSet(classes)),
      role: 'menuitem',
      'aria-selected': props.selected,
      'aria-disabled': props.disabled,
    };
    let mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
      };
    }
    return (
      <li
        {...attrs}
        {...mouseEvent}>
      {props.children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  rootPrefixCls: React.PropTypes.string,
  active: React.PropTypes.bool,
  selected: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  title: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onDeselect: React.PropTypes.func,
  onHover: React.PropTypes.func,
  onDestroy: React.PropTypes.func,
};

MenuItem.defaultProps = {
  onSelect() {
  },
  onMouseEnter() {
  },
};

export default MenuItem;
