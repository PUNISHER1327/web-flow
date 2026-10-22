import type {
  StatItemData,
  BentoCardData,
  TrainingProgram,
  StepItem,
  MemberStory,
  GalleryItem,
  FAQItem,
  NavItem
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Training', href: '#programs' },
  { label: 'Programs', href: '#programs' },
  { label: 'Membership', href: '#dashboard' },
  { label: 'Our approach', href: '#manifesto' },
];

export const STATS_DATA: StatItemData[] = [
  {
    value: '12+',
    numericPart: 12,
    suffix: '+',
    label: 'Structured training programs',
    description: 'Designed for progressive overload and measurable adaptation',
  },
  {
    value: '4',
    numericPart: 4,
    suffix: '',
    label: 'Core training goals',
    description: 'Strength, hypertrophy, conditioning, and foundational lifting',
  },
  {
    value: '100%',
    numericPart: 100,
    suffix: '%',
    label: 'Progress focused',
    description: 'Every session logs volume, load, and qualitative output',
  },
  {
    value: '24/7',
    numericPart: 24,
    suffix: '/7',
    label: 'Access to your training plan',
    description: 'Direct mobile logging, planned workouts, and workout history',
  },
];

export const BENTO_CARDS: BentoCardData[] = [
  {
    id: 'featured',
    title: 'TRAIN WITH PURPOSE.',
    description: 'Every session has a reason. Follow a structured plan instead of guessing what to do next.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1400&auto=format&fit=crop',
    tag: 'CORE PRINCIPLE',
    className: 'md:col-span-8 md:row-span-2 min-h-[360px] md:min-h-[460px]',
  },
  {
    id: 'programs',
    title: 'Personalised programs',
    description: 'Choose a training path built around strength, muscle growth, fat loss, or general fitness.',
    icon: 'Target',
    tag: 'SELECTION',
    className: 'md:col-span-4 md:row-span-1 min-h-[220px]',
  },
  {
    id: 'progress',
    title: 'Track your progress',
    description: 'Log your lifts, monitor your consistency, and compare your performance over time.',
    icon: 'ChartNoAxesCombined',
    tag: 'METRICS',
    className: 'md:col-span-4 md:row-span-1 min-h-[220px]',
  },
  {
    id: 'structure',
    title: 'Built-in structure',
    description: 'Know what to train, when to train, and how to keep your routine moving forward.',
    icon: 'CalendarCheck',
    tag: 'ROUTINE',
    className: 'md:col-span-6 md:row-span-1 min-h-[240px]',
  },
  {
    id: 'coaching',
    title: 'Coaching and accountability',
    description: 'Keep your goals visible and make room for guidance, feedback, and accountability.',
    icon: 'UsersRound',
    tag: 'COMMUNITY',
    className: 'md:col-span-6 md:row-span-1 min-h-[240px]',
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'program-01',
    number: '01',
    title: 'Strength',
    visual: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    focus: 'Progressive strength development',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    description: 'Heavy compound movements focused on the squat, bench press, deadlift, and overhead press with calibrated RPE progression.',
    details: [
      '4 training sessions per week',
      'Periodized wave-loading protocol',
      'Dedicated accessory and joint resilience work',
      'Targeted for 1RM and 3RM PR breakthroughs'
    ],
  },
  {
    id: 'program-02',
    number: '02',
    title: 'Muscle Building',
    visual: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop',
    focus: 'Hypertrophy-focused training',
    difficulty: 'Beginner to advanced',
    duration: '8 weeks',
    description: 'High-volume hypertrophy splits balancing mechanical tension, metabolite accumulation, and recovery bandwidth.',
    details: [
      'Upper / Lower 4-day split',
      'Standardized 8-15 rep hypertrophy ranges',
      'Isolated muscle group supersets',
      'Tracked pump & volume tracking'
    ],
  },
  {
    id: 'program-03',
    number: '03',
    title: 'Fat Loss',
    visual: 'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1200&auto=format&fit=crop',
    focus: 'Sustainable training and conditioning',
    difficulty: 'Beginner to intermediate',
    duration: '6 weeks',
    description: 'Preserve lean mass with heavy lifts while accelerating caloric expenditure through athletic density and conditioning intervals.',
    details: [
      '3 full-body lift days + 2 density circuits',
      'Zone-2 cardio baseline prescriptions',
      'Preserved strength output during deficits',
      'Weekly body composition checkpoints'
    ],
  },
  {
    id: 'program-04',
    number: '04',
    title: 'Athletic Conditioning',
    visual: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop',
    focus: 'Work capacity and athletic performance',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    description: 'Sled pushes, explosive power work, row intervals, and unilateral balance to build a resilient, fatigue-proof engine.',
    details: [
      'Multi-planar functional movements',
      'Lactate threshold intervals',
      'Plyometrics and rotational power',
      'Heart rate recovery tracking'
    ],
  },
  {
    id: 'program-05',
    number: '05',
    title: 'Build Your Base',
    visual: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop',
    focus: 'Fundamental movement patterns and gym confidence',
    difficulty: 'Beginner',
    duration: '4 weeks',
    description: 'Master the hinge, squat, press, and pull with barbell technique breakdowns, movement drills, and confidence builders.',
    details: [
      '3 full-body sessions per week',
      'Detailed video cues for every movement',
      'Zero ego-lifting, pure technical mastery',
      'Seamless ramp-up into Strength or Hypertrophy'
    ],
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Set your goal',
    description: 'Choose your primary objective: strength, muscle building, fat loss, or general fitness.',
    detail: 'Answer a 60-second assessment on training experience, weekly frequency, and equipment access to pinpoint the exact track.',
  },
  {
    number: '02',
    title: 'Get your plan',
    description: 'Select a suitable training program and see what each session involves.',
    detail: 'Your 4 to 8-week periodized schedule is mapped into your calendar with target weights, sets, rest timers, and exercise cues.',
  },
  {
    number: '03',
    title: 'Train and log',
    description: 'Complete your workouts and record sets, reps, weights, and other supported training metrics.',
    detail: 'Use one-tap logging in the gym. Real-time RPE scoring automatically adjusts weight suggestions for your next session.',
  },
  {
    number: '04',
    title: 'Review your progress',
    description: 'Look at your training history, spot patterns, and adjust your approach when needed.',
    detail: 'Inspect tonnage charts, personal record milestones, and volume trends to verify that your consistency is delivering.',
  },
];

