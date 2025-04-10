import PropTypes from 'prop-types';

import cx from 'classnames';
import styles from './Button.module.css';

const colorClass = {
  primary: styles.color_primary,
  secondary: styles.color_secondary,
};

export function Button({ onClick, color, children, ...props }) {
  return (
    <button
      type="button"
      className={cx(styles.root, color ? colorClass[color] : '')}
      onClick={onClick}
      data-testid="Button"
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(Object.keys(colorClass)),
};

Button.defaultProps = {
  onClick: null,
  color: null,
};
