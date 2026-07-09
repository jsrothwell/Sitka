import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '@/components/ui/Progress';

describe('Progress component', () => {
  it('renders with default variant', () => {
    render(<Progress value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
  });

  it('renders different variants', () => {
    render(<Progress value={75} variant="success" showValue />);
    expect(screen.getByText('75%').textContent).toBe('75%');
  });

  it('renders indeterminate state', () => {
    render(<Progress indeterminate label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-busy')).toBe('true');
    expect(bar.getAttribute('aria-valuenow')).toBe(null);
  });
});