import { Freelancer, Job, ActiveProject, Message } from './types';

export const INITIAL_FREELANCERS: Freelancer[] = [
  {
    id: 'f1',
    name: 'Ananya Iyer',
    title: 'Senior Product Designer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-JVv4w_0MVT5Xm8mMNwxXvYPV5DHZdzhcbqky6mkKdcfjGOYJEPBrcrA2MitNKQwycSlF1atj8ejsuKLg94ZA98syLJb_bjGRoyObdfEAY6fbYkmPjtRMoE39r1uipWnhMm1PkpJy7fs1XacMPul1Llbi7fQAHF8NZdg-ndGp6dluCljwgxMwTOdNoSR3kXhiX1F9ml6aTdETVf9G9Jcqi35aBU9gwhO8CWjyt7FsI0NtMKLisORMZLNhdPgNPMzdmEm34LYNLNTu',
    hourlyRate: 7000,
    rating: 4.9,
    tags: ['UI/UX', 'Figma', 'Design Systems'],
    category: 'Design'
  },
  {
    id: 'f2',
    name: 'Vikram Malhotra',
    title: 'Full-Stack Engineer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsdnGXFUsPh6rvA7_D2se9Qzbrr8EIjtNmOMh6kde7KrlG7TLovzNSJzr3ImoE0ZQWR7fBwxBJ1AqvmfKmlcdOqABsX37bHCz5736FvRMTduPrnwaxEml2z7DY12mHRMy7Zd4IE7PbZz11-OnAMRUbgDM4JRtnBIKMQlfxvWWgG7kFD_ASNx5XzhriLRuyF7VnPH7HbxKstSy01kpdgHAgLN-jxulRnQEUxhqzLviICwcE38RYWEYazC_iHAoAbWDLudqbnZhqecu-',
    hourlyRate: 9000,
    rating: 5.0,
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: 'Development',
    online: true
  },
  {
    id: 'f3',
    name: 'Sana Khan',
    title: '3D Generalist & Animator',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1f1JzdAVis_-OFzvUnrXLzClxgtLwjhkq8OXW48JUK1bn9E72Vc7Nq_cZrzGQTtLuTR_QMirOJhye3JEMFkWcZW9ZApLOl31HLKKm7TQGGKezJPa_L6L2zC2E463zBJFfqkPNcyX3AhHMDKP0ekxBKaJJTHhYO_ijaNtk9sodn4FzCD4hlOnSOS2wMxQt7AUjiQm7nKImv2aYd2fJRgHbN2zQRduS_-XzpbaKaYCDsY2hO1SA0TyK-1HmVVIq8Vh_5I5EiM3-OwB',
    hourlyRate: 5400,
    rating: 4.8,
    tags: ['Blender', 'Cinema 4D', 'Rigging'],
    category: 'Design'
  },
  {
    id: 'f4',
    name: 'Aditya Verma',
    title: 'Technical Copywriter',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnjEeRcAikoG4Z9UsqjYggsVqvgnCEQk3faR302wwz5uBZI7V5x5ZlJWONho524Ot3xsIrlZ2GGWeEs1ogstMX1YAs5ckdFNDo4lhbTS8zVTVUeVuOMUYPqdPGZgM08pfSHlN4xV_jK-oAZZrDtsfoyjIW5E_m2I1TRiPUllc0NaW7JrbNCuJycvv3YY4AR_tgs3AK1axgSuRYD-OEYF_rCVtyk0ufbCm9wHhQxyzeHcRqnEdJVlSk9IvkLkRYNHO-0oxLZs1gq8E1',
    hourlyRate: 3700,
    rating: 4.7,
    tags: ['SEO Content', 'B2B', 'Whitepapers'],
    category: 'Writing',
    online: true
  },
  {
    id: 'f5',
    name: 'Rohan Gupta',
    title: 'Branding Strategist',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_S9e9CaE-7WpjkCMbg80fjLBPBxoMWVIWztKWjLPqo0gGQRR75niG13pkSSxk-vBhoczrgwnjd7HTAlhMEVyurOTUl1Zy6eg0jiOmGUbqYq7sAW5Ajh6csJS3oU_Xj6fV6aOUGsjW-ui5PGcbmP3p1-Xgqa2NGX-Oro-ONz4C6B-uRuitr5w6qNvymRRaOXk4BEd7nmwGwN0ifqdIb837hqgttfU0XHpFBiDR_W_lW8PpHUIPZzvfZ3rFbn_6BCPtfWtvX6dgSYXi',
    hourlyRate: 4800,
    rating: 4.9,
    tags: ['Branding', 'Logos', 'Illustrator'],
    category: 'Design',
    online: true
  },
  {
    id: 'f6',
    name: 'Priya Sharma',
    title: 'React & D3 Developer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDTusNaSMSyjLNkrIo9_YLgvmML-UmPbQR5zBBOIjuuFlsakkCrT2olmudaDtgq_pRg-GfFf34mpyGmDEVIK8KqRI38IWcfIbpo4kHKsL5IhET9UGZAea9h0MdjsRt1vGwXnz7jDL0dNI3tr33JOXHZur23JQKBTWqSB-3LBojGzFx19K_Kawd_i9LIjwCt63DR4hItX1FSxH-dXF61JCJeX-FtV-DrKJoFqsziIsVTA8sK0F8CXFWvTTg7hUWVAARucuSzVTLUfdk',
    hourlyRate: 6000,
    rating: 4.8,
    tags: ['React', 'D3.js', 'Frontend'],
    category: 'Development'
  }
];

