import { Product, Service, Project, GalleryItem, CorePrinciple, ProcessStep } from '../types';

export const INITIAL_PRODUCTS: Product[] = [];

export const CORE_PRINCIPLES: CorePrinciple[] = [
  {
    number: '01',
    title: 'Quality First',
    description: 'We never compromise. Every product is made with premium raw materials and rigorously inspected before delivery.'
  },
  {
    number: '02',
    title: 'Integrity',
    description: 'Honest pricing, realistic timelines, and transparent communication — always, without exception.'
  },
  {
    number: '03',
    title: 'Innovation',
    description: 'We continuously improve our processes and designs to stay ahead and deliver better products every year.'
  },
  {
    number: '04',
    title: 'Customer Focus',
    description: "Every decision we make is centered on exceeding our customers' expectations and building lasting relationships."
  },
  {
    number: '05',
    title: 'Sustainability',
    description: "We use eco-friendly materials and responsible production practices to protect Ethiopia's environment."
  },
  {
    number: '06',
    title: 'Local Pride',
    description: 'We are proudly Ethiopian — creating jobs, building capability, and serving our communities nationwide.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '1',
    title: 'Consultation',
    description: 'Share your needs. We listen and advise on the best product, material, and design for your budget.'
  },
  {
    number: '2',
    title: 'Design & Quote',
    description: 'We provide a detailed design proposal with accurate pricing and guaranteed delivery timeline.'
  },
  {
    number: '3',
    title: 'Manufacturing',
    description: 'Skilled Ethiopian craftsmen fabricate your product under strict quality assurance standards.'
  },
  {
    number: '4',
    title: 'Delivery & Support',
    description: 'Safe, on-time delivery backed by our after-sales support guarantee across all 11 regions.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'Design Consultation',
    description: 'Our experts understand your exact requirements — size, shape, color and capacity — and recommend the best fiberglass solution for your needs.',
    highlights: [
      'Free initial consultation',
      'Technical specification advice',
      'Material selection guidance',
      '2D design sketches on request'
    ],
    ctaText: 'Get a Consultation',
    ctaAction: 'contact',
    iconName: 'PenTool'
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'Custom Manufacturing',
    description: 'We manufacture any fiberglass product to your exact specs. Any shape, size, color and finish — premium-grade resin with 7–30 day lead time.',
    highlights: [
      '86+ standard product types',
      'Fully bespoke fabrication',
      'UV-resistant, weather-proof',
      '7–30 day lead time'
    ],
    ctaText: 'View Products',
    ctaAction: 'products',
    iconName: 'Factory'
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'Nationwide Delivery',
    description: 'Safe delivery to all major cities across all 11 regions of Ethiopia. Secure packaging, on-time guarantee and competitive pricing on every order.',
    highlights: [
      'Delivery to all 11 regions',
      'Secure packaging & handling',
      'On-time delivery guarantee',
      'Competitive delivery pricing'
    ],
    ctaText: 'Request Quote',
    ctaAction: 'quote',
    iconName: 'Truck'
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'Installation Support',
    description: 'On-site installation guidance for water tanks and large structural fiberglass elements. Technical team available in Addis Ababa and surrounding areas.',
    highlights: [
      'Water tank installation',
      'Structural fiberglass fitting',
      'Technical team on-site',
      'Addis Ababa & surrounds'
    ],
    ctaText: 'Book Installation',
    ctaAction: 'contact',
    iconName: 'Wrench'
  },
  {
    id: 'srv-5',
    number: '05',
    title: 'Repair & Refinishing',
    description: 'Restore damaged or faded fiberglass products to factory condition. Crack repair, surface refinishing and structural reinforcement — fast turnaround.',
    highlights: [
      'Crack & chip repair',
      'Surface refinishing & repainting',
      'Structural reinforcement',
      'Fast turnaround time'
    ],
    ctaText: 'Request Repair',
    ctaAction: 'contact',
    iconName: 'ShieldCheck'
  },
  {
    id: 'srv-6',
    number: '06',
    title: 'After-Sales Support',
    description: 'Ongoing support, maintenance advice and warranty assistance to keep every product performing at its best — available Mon–Sat 8 AM to 6 PM.',
    highlights: [
      'Product warranty support',
      'Maintenance guidance',
      'WhatsApp & phone support',
      'Mon–Sat 8:00 AM – 6:00 PM'
    ],
    ctaText: 'WhatsApp Us',
    ctaAction: 'whatsapp',
    iconName: 'Headphones'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const FEATURED_PROJECTS: Project[] = [];

export const COMPANY_STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '11+', label: 'Cities Served' },
  { value: '50+', label: 'Institutions Equipped' },
  { value: '10+', label: 'Years of Excellence' }
];

export const COMPANY_CONTACT_INFO = {
  companyName: 'GALAXY COMPOSITE MANUFACTURING',
  shortName: 'GALAXY COMPOSITE',
  phones: ['+251 92 010 4692'],
  whatsapp: '251920104692',
  email: 'Djgoodluck2015@gmail.com',
  address: '2P6J+2H Supreme Court, Addis Ababa',
  googleMapsUrl: 'https://maps.google.com/?q=2P6J%2B2H+Supreme+Court,+Addis+Ababa',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=2P6J%2B2H%20Supreme%20Court%2C%20Addis%20Ababa&t=&z=15&ie=UTF8&iwloc=&output=embed',
  workingHours: 'Mon–Sat: 8:00 AM – 6:00 PM',
  developer: 'Dessie Fikir',
  developerPhone: '0939 562 117'
};
