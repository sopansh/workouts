import { mountChrome } from '../layout.js';
import { progressionTable } from '../ui/render.js';

mountChrome('progression');

document.getElementById('progression-table').replaceChildren(progressionTable());
