import { describe, it, expect } from 'vitest';
import { color, spacing, typography, motion, radius } from '@/design-system/tokens';

describe('design-system tokens', () => {
  it('color.brand.cyan is valid hex', () => {
    expect(color.brand.cyan).toBe('#00C0E8');
  });

  it('color.themes.dark.background is dark', () => {
    expect(color.themes.dark.background).toBe('rgb(9, 9, 12)');
  });

  it('spacing.4 is 16px', () => {
    expect(spacing['4']).toBe('16px');
  });

  it('radius.md is 10px', () => {
    expect(radius.md).toBe('10px');
  });

  it('typography.fontSize.base is 15px', () => {
    expect(typography.fontSize.base).toBe('15px');
  });

  it('motion.duration.fast is 150ms', () => {
    expect(motion.duration.fast).toBe('150ms');
  });

  it('motion.presets.pressSpring is stiffness-based', () => {
    expect(motion.presets.pressSpring).toBe('stiffness 500, damping 40');
  });
});
