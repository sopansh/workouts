/**
 * Sources and graded claims for the plyometrics section.
 * Grades use the same rubric as /strength/evidence/ (A systematic review or meta-analysis with outcome data,
 * B probable, C mechanistic, D practitioner convention). Never add an entry from memory: look the paper up first,
 * then record the DOI check date.
 */
export const sources = [
  {
    id: 'ma-2025',
    cite: 'Ma S, Wang D, Soh KG, Wang X, Xu Y, Tu Q (2025)',
    title: 'The effects of plyometric training on athletic jump performance: a systematic review and meta-analysis',
    venue: 'Frontiers in Physiology',
    doi: '10.3389/fphys.2025.1683281',
    checked: '2026-11-15',
  },
  {
    id: 'fu-2026',
    cite: 'Fu B, Qian Y, Wang Y, Fang J, Gu Y, Zhang X (2026)',
    title: 'The effect of exercise training modalities on the morphological and mechanical properties of the Achilles tendon: a systematic review and network meta-analysis',
    venue: 'Frontiers in Sports and Active Living',
    doi: '10.3389/fspor.2026.1782503',
    checked: '2026-11-15',
  },
  {
    id: 'openstax-muscle',
    cite: 'Betts JG, et al. (2022)',
    title: 'Anatomy and Physiology 2e, section 10.2: Skeletal Muscle',
    venue: 'OpenStax, Rice University',
    url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/10-2-skeletal-muscle',
  },
  {
    id: 'nhs-back-pain',
    cite: 'NHS (page last reviewed 5 March 2026)',
    title: 'Back pain',
    venue: 'nhs.uk',
    url: 'https://www.nhs.uk/conditions/back-pain/',
  },
];

export const claims = [
  {
    id: 'plyo-jump-performance',
    grade: 'A',
    statement: 'In healthy athletes, plyometric training improved countermovement-jump performance more than routine training. Squat jump and overall vertical jump showed no significant difference in the same review.',
    sources: ['ma-2025'],
    caveats: 'The participants were athletes, so the result may not transfer to someone training alone with no sport. Plyometric training was compared with routine training, not with doing nothing. Results differed by jump test, so it does not show that every jump improves.',
  },
  {
    id: 'plyo-tendon',
    grade: 'B',
    statement: 'In healthy adults, short-term plyometric jump training ranked highest for increasing Achilles tendon cross-sectional area, and long-term isometric plantar-flexion training ranked highest for stiffness. Stretching-focused programs generally ranked low.',
    sources: ['fu-2026'],
    caveats: 'The authors call several networks sparse and the estimates imprecise, and ask for better head-to-head trials. The outcomes are tendon size and stiffness, not injury risk or jump height. The tendon is not "fascia" in the everyday sense, and the review does not establish an optimal routine.',
  },
  {
    id: 'fascia-definition',
    grade: null,
    statement: 'Each skeletal muscle is wrapped in layers of connective tissue (epimysium, perimysium and endomysium) that blend into its tendon, and fascia is the connective tissue between the skin and bones. Fascia is connective tissue, not a separate muscle.',
    sources: ['openstax-muscle'],
    caveats: 'A textbook description of structure, not evidence that any exercise changes fascia. No source gathered for this plan shows that these exercises produce a specific fascia adaptation.',
  },
  {
    id: 'plan-convention',
    grade: 'D',
    statement: 'The starting doses, the two-sessions-a-week layout, the 60 to 90 seconds rest and the eight-week progression are planning conventions chosen to be conservative. They are not taken from a trial.',
    sources: [],
    caveats: 'Treat the numbers as a cautious starting point to adjust, ideally with a coach or physiotherapist. Nobody has tested this exact program.',
  },
];

export const gradeLabel = {
  A: 'Established',
  B: 'Probable',
  C: 'Plausible, not proven',
  D: 'Practitioner convention',
};
