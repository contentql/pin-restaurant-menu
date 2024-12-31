import * as migration_20241231_041629 from './20241231_041629';

export const migrations = [
  {
    up: migration_20241231_041629.up,
    down: migration_20241231_041629.down,
    name: '20241231_041629'
  },
];
