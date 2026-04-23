/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZodiacInfo } from './types';

export const ZODIAC_SIGNS: Record<string, ZodiacInfo> = {
  Aries: { name: 'Aries', element: 'Fire', symbol: '♈', color: '#FF4D4D', secondaryColor: '#FFA07A' },
  Taurus: { name: 'Taurus', element: 'Earth', symbol: '♉', color: '#4CAF50', secondaryColor: '#8BC34A' },
  Gemini: { name: 'Gemini', element: 'Air', symbol: '♊', color: '#FFEB3B', secondaryColor: '#FFF176' },
  Cancer: { name: 'Cancer', element: 'Water', symbol: '♋', color: '#64B5F6', secondaryColor: '#BBDEFB' },
  Leo: { name: 'Leo', element: 'Fire', symbol: '♌', color: '#FF9800', secondaryColor: '#FFB74D' },
  Virgo: { name: 'Virgo', element: 'Earth', symbol: '♍', color: '#795548', secondaryColor: '#A1887F' },
  Libra: { name: 'Libra', element: 'Air', symbol: '♎', color: '#F06292', secondaryColor: '#F48FB1' },
  Scorpio: { name: 'Scorpio', element: 'Water', symbol: '♏', color: '#9C27B0', secondaryColor: '#BA68C8' },
  Sagittarius: { name: 'Sagittarius', element: 'Fire', symbol: '♐', color: '#673AB7', secondaryColor: '#9575CD' },
  Capricorn: { name: 'Capricorn', element: 'Earth', symbol: '♑', color: '#607D8B', secondaryColor: '#90A4AE' },
  Aquarius: { name: 'Aquarius', element: 'Air', symbol: '♒', color: '#03A9F4', secondaryColor: '#4FC3F7' },
  Pisces: { name: 'Pisces', element: 'Water', symbol: '♓', color: '#00BCD4', secondaryColor: '#4DD0E1' },
};

export const POMODORO_PRESETS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const LOFI_TRACKS = [
  { id: '1', name: 'Stardust Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Placeholder
  { id: '2', name: 'Lunar Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
];
