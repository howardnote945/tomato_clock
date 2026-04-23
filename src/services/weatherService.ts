/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WeatherType } from "../types";

export async function getCurrentWeather(): Promise<{ type: WeatherType; city: string }> {
  try {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Using a simple public API or mock for demo if no key
          // For a real app, you'd use OpenWeatherMap
          // Since we want this to work out-of-the-box, we'll use a public search or a default
          try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await res.json();
            const code = data.current_weather?.weathercode || 0;
            
            // Map WMO Weather interpretation codes
            let type: WeatherType = 'sunny';
            if (code >= 1 && code <= 3) type = 'cloudy';
            else if (code >= 51 && code <= 67) type = 'rainy';
            else if (code >= 71 && code <= 77) type = 'snowy';
            else if (code >= 80 && code <= 99) type = 'storm';
            
            resolve({ type, city: "你的所在地" });
          } catch {
            resolve({ type: 'sunny', city: '太陽之城' });
          }
        },
        () => {
          resolve({ type: 'sunny', city: '未知星域' });
        }
      );
    });
  } catch {
    return { type: 'sunny', city: '地球' };
  }
}
