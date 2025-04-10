import PropTypes from 'prop-types';

import styles from './AppBar.module.css';

export function AppBar({ children }) {
  return (
    <header className={styles.root} data-testid="AppBar">
      {children}
    </header>
  );
}

AppBar.propTypes = {
  children: PropTypes.node,
};

AppBar.defaultProps = {
  children: null,
};
