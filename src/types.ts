/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';

export interface ZodiacInfo {
  name: string;
  element: Element;
  symbol: string;
  color: string;
  secondaryColor: string;
}

export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'night' | 'storm';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface DailyVibe {
  quote: string;
  vibe: string;
}
