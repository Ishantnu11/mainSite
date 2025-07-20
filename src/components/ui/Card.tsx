import { Card as MuiCard, CardProps as MuiCardProps, styled } from '@mui/material';
import { ReactNode } from 'react';

interface CardProps extends MuiCardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  hover?: boolean;
  children: ReactNode;
}

const StyledCard = styled(MuiCard)<CardProps>(({ theme, variant = 'default', hover = true }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',

  ...(variant === 'default' && {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    ...(hover && {
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        borderColor: 'rgba(37, 99, 235, 0.2)',
      },
    }),
  }),

  ...(variant === 'elevated' && {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    ...(hover && {
      '&:hover': {
        transform: 'translateY(-12px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
    }),
  }),

  ...(variant === 'glass' && {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    ...(hover && {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        transform: 'translateY(-6px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
    }),
  }),
}));

export const Card = ({ variant = 'default', hover = true, children, ...props }: CardProps) => {
  return (
    <StyledCard variant={variant} hover={hover} {...props}>
      {children}
    </StyledCard>
  );
}; 