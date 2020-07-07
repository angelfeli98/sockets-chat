
import { socketEvents, doomEvents } from './socket.js';
import { init } from './index-conf.js'

init()
socketEvents();
doomEvents();