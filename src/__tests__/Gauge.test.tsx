import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from '@/components/ui/Gauge';

describe('Gauge component', () => {
  it('renders with auto variant', () => {
    render(<Gauge value={50} />);
    expect(screen.getByText('50%').textContent).toBe('50%');
  });

  it('renders custom label', () => {
    render(<Gauge value={75} label="75" sublabel="of 100" />);
    expect(screen.getByText('75').textContent).toBe('75');
    expect(screen.getByText('of 100').textContent).toBe('of 100');
  });
});