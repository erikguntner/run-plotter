import React, { Component } from 'react';
import Portal from './Portal';
import Icon from './Icon';
import styles from '../../stylesheets/Modal.module.scss';

class Modal extends Component {
  render() {
    const { children, toggle, open } = this.props;

    return (
      <Portal>
        {open && (
          <div className={styles.modalWrapper}>
            <div className={styles.background} onClick={toggle} />
            <div className={styles.modalCard}>
              <button className={styles.close} onClick={toggle}>
                <Icon name="close" />
              </button>
              <div>{children}</div>
            </div>
          </div>
        )}
      </Portal>
    );
  }
}

export default Modal;