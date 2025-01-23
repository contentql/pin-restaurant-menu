import * as migration_20241231_041629 from './20241231_041629';
import * as migration_20250123_083711 from './20250123_083711';

export const migrations = [
  {
    up: migration_20241231_041629.up,
    down: migration_20241231_041629.down,
    name: '20241231_041629',
  },
  {
    up: migration_20250123_083711.up,
    down: migration_20250123_083711.down,
    name: '20250123_083711'
  },
];
