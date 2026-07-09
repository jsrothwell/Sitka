import { describe, it, expect } from 'vitest';
import { relativeLuminance, contrastRatio, accessibleForeground, meetsContrast } from '@/lib';

describe('contrast utilities', () => {
  it('relativeLuminance is 1 for white and 0 for black', () => {
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 5);
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 5);
  });

  it('contrastRatio between black and white is 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('contrastRatio is symmetric', () => {
    expect(contrastRatio('#3B82F6', '#ffffff')).toBeCloseTo(contrastRatio('#ffffff', '#3B82F6'), 5);
  });

  it('accessibleForeground picks white text on dark backgrounds', () => {
    expect(accessibleForeground('#09090c')).toBe('#ffffff');
    expect(accessibleForeground('#1F2937')).toBe('#ffffff');
  });

  it('accessibleForeground picks black text on light backgrounds', () => {
    expect(accessibleForeground('#ffffff')).toBe('#000000');
    expect(accessibleForeground('#F3F4F6')).toBe('#000000');
  });

  it('meetsContrast validates AA threshold', () => {
    expect(meetsContrast('#ffffff', '#000000')).toBe(true);
    expect(meetsContrast('#777777', '#888888')).toBe(false);
  });
});
