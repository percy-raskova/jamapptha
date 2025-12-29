import type { ButtonProps } from '../../types';
import {
  BUTTON_BASE_STYLE,
  BUTTON_VARIANTS,
} from '../../styles/buttonVariants';

export const Button = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`${BUTTON_BASE_STYLE} ${BUTTON_VARIANTS[variant]} ${className}`}
  >
    {children}
  </button>
);
