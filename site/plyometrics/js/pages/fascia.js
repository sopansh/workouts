import { mountChrome } from '../layout.js';
import { evidenceList, sourceList } from '../ui/render.js';

mountChrome('fascia');

document.getElementById('evidence-list').replaceChildren(evidenceList());
document.getElementById('source-list').replaceChildren(sourceList());