export const MEMBER_STORIES: MemberStory[] = [
  {
    id: 'story-1',
    name: 'Marcus Vance',
    role: 'Software Engineer',
    program: '8-Week Strength',
    weeksTraining: 16,
    quote: 'Before IRONVAULT, I showed up to the gym without a plan and wondered why my deadlift was stuck for a year. Having target weights and RPE targets laid out removed all decision fatigue. My pull went from 160kg to 195kg cleanly.',
    highlight: '+35kg on deadlift in 16 weeks',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'story-2',
    name: 'Elena Rostova',
    role: 'Product Designer & Triathlete',
    program: 'Athletic Conditioning',
    weeksTraining: 12,
    quote: 'Most gym apps are either bloated social networks or spreadsheet clones. IRONVAULT feels like an elite performance coach in your pocket. The pacing, the brutal conditioning sessions, and the volume tracking keep me disciplined.',
    highlight: '22% increase in lactate threshold work',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'story-3',
    name: 'David Chen',
    role: 'Medical Resident',
    program: 'Build Your Base',
    weeksTraining: 8,
    quote: 'Working 70-hour hospital shifts meant I had zero energy to figure out workouts. The 4-week base program taught me proper hinge mechanics and gave me a 45-minute routine that fits even my worst call schedules.',
    highlight: 'Zero missed sessions across 8 weeks',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    caption: 'CHALK & STEEL — RAW COMPOUND REPS',
    tag: 'BARBELL DISCIPLINE',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g-2',
    caption: 'POWER RACK — DEEP SQUAT POSITIONING',
    tag: 'MAX EFFORT',
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-3',
    caption: 'DUMBBELL RUN — MECHANICAL TENSION',
    tag: 'FACILITIES',
    url: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-4',
    caption: '05:30 AM — FIRST SET IN AN EMPTY FLOOR',
    tag: 'EARLY HOURS',
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-5',
    caption: 'SPEED WORK — LACTATE CLEARANCE',
    tag: 'CONDITIONING',
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g-6',
    caption: 'RECOVERY — THE WORK ADDS UP',
    tag: 'POST WORKOUT',
    url: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/3]',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is IRONVAULT suitable for beginners?',
    answer: 'Yes. Our "Build Your Base" program was created specifically for individuals new to barbell lifting or returning after a long hiatus. It emphasizes fundamental mechanics, barbell safety, and structured progression without overwhelming volume.',
  },
  {
    id: 'faq-2',
    question: 'Can I train for muscle building and fat loss?',
    answer: 'Yes. We offer distinct tracks designed for muscle growth (hypertrophy focus with high localized volume) and body recomposition (strength retention combined with athletic density conditioning). You can switch between tracks at any time as your priorities change.',
  },
  {
    id: 'faq-3',
    question: 'How do workout programs work?',
    answer: 'Each program is organized into 4 to 8-week blocks with scheduled training days, precise exercise selections, target sets, rep ranges, and suggested RPE (Rate of Perceived Exertion). Each session specifies warm-up protocols and accessory work.',
  },
  {
    id: 'faq-4',
    question: 'Can I track my weights, sets, and reps?',
    answer: 'Yes. The integrated IRONVAULT training log lets you record weights lifted, reps completed, and perceived difficulty during your session. Historical records automatically plot your tonnage, estimated 1-rep maximums, and progress over time.',
  },
  {
    id: 'faq-5',
    question: 'Can I use IRONVAULT alongside my existing gym membership?',
    answer: 'Absolutely. The platform is designed to run on your phone in whatever gym facility you use. Whether you train at a commercial gym, a campus recreation center, or a dedicated garage gym with basic barbells and dumbbells, our programs accommodate standard equipment setups.',
  },
  {
    id: 'faq-6',
    question: 'Can I change my training goal later?',
    answer: 'Yes. Your membership allows you to switch programs or re-calibrate your baseline numbers whenever you complete a training block. Your logged workout history and personal records are preserved across all program transitions.',
  },
];
