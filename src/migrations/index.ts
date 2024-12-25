import * as migration_20241225_054848 from './20241225_054848';
import * as migration_20241225_060947 from './20241225_060947';

export const migrations = [
  {
    up: migration_20241225_054848.up,
    down: migration_20241225_054848.down,
    name: '20241225_054848',
  },
  {
    up: migration_20241225_060947.up,
    down: migration_20241225_060947.down,
    name: '20241225_060947'
  },
];