export const INITIAL_JOBS: Job[] = [
  // Screen 2 Featured Jobs
  {
    id: 'j1',
    title: 'Senior React Native Developer',
    companyName: 'IndiPay Solutions',
    companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiAhHmFRxdIFKGwOzi6CCdCtwt2n1UU2LJ28xu7FZ-cM6MzOaecXY01uLwAwrh9ifliA5sRcRxGb1xY1I80_hM6UT7p6m6HoXh7Dg-s5maSaRloCSIdISrZGCb8ppKVSWSTl99dTftqg8A_nSpMYruBgttJqGbpjncmFifcn9LyE9NknCctx7Ub-RS0nsLFdsntH5ux_2q0ucRuV43nSbG8LmxPo8CmhoVuLFJSZealQ2d0_hvaTTFJTFF2tgX1EiP68DqAMKhsmOA',
    postedAt: 'Posted 2 hours ago',
    description: 'Join our core mobile team to build the next generation of our fintech application. Experience with fluid animations and Neomorphic UI is a huge plus.',
    tags: ['React Native', 'TypeScript', 'Fintech'],
    category: 'Development',
    budgetType: 'fixed',
    budgetRange: '₹4,15,000',
    minBudget: 415000,
    maxBudget: 415000,
    timeframe: '1-3 Months',
    location: 'Remote, US',
    featured: true
  },
  {
    id: 'j2',
    title: 'UX/UI Designer',
    companyName: 'Acme Corp',
    companyLogo: '',
    postedAt: 'Posted 4 hours ago',
    description: 'We need a master of Neumorphism and soft UI patterns to craft a stunning new Clay-based application design.',
    tags: ['Figma', 'Prototyping'],
    category: 'Design',
    budgetType: 'hourly',
    budgetRange: '₹6,500 - ₹10,000 / hr',
    minBudget: 6500,
    maxBudget: 10000,
    timeframe: '1-4 Weeks',
    location: 'Remote',
    featured: true
  },
  {
    id: 'j3',
    title: 'Growth Marketing Manager',
    companyName: 'Structura',
    companyLogo: '',
    postedAt: 'Posted 1 day ago',
    description: 'Drive acquisition for our new SaaS product targeting freelance designers across social and web platforms.',
    tags: ['Marketing', 'SaaS', 'SEO'],
    category: 'Writing',
    budgetType: 'fixed',
    budgetRange: '₹1,50,000',
    minBudget: 150000,
    maxBudget: 150000,
    timeframe: '1-4 Weeks',
    location: 'Remote, UK',
    featured: true
  },
  {
    id: 'j4',
    title: 'Technical Writer (API Documentation)',
    companyName: 'GlobalNet',
    companyLogo: '',
    postedAt: 'Posted 1 day ago',
    description: 'Translate complex blockchain backend structures into beautiful, readable documentation for developers.',
    tags: ['Markdown', 'Web3'],
    category: 'Writing',
    budgetType: 'fixed',
    budgetRange: '₹4,15,000',
    minBudget: 415000,
    maxBudget: 415000,
    timeframe: '1-3 Months',
    location: 'Remote, EU',
    featured: true
  },

  // Screen 3 Recommended Jobs
  {
    id: 'j5',
    title: 'Senior UI/UX Designer for Fintech App',
    companyName: 'Arjun Mehta',
    companyLogo: '',
    postedAt: 'Posted 2 hours ago',
    description: 'We are looking for an experienced designer to revamp our core banking application. You will be responsible for creating soft, extruded interfaces that provide a tactile feel to digital finance. Must be proficient in Figma and Tailwind CSS.',
    tags: ['Figma', 'UI Design', 'Fintech'],
    category: 'Design',
    budgetType: 'fixed',
    budgetRange: '₹2,50,000 - ₹4,00,000',
    minBudget: 250000,
    maxBudget: 400000,
    timeframe: '1-4 Weeks',
    location: 'Remote, India'
  },
  {
    id: 'j6',
    title: 'React Developer for Dashboard Analytics',
    companyName: 'Priya Sharma',
    companyLogo: '',
    postedAt: 'Posted 5 hours ago',
    description: 'Seeking a frontend developer to build complex data visualization components using React and D3.js. The interface follows a minimalist, light-mode design system. Experience with performance optimization for large datasets is required.',
    tags: ['React', 'D3.js', 'Frontend'],
    category: 'Development',
    budgetType: 'hourly',
    budgetRange: '₹4,000 - ₹6,500 / hr',
    minBudget: 4000,
    maxBudget: 6500,
    timeframe: '1-4 Weeks',
    location: 'Remote, US'
  },
  {
    id: 'j7',
    title: 'Brand Identity & Logo Design',
    companyName: 'Rohan Gupta',
    companyLogo: '',
    postedAt: 'Posted 1 day ago',
    description: 'Need a complete brand identity package including logo, typography guidelines, and packaging concepts for a new premium coffee roaster. Looking for a modern, tactile aesthetic that conveys quality and craftsmanship.',
    tags: ['Branding', 'Illustration', 'Print'],
    category: 'Design',
    budgetType: 'fixed',
    budgetRange: '₹1,25,000',
    minBudget: 125000,
    maxBudget: 125000,
    timeframe: '< 1 Week',
    location: 'Remote'
  }
];

