import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card component', () => {
  it('renders children', () => {
    const { container } = render(<Card>Hello</Card>);
    expect(container.firstChild?.textContent).toBe('Hello');
  });

  it('has default variant classes', () => {
    const { container } = render(<Card>Hello</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('border-[rgb(var(--border))]');
    expect(el.className).toContain('bg-[rgb(var(--surface))]');
  });
});
