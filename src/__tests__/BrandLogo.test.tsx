import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrandLogo } from '@/components/ui/BrandLogo';

describe('BrandLogo component', () => {
  it('renders an image when src is provided', () => {
    render(<BrandLogo src="https://example.com/logo.png" name="Acme Corp" />);
    expect(screen.getByRole('img', { hidden: true })).toBeTruthy();
  });

  it('falls back to initials when no src is provided', () => {
    render(<BrandLogo name="Acme Corp" />);
    expect(screen.getByText('AC').textContent).toBe('AC');
  });

  it('falls back to initials when the image fails to load', () => {
    render(<BrandLogo src="https://example.com/broken.png" name="Acme Corp" />);
    const img = document.querySelector('img')!;
    fireEvent.error(img);
    expect(screen.getByText('AC').textContent).toBe('AC');
  });

  it('uses a single-word initials fallback for one-word names', () => {
    render(<BrandLogo name="Netflix" />);
    expect(screen.getByText('NE').textContent).toBe('NE');
  });

  it('sets an accessible label from the name', () => {
    render(<BrandLogo name="Acme Corp" />);
    expect(screen.getByLabelText('Acme Corp')).toBeTruthy();
  });
});