export const INITIAL_ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: 'ap1',
    title: 'Revamp Core Mobile UI',
    freelancerName: 'Ananya Iyer',
    freelancerTitle: 'Senior Product Designer',
    freelancerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-JVv4w_0MVT5Xm8mMNwxXvYPV5DHZdzhcbqky6mkKdcfjGOYJEPBrcrA2MitNKQwycSlF1atj8ejsuKLg94ZA98syLJb_bjGRoyObdfEAY6fbYkmPjtRMoE39r1uipWnhMm1PkpJy7fs1XacMPul1Llbi7fQAHF8NZdg-ndGp6dluCljwgxMwTOdNoSR3kXhiX1F9ml6aTdETVf9G9Jcqi35aBU9gwhO8CWjyt7FsI0NtMKLisORMZLNhdPgNPMzdmEm34LYNLNTu',
    budget: '₹2,80,000',
    progress: 65
  },
  {
    id: 'ap2',
    title: 'PostgreSQL Database Sharding',
    freelancerName: 'Vikram Malhotra',
    freelancerTitle: 'Full-Stack Engineer',
    freelancerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsdnGXFUsPh6rvA7_D2se9Qzbrr8EIjtNmOMh6kde7KrlG7TLovzNSJzr3ImoE0ZQWR7fBwxBJ1AqvmfKmlcdOqABsX37bHCz5736FvRMTduPrnwaxEml2z7DY12mHRMy7Zd4IE7PbZz11-OnAMRUbgDM4JRtnBIKMQlfxvWWgG7kFD_ASNx5XzhriLRuyF7VnPH7HbxKstSy01kpdgHAgLN-jxulRnQEUxhqzLviICwcE38RYWEYazC_iHAoAbWDLudqbnZhqecu-',
    budget: '₹9,000/hr (32 hours logged)',
    progress: 40
  },
  {
    id: 'ap3',
    title: 'Fintech Website Technical Content',
    freelancerName: 'Aditya Verma',
    freelancerTitle: 'Technical Copywriter',
    freelancerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnjEeRcAikoG4Z9UsqjYggsVqvgnCEQk3faR302wwz5uBZI7V5x5ZlJWONho524Ot3xsIrlZ2GGWeEs1ogstMX1YAs5ckdFNDo4lhbTS8zVTVUeVuOMUYPqdPGZgM08pfSHlN4xV_jK-oAZZrDtsfoyjIW5E_m2I1TRiPUllc0NaW7JrbNCuJycvv3YY4AR_tgs3AK1axgSuRYD-OEYF_rCVtyk0ufbCm9wHhQxyzeHcRqnEdJVlSk9IvkLkRYNHO-0oxLZs1gq8E1',
    budget: '₹3,700/hr (15 hours logged)',
    progress: 90
  },
  {
    id: 'ap4',
    title: 'Character Animation Set',
    freelancerName: 'Sana Khan',
    freelancerTitle: '3D Animator',
    freelancerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1f1JzdAVis_-OFzvUnrXLzClxgtLwjhkq8OXW48JUK1bn9E72Vc7Nq_cZrzGQTtLuTR_QMirOJhye3JEMFkWcZW9ZApLOl31HLKKm7TQGGKezJPa_L6L2zC2E463zBJFfqkPNcyX3AhHMDKP0ekxBKaJJTHhYO_ijaNtk9sodn4FzCD4hlOnSOS2wMxQt7AUjiQm7nKImv2aYd2fJRgHbN2zQRduS_-XzpbaKaYCDsY2hO1SA0TyK-1HmVVIq8Vh_5I5EiM3-OwB',
    budget: '₹1,50,000',
    progress: 15
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderName: 'Ananya Iyer',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-JVv4w_0MVT5Xm8mMNwxXvYPV5DHZdzhcbqky6mkKdcfjGOYJEPBrcrA2MitNKQwycSlF1atj8ejsuKLg94ZA98syLJb_bjGRoyObdfEAY6fbYkmPjtRMoE39r1uipWnhMm1PkpJy7fs1XacMPul1Llbi7fQAHF8NZdg-ndGp6dluCljwgxMwTOdNoSR3kXhiX1F9ml6aTdETVf9G9Jcqi35aBU9gwhO8CWjyt7FsI0NtMKLisORMZLNhdPgNPMzdmEm34LYNLNTu',
    senderTitle: 'Senior Product Designer',
    previewText: 'Hi Aarav, I completed the neomorphic UI mockups for the fintech dashboard. Let me know what you think of the clay shadows!',
    timestamp: '10 mins ago',
    unread: true,
    replies: [
      { sender: 'freelancer', text: 'Hey Aarav, starting on the design phase today.', time: 'Yesterday' },
      { sender: 'user', text: 'Awesome Ananya, let’s stick to the high-fidelity neomorphic clay style.', time: 'Yesterday' },
      { sender: 'freelancer', text: 'Hi Aarav, I completed the neomorphic UI mockups for the fintech dashboard. Let me know what you think of the clay shadows!', time: '10 mins ago' }
    ]
  },
  {
    id: 'm2',
    senderName: 'Vikram Malhotra',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsdnGXFUsPh6rvA7_D2se9Qzbrr8EIjtNmOMh6kde7KrlG7TLovzNSJzr3ImoE0ZQWR7fBwxBJ1AqvmfKmlcdOqABsX37bHCz5736FvRMTduPrnwaxEml2z7DY12mHRMy7Zd4IE7PbZz11-OnAMRUbgDM4JRtnBIKMQlfxvWWgG7kFD_ASNx5XzhriLRuyF7VnPH7HbxKstSy01kpdgHAgLN-jxulRnQEUxhqzLviICwcE38RYWEYazC_iHAoAbWDLudqbnZhqecu-',
    senderTitle: 'Full-Stack Engineer',
    previewText: 'I’ve successfully deployed the PostgreSQL database replication setup. The queries are significantly faster now.',
    timestamp: '1 hour ago',
    unread: true,
    replies: [
      { sender: 'user', text: 'How is the replication lag looking?', time: '2 hours ago' },
      { sender: 'freelancer', text: 'I’ve successfully deployed the PostgreSQL database replication setup. The queries are significantly faster now.', time: '1 hour ago' }
    ]
  },
  {
    id: 'm3',
    senderName: 'Sana Khan',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1f1JzdAVis_-OFzvUnrXLzClxgtLwjhkq8OXW48JUK1bn9E72Vc7Nq_cZrzGQTtLuTR_QMirOJhye3JEMFkWcZW9ZApLOl31HLKKm7TQGGKezJPa_L6L2zC2E463zBJFfqkPNcyX3AhHMDKP0ekxBKaJJTHhYO_ijaNtk9sodn4FzCD4hlOnSOS2wMxQt7AUjiQm7nKImv2aYd2fJRgHbN2zQRduS_-XzpbaKaYCDsY2hO1SA0TyK-1HmVVIq8Vh_5I5EiM3-OwB',
    senderTitle: '3D Generalist & Animator',
    previewText: 'Hey! Just finished the initial Blender rigs. Sending a video demo in a bit.',
    timestamp: '3 hours ago',
    unread: true,
    replies: [
      { sender: 'freelancer', text: 'Hey! Just finished the initial Blender rigs. Sending a video demo in a bit.', time: '3 hours ago' }
    ]
  },
  {
    id: 'm4',
    senderName: 'Aditya Verma',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnjEeRcAikoG4Z9UsqjYggsVqvgnCEQk3faR302wwz5uBZI7V5x5ZlJWONho524Ot3xsIrlZ2GGWeEs1ogstMX1YAs5ckdFNDo4lhbTS8zVTVUeVuOMUYPqdPGZgM08pfSHlN4xV_jK-oAZZrDtsfoyjIW5E_m2I1TRiPUllc0NaW7JrbNCuJycvv3YY4AR_tgs3AK1axgSuRYD-OEYF_rCVtyk0ufbCm9wHhQxyzeHcRqnEdJVlSk9IvkLkRYNHO-0oxLZs1gq8E1',
    senderTitle: 'Technical Copywriter',
    previewText: 'Aarav, the B2B whitepaper draft is fully polished and ready for review on Google Docs.',
    timestamp: 'Yesterday',
    unread: false,
    replies: [
      { sender: 'user', text: 'Great work Aditya, checking it today.', time: 'Yesterday' }
    ]
  }
];
