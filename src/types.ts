export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hourlyRate: number; // in INR
  rating: number;
  tags: string[];
  category: 'Design' | 'Development' | 'Writing';
  online?: boolean;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  postedAt: string; // text e.g. "2 hours ago"
  description: string;
  tags: string[];
  category: 'Design' | 'Development' | 'Writing';
  budgetType: 'hourly' | 'fixed';
  budgetRange: string; // e.g. "₹2,50,000 - ₹4,00,000" or "₹4,000 - ₹6,500 / hr"
  minBudget: number; // numeric for filtering
  maxBudget: number; // numeric for filtering
  timeframe?: string; // timeframe category: "< 1 Week", "1-4 Weeks", "1-3 Months"
  location?: string;
  isBookmarked?: boolean;
  featured?: boolean;
}

export interface ActiveProject {
  id: string;
  title: string;
  freelancerName: string;
  freelancerTitle: string;
  freelancerAvatar: string;
  budget: string;
  progress: number;
}

export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderTitle: string;
  previewText: string;
  timestamp: string;
  unread: boolean;
  replies?: Array<{
    sender: 'user' | 'freelancer';
    text: string;
    time: string;
  }>;
}
