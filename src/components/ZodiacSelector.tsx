/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ZODIAC_SIGNS } from '../constants';
import { ZodiacInfo } from '../types';

interface ZodiacSelectorProps {
  onSelect: (zodiac: ZodiacInfo) => void;
  selected: string | null;
}

export function ZodiacSelector({ onSelect, selected }: ZodiacSelectorProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {Object.values(ZODIAC_SIGNS).map((z) => (
        <motion.button
          key={z.name}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(z)}
          className={`flex flex-col items-center p-5 rounded-3xl transition-all border ${
            selected === z.name 
              ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-500' 
              : 'border-stone-100 bg-stone-50 hover:bg-white hover:border-orange-200 hover:shadow-sm'
          }`}
          id={`zodiac-${z.name.toLowerCase()}`}
        >
          <span className="text-4xl mb-3 drop-shadow-sm">{z.symbol}</span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${
            selected === z.name ? 'text-orange-600' : 'text-stone-400'
          }`}>{z.name}</span>
          <div style={{ backgroundColor: z.color }} className="w-1 h-1 rounded-full mt-2 opacity-40" />
        </motion.button>
      ))}
    </div>
  );
}
