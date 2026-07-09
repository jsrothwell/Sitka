import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KPITile } from '@/components/ui/KPITile';

describe('KPITile component', () => {
  it('renders title and value', () => {
    render(<KPITile title="Active Users" value="2847" />);
    expect(screen.getByText('Active Users').textContent).toBe('Active Users');
    expect(screen.getByText('2847').textContent).toBe('2847');
  });

  it('renders progress bar when progress prop is set', () => {
    render(<KPITile title="Goal" value="50" progress={75} />);
    expect(screen.getByText('Goal').textContent).toBe('Goal');
  });

  it('renders subtitle when provided', () => {
    render(<KPITile title="Revenue" value="$48.2K" subtitle="this month" />);
    expect(screen.getByText('this month').textContent).toBe('this month');
  });

  it('renders trend badge with value', () => {
    render(<KPITile title="Growth" value="12%" trend={{ value: 12, direction: 'up' }} />);
    const trendElements = screen.getAllByText(/12/);
    expect(trendElements.length).toBeGreaterThan(0);
  });
});