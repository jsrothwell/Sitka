import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button component', () => {
  it('renders with label', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button').textContent).toBe('Click');
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[rgb(var(--accent))]');
  });
});
