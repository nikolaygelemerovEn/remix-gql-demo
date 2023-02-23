export interface ButtonProps {
  dataTest?: string;
  disabled?: boolean;
  onClick?: () => void;
  text: string;
  variant: 'success' | 'error' | 'confirm';
}

export type ButtonStyledProps = Pick<ButtonProps, 'text' | 'variant'>;
