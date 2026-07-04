export const SERVICE_CATEGORIES = [
  {
    label: 'Bundle & install packages',
    services: [
      {
        id: 'service-signature-closure',
        name: 'Signature All Inclusive 2x6 Closure Package',
        duration: '2hr 20min',
        price: 390,
        description:
          '3 bundles & closure. Cuticle-aligned virgin hair (3×22" + 20" 2×6 closure), flat braid down, fully customised closure and install, layers & curls.',
      },
      {
        id: 'service-ultimate-closure',
        name: 'Ultimate Volume 2x6 Closure Package',
        duration: '2hr 40min',
        price: 450,
        description:
          '4 bundles & closure. Cuticle-aligned virgin hair (2×22", 2×24", 20" 2×6 closure), flat braid down, fully customised closure and install, layers & curls.',
      },
      {
        id: 'service-traditional-leaveout',
        name: 'Traditional Leave Out Sew In Package 22"',
        duration: '2hr 30min',
        price: 350,
        description:
          '3 bundles. Cuticle-aligned premium virgin bundles 3×22", flat braid down, custom install, layers & curls.',
      },
      {
        id: 'service-traditional-ultimate',
        name: 'Traditional Sew In Ultimate Volume',
        duration: '2hr 30min',
        price: 400,
        description:
          '4 bundles. Cuticle-aligned virgin bundles 2×22", 2×24", flat braid down, fully customised closure and install, layers & curls.',
      },
    ],
  },
  {
    label: 'Sew in',
    services: [
      {
        id: 'service-signature-leaveout',
        name: 'Signature Traditional Leave-out Sew In',
        duration: '2hr',
        price: 100,
        description:
          'Braid down using natural hair, bundles sewn flat, straightened/bumped ends, middle or side part. Hair must be at least 5" all around; not suited to very silky, straight, or slippery hair.',
      },
      {
        id: 'service-closure-sewin',
        name: 'Closure Sew In — 2x6',
        duration: '3hr',
        price: 150,
        description:
          '2×6 lace closure customisation (knot bleaching & plucking), braid down, bundles sewn flat, leave-out heat protection. Hair must be at least 5" all around; not recommended for Caucasian hair textures.',
      },
      {
        id: 'service-curly-flipover',
        name: 'Curly Flipover Sew In',
        duration: '2hr 20min',
        price: 100,
        description:
          'A low-maintenance sew-in that flips to either side for a lived-in curly look. Front perimeter left out — hairline should be full and at least 4–5".',
      },
    ],
  },
  {
    label: 'Wigs & lace frontal installs',
    services: [
      {
        id: 'service-custom-frontal',
        name: 'Custom Made Lace Frontal Unit',
        duration: '2hr',
        price: 160,
        description:
          'Full wig construction: wig making, lace tinting, bleached knots, styling, bald cap method, multiple glue-down layers, frontal plucking, band fitting. Hair not included — send at least 5 days before your appointment.',
      },
      {
        id: 'service-frontal-ponytail-bun',
        name: 'Frontal Ponytail Bun — HD Frontal Included',
        duration: '1hr 50min',
        price: 260,
        description:
          '16" HD frontal, plucked & customised, bleached knots, lace tinting, straightened, extended ponytail sewn in (no glue). Book at least 5 working days ahead; hair should be freshly washed, product-free.',
      },
      {
        id: 'service-premade-wig',
        name: 'Pre-Made Wig Installation',
        duration: '2hr',
        price: 110,
        description:
          'Lace tinting, bleached knots, bald cap method, multiple glue-down layers, frontal plucking, band fitting. Hair not included — send at least 5 working days before your appointment.',
      },
      {
        id: 'service-mini-frontal',
        name: 'Custom-Made Mini Frontal Wig',
        duration: '2hr',
        price: 140,
        description:
          'Lace closure install. Full wig construction on a 4×4/5×5/6×6 closure: lace tinting, bleached knots, styling, frontal customisation. Hair not included — send at least 5 days before your appointment.',
      },
      {
        id: 'service-frontal-ponytail',
        name: 'Frontal Ponytail',
        duration: '2hr 40min',
        price: 150,
        description:
          'Frontal plucked & customised, bleached knots, lace tinting, straightened, extended ponytail sewn in (no glue). Frontal/bundles not included.',
      },
      {
        id: 'service-wig-reinstall',
        name: 'Wig Reinstallation',
        duration: '1hr 30min',
        price: 90,
        description:
          'Reinstall and restyle a wig you already own — bald cap method, install, styling (straighten, crimp, curl, half up half down). Bring your wig; lace must be dry and glue/oil-free.',
      },
    ],
  },
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) => c.services);
export const SERVICE_BY_NAME = Object.fromEntries(ALL_SERVICES.map((s) => [s.name, s]));

export const ADDONS = [
  { name: 'Blunt Cut Bob', price: 10, minutes: 30 },
  { name: 'Layer and Curl', price: 25, minutes: 15 },
  { name: 'Leave in clips for curls', price: 10, minutes: 1 },
  { name: 'Low hairline look', price: 20, minutes: 20 },
  { name: 'Sew in extra bundle', price: 15, minutes: 10 },
  { name: 'Take home curls', price: 10, minutes: 1 },
];

export const ADDON_NAMES = ADDONS.map((a) => a.name);
export const ADDON_BY_NAME = Object.fromEntries(ADDONS.map((a) => [a.name, a]));

// Every service takes a 50% deposit, calculated on the service price PLUS
// whatever add-ons are selected — recalculated live, never cached.
export function calcDeposit(serviceName, selectedAddons = []) {
  if (!serviceName) return 0;
  const service = SERVICE_BY_NAME[serviceName];
  const servicePrice = service ? service.price : 0;
  const addonsTotal = selectedAddons.reduce((sum, name) => sum + (ADDON_BY_NAME[name]?.price || 0), 0);
  return Math.round((servicePrice + addonsTotal) * 0.5);
}

export function addonsTotal(selectedAddons = []) {
  return selectedAddons.reduce((sum, name) => sum + (ADDON_BY_NAME[name]?.price || 0), 0);
}

export function addonsMinutes(selectedAddons = []) {
  return selectedAddons.reduce((sum, name) => sum + (ADDON_BY_NAME[name]?.minutes || 0), 0);
}

// Lookbook entries. 
export const INITIAL_LOOKS = [
  {
    image: 'images/look-curly-flipover.svg',
    kicker: 'Curly & low maintenance',
    title: 'Curly Flipover Sew In',
    description:
      'A flip-over sew-in that gives you the option to wear your hair to either side for an easy, "bed head" curly look — no daily styling needed.',
    services: ['Curly Flipover Sew In'],
    addons: ['Take home curls'],
  },
  {
    image: 'images/look-custom-frontal.svg',
    kicker: 'Sleek & polished',
    title: 'Custom Frontal, Sleek Finish',
    description:
      'A custom-made lace frontal unit, tinted and plucked to the hairline, straightened for a smooth, editorial finish that sits completely natural.',
    services: ['Custom Made Lace Frontal Unit'],
    addons: ['Blunt Cut Bob'],
  },
  {
    image: 'images/look-traditional-sewin.svg',
    kicker: 'Install day',
    title: 'Traditional Sew In, Start to Finish',
    description:
      'Natural hair braided down, bundles sewn flat, then styled and finished in the chair — a full traditional leave-out install from start to finish.',
    services: ['Signature Traditional Leave-out Sew In'],
    addons: ['Layer and Curl'],
  },
];