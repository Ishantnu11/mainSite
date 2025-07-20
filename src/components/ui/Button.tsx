import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const StyledButton = styled(MuiButton)<ButtonProps>(({ theme, variant = 'primary', size = 'md' }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  // Size variants
  ...(size === 'sm' && {
    padding: '8px 16px',
    fontSize: '0.875rem',
  }),
  ...(size === 'md' && {
    padding: '12px 24px',
    fontSize: '1rem',
  }),
  ...(size === 'lg' && {
    padding: '16px 32px',
    fontSize: '1.125rem',
  }),

  // Primary variant
  ...(variant === 'primary' && {
    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    color: 'white',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),

  // Secondary variant
  ...(variant === 'secondary' && {
    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    color: 'white',
    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
    },
  }),

  // Ghost variant
  ...(variant === 'ghost' && {
    background: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      transform: 'translateY(-1px)',
    },
  }),

  // Outline variant
  ...(variant === 'outline' && {
    background: 'transparent',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.2)',
    },
  }),

  // Gradient variant
  ...(variant === 'gradient' && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 14px rgba(102, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    },
  }),

  // Disabled state
  '&.Mui-disabled': {
    opacity: 0.6,
    transform: 'none !important',
  },
}));

export const Button = ({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) => {
  return (
    <StyledButton variant="contained" variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
}; 