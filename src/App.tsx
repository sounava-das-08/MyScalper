import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  Mail, 
  Star, 
  SlidersHorizontal, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Code, 
  PenTool, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  ChevronRight, 
  Send, 
  UserPlus, 
  ExternalLink,
  CheckCircle,
  X,
  Sparkles,
  Info,
  DollarSign,
  Sun,
  Moon,
  MessageSquare,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_FREELANCERS, INITIAL_JOBS, INITIAL_ACTIVE_PROJECTS, INITIAL_MESSAGES } from './data';
import { Freelancer, Job, ActiveProject, Message } from './types';
import darkLogo from './assets/images/myscalper_logo_dark_1782341896473.jpg';

export default function App() {
  // Theme State: 'cool' (Slate Gray) or 'warm' (Peach Clay)
  const [theme, setTheme] = useState<'cool' | 'warm'>('cool');

  // Nav Tab State: 'landing' | 'find_work' | 'hire_freelancers' | 'messages' | 'dashboard'
  const [activeTab, setActiveTab] = useState<'landing' | 'find_work' | 'hire_freelancers' | 'messages' | 'dashboard'>('landing');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Jobs Board State
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(['j1', 'j5']);

  // Freelancers State
  const [freelancers, setFreelancers] = useState<Freelancer[]>(INITIAL_FREELANCERS);
  const [selectedFreelancerCategory, setSelectedFreelancerCategory] = useState<'All' | 'Design' | 'Development' | 'Writing'>('All');

  // Dashboard Stats & Projects
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>(INITIAL_ACTIVE_PROJECTS);
  const [totalEarnings, setTotalEarnings] = useState<number>(3240); // Base display ₹3,240

  // Messages Inbox State
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [activeMessageId, setActiveMessageId] = useState<string>('m1');
  const [chatInput, setChatInput] = useState('');

  // Modals & Triggers
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [hiringTarget, setHiringTarget] = useState<Freelancer | null>(null);
  const [hiringForm, setHiringForm] = useState({ projectTitle: '', budget: '50000', message: '' });

  // Post Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: 'MyScalper Labs',
    category: 'Development' as 'Design' | 'Development' | 'Writing',
    budgetType: 'fixed' as 'hourly' | 'fixed',
    budgetMin: '150000',
    budgetMax: '300000',
    timeframe: '1-4 Weeks' as '< 1 Week' | '1-4 Weeks' | '1-3 Months',
    description: '',
    tagsString: 'React, Tailwind, Neomorphism'
  });

  // Custom Notifications / Toasts
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; type: 'success' | 'info' }>>([]);

  // Sidebar Filters (Find Work View)
  const [filterCategories, setFilterCategories] = useState({
    Design: true,
    Development: true,
    Writing: true
  });
  const [filterMinBudget, setFilterMinBudget] = useState('');
  const [filterMaxBudget, setFilterMaxBudget] = useState('');
  const [filterTimeframe, setFilterTimeframe] = useState<string | null>(null);

  // Helper to add custom Toast Notification
  const addNotification = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Handler: Save / Bookmark Job
  const toggleBookmark = (jobId: string) => {
    if (bookmarkedJobIds.includes(jobId)) {
      setBookmarkedJobIds((prev) => prev.filter((id) => id !== jobId));
      addNotification('Job removed from bookmarks', 'info');
    } else {
      setBookmarkedJobIds((prev) => [...prev, jobId]);
      addNotification('Job saved to bookmarks!', 'success');
    }
  };

  // Handler: Submit Post Job Form
  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.description) {
      addNotification('Please fill in all required fields', 'info');
      return;
    }

    const tags = newJob.tagsString.split(',').map((t) => t.trim()).filter(Boolean);
    const budgetRangeText = newJob.budgetType === 'fixed' 
      ? `₹${Number(newJob.budgetMin).toLocaleString('en-IN')}`
      : `₹${Number(newJob.budgetMin).toLocaleString('en-IN')} - ₹${Number(newJob.budgetMax).toLocaleString('en-IN')} / hr`;

    const createdJob: Job = {
      id: `j-${Date.now()}`,
      title: newJob.title,
      companyName: newJob.companyName || 'MyScalper Lab',
      companyLogo: '',
      postedAt: 'Just now',
      description: newJob.description,
      tags,
      category: newJob.category,
      budgetType: newJob.budgetType,
      budgetRange: budgetRangeText,
      minBudget: Number(newJob.budgetMin) || 0,
      maxBudget: Number(newJob.budgetMax) || Number(newJob.budgetMin) || 0,
      timeframe: newJob.timeframe,
      location: 'Remote, India'
    };

    setJobs((prev) => [createdJob, ...prev]);
    setIsPostJobOpen(false);
    addNotification('Job successfully posted!', 'success');

    // Reset Form
    setNewJob({
      title: '',
      companyName: 'MyScalper Labs',
      category: 'Development',
      budgetType: 'fixed',
      budgetMin: '150000',
      budgetMax: '300000',
      timeframe: '1-4 Weeks',
      description: '',
      tagsString: 'React, Tailwind, Neomorphism'
    });
  };

  // Handler: Initiate Hire Request
  const handleOpenHire = (freelancer: Freelancer) => {
    setHiringTarget(freelancer);
    setHiringForm({
      projectTitle: `Project for ${freelancer.name}`,
      budget: '50000',
      message: `Hi ${freelancer.name.split(' ')[0]}, I loved your portfolio! Let's build this project.`
    });
    setIsHireOpen(true);
  };

  // Handler: Confirm Hire
  const handleConfirmHire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiringTarget) return;

    // Create active project
    const newProject: ActiveProject = {
      id: `ap-${Date.now()}`,
      title: hiringForm.projectTitle || `Design Project`,
      freelancerName: hiringTarget.name,
      freelancerTitle: hiringTarget.title,
      freelancerAvatar: hiringTarget.avatar,
      budget: `₹${Number(hiringForm.budget).toLocaleString('en-IN')}`,
      progress: 0
    };

    // Create client message thread or append message
    const threadId = `m-${Date.now()}`;
    const newThread: Message = {
      id: threadId,
      senderName: hiringTarget.name,
      senderAvatar: hiringTarget.avatar,
      senderTitle: hiringTarget.title,
      previewText: hiringForm.message || `Proposal sent.`,
      timestamp: 'Just now',
      unread: false,
      replies: [
        { sender: 'user', text: hiringForm.message, time: 'Just now' }
      ]
    };

    setActiveProjects((prev) => [newProject, ...prev]);
    setMessages((prev) => [newThread, ...prev]);
    setActiveMessageId(threadId);
    setIsHireOpen(false);
    addNotification(`Offer sent to ${hiringTarget.name}!`, 'success');
  };

  // Handler: Send Chat Reply
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => prev.map((msg) => {
      if (msg.id === activeMessageId) {
        return {
          ...msg,
          previewText: chatInput,
          unread: false,
          replies: [
            ...(msg.replies || []),
            { sender: 'user', text: chatInput, time: 'Just now' }
          ]
        };
      }
      return msg;
    }));

    setChatInput('');
    addNotification('Message sent!', 'success');

    // Simulate auto reply from freelancer after 3 seconds
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => {
        if (msg.id === activeMessageId) {
          const names = msg.senderName.split(' ');
          const replyText = `Thanks for your message, Aarav! I am reviewing the project specifications and will get back to you shortly. Let's make this platform tactile!`;
          return {
            ...msg,
            previewText: replyText,
            replies: [
              ...(msg.replies || []),
              { sender: 'freelancer', text: replyText, time: 'Just now' }
            ]
          };
        }
        return msg;
      }));
    }, 3000);
  };

  // Handler: Complete Active Project
  const handleCompleteProject = (projectId: string, budgetStr: string) => {
    // Parse numeric value if possible
    const numericStr = budgetStr.replace(/[^\d]/g, '');
    const amount = Number(numericStr) || 5000;
    setTotalEarnings((prev) => prev + amount);
    setActiveProjects((prev) => prev.filter((p) => p.id !== projectId));
    addNotification('Project completed! Funds added to your wallet.', 'success');
  };

  // Filter Logic: Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search Box filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesTags && !matchesDesc) return false;
      }

      // Sidebar Category checkboxes
      if (job.category === 'Design' && !filterCategories.Design) return false;
      if (job.category === 'Development' && !filterCategories.Development) return false;
      if (job.category === 'Writing' && !filterCategories.Writing) return false;

      // Budget Filters
      if (filterMinBudget) {
        if (job.minBudget < Number(filterMinBudget)) return false;
      }
      if (filterMaxBudget) {
        if (job.maxBudget > Number(filterMaxBudget)) return false;
      }

      // Timeframe Filters
      if (filterTimeframe) {
        if (job.timeframe !== filterTimeframe) return false;
      }

      return true;
    });
  }, [jobs, searchQuery, filterCategories, filterMinBudget, filterMaxBudget, filterTimeframe]);

  // Filter Logic: Freelancers
  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((f) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(query);
        const matchesTitle = f.title.toLowerCase().includes(query);
        const matchesTags = f.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesTitle && !matchesTags) return false;
      }

      // Category Pill filter
      if (selectedFreelancerCategory !== 'All' && f.category !== selectedFreelancerCategory) {
        return false;
      }

      return true;
    });
  }, [freelancers, searchQuery, selectedFreelancerCategory]);

  // Calculated Stats
  const unreadMessagesCount = useMemo(() => {
    return messages.filter((m) => m.unread).length;
  }, [messages]);

  const activeMessageThread = useMemo(() => {
    return messages.find((m) => m.id === activeMessageId) || null;
  }, [messages, activeMessageId]);

  return (
    <div className={`neo-transition min-h-screen flex flex-col font-body border-[12px] md:border-[20px] border-[var(--border-frame)] ${theme === 'cool' ? 'theme-cool' : 'theme-warm'} bg-neo-surface text-on-surface`}>
      
      {/* Toast Notification Stack */}
      <div className="fixed top-24 right-8 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto bg-neo-surface neo-shadow-raised rounded-xl p-4 flex items-center gap-3 border border-dashed border-primary/20"
            >
              {notif.type === 'success' ? (
                <CheckCircle className="text-emerald-500 shrink-0 w-5 h-5" />
              ) : (
                <Info className="text-[#6366f1] shrink-0 w-5 h-5" />
              )}
              <span className="text-sm font-medium text-on-surface leading-snug">{notif.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Header Section */}
      <header className="sticky top-0 z-40 bg-neo-surface neo-shadow-raised py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <div className="flex items-center gap-8 w-full max-w-7xl mx-auto">
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveTab('landing'); setSearchQuery(''); }}
            className="flex items-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] transition-transform duration-200"
            id="brand-logo"
          >
            <img 
              alt="MyScalper Logo" 
              className="h-9 w-auto object-contain" 
              src={theme === 'cool' ? darkLogo : "https://lh3.googleusercontent.com/aida-public/AB6AXuDcU0pc5qO5N9ZdbTceuEu0bfqGTVP9V34istweg22fXYsb7tiS0BpeOtab95YE6rF8cP5mX56X2pZKZ5Rf9DVwi9E_Rw0Bo9hN-MsAHjqytE27s9Wsq6hmGu_A_ttyO5Vdt2gRqYWIAxR80baEhY7bINptOLnjYXevi4k7JLPh-5L7hprrElBBze90vrGGsDREXOChSQXFaiBmW6T6Ka73V6slaFpkBzn9Syj8CX3N-0zT454Vx_Vg86c6T8BNYz88l5uCw6vzlCdb"}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Search bar inside header (Left of actions) */}
          <div className="hidden md:flex flex-grow max-w-md">
            <div className="w-full relative flex items-center bg-neo-surface neo-shadow-inset rounded-full px-4 py-2 group">
              <Search className="w-4 h-4 text-on-surface-variant mr-3 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder={
                  activeTab === 'find_work' 
                    ? "Search jobs, skills, or companies..." 
                    : activeTab === 'hire_freelancers' 
                      ? "Search freelancer skills or names..." 
                      : "Search skills or categories..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-on-surface placeholder-on-surface-variant/70 w-full p-0"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-on-surface/5 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-on-surface-variant" />
                </button>
              )}
            </div>
          </div>

          {/* Middle Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 font-medium">
            <button 
              onClick={() => { setActiveTab('find_work'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                activeTab === 'find_work' 
                  ? 'text-primary font-bold neo-shadow-inset' 
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }`}
            >
              Find Work
            </button>
            <button 
              onClick={() => { setActiveTab('hire_freelancers'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                activeTab === 'hire_freelancers' 
                  ? 'text-primary font-bold neo-shadow-inset' 
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }`}
            >
              Hire Freelancers
            </button>
            <button 
              onClick={() => { setActiveTab('messages'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'messages' 
                  ? 'text-primary font-bold neo-shadow-inset' 
                  : 'text-on-surface-variant hover:text-on-surface hover:scale-105'
              }`}
            >
              Messages
              {unreadMessagesCount > 0 && (
                <span className="bg-primary text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4 shrink-0 ml-auto">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => {
                setTheme(theme === 'cool' ? 'warm' : 'cool');
                addNotification(`Switched to ${theme === 'cool' ? 'Warm Peach' : 'Cool Slate'} clay theme!`, 'info');
              }}
              title="Toggle neomorphic clay style"
              className="p-2 w-10 h-10 bg-neo-surface neo-shadow-raised rounded-xl text-on-surface-variant hover:text-primary active:neo-shadow-inset transition-all duration-200 flex items-center justify-center hover:scale-105"
            >
              {theme === 'cool' ? <Sun className="w-5 h-5 text-amber-500 animate-pulse" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            {/* Notification bell */}
            <button 
              onClick={() => addNotification('No new system notifications', 'info')}
              className="p-2 w-10 h-10 bg-neo-surface neo-shadow-raised rounded-xl text-on-surface-variant hover:text-primary active:neo-shadow-inset transition-all duration-200 flex items-center justify-center hover:scale-105"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Messages Quicklink */}
            <button 
              onClick={() => setActiveTab('messages')}
              className="relative p-2 w-10 h-10 bg-neo-surface neo-shadow-raised rounded-xl text-on-surface-variant hover:text-primary active:neo-shadow-inset transition-all duration-200 flex items-center justify-center hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Post Job Button */}
            <button 
              onClick={() => setIsPostJobOpen(true)}
              className="hidden sm:block text-sm font-semibold text-primary px-5 py-2.5 bg-neo-surface neo-shadow-raised hover:text-tertiary active:neo-shadow-inset rounded-xl transition-all duration-200 hover:scale-105"
            >
              Post a Job
            </button>

            {/* Profile Pic Link -> User Dashboard */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              title="Aarav's Dashboard"
              className="w-10 h-10 rounded-full bg-neo-surface neo-shadow-raised p-1 cursor-pointer hover:scale-110 active:neo-shadow-inset transition-all border border-transparent hover:border-primary/30 shrink-0"
            >
              <img 
                alt="User profile" 
                className="w-full h-full rounded-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMRmQII31qc0cZrHxkBJ-S4QSvTU7yKztsN2_aaMF0NxY0NTweCAbOgUUiAdvxbEvKFNJ40I5ghqKZba7PL94To_fDFX72G8SrC5DPsP4pZHqEFI2aPIg1PGOsP4YfUw4RPa1lr7xv9nT9O6gN59G_yEajgLU_CGCD1-vtVSAuC4WbyT09LhvkzIM-_x8Ymc56IVoxTVw-oHLI2cQ3RusD6REq5RfgxCzZNtXcHn9QdyVT3Bvu4Jhz0R-P_qtN2Onh3cuj6TAo0jA0"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Metadata Strip */}
      <div className="border-b border-outline/10 py-3 px-6 md:px-12 bg-neo-surface">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-on-surface-variant/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>The Archive / Vol. 04</span>
          </div>
          <div className="italic text-[9px] tracking-normal lowercase opacity-75">
            curated professional collective & marketplace
          </div>
          <div>Published Dec 2026 // Active</div>
        </div>
      </div>

      {/* Main Container Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-8 relative">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: LANDING / DISCOVERY PAGE */}
          {activeTab === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-16 py-8"
            >
              {/* Centered Hero Card */}
              <section className="bg-neo-surface rounded-3xl p-8 md:p-12 lg:p-16 neo-shadow-raised max-w-6xl mx-auto w-full transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Typography & Action */}
                  <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container mb-6 neo-shadow-inset-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-xs font-semibold text-on-primary-container tracking-wider uppercase">Over 10,000 active opportunities</span>
                    </div>
                    
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-on-surface mb-6 leading-tight">
                      Find Your Next <br className="hidden sm:inline" />
                      <span className="text-primary font-serif font-semibold italic">Great Opportunity</span>
                    </h1>
                    
                    <p className="text-base text-on-surface-variant max-w-xl mb-8 leading-relaxed font-normal">
                      The softest landing for your freelance career. Connect with top clients, manage projects smoothly, and get paid securely.
                    </p>

                    {/* Search Bar Widget inside Hero */}
                    <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4 p-2 bg-neo-surface neo-shadow-inset rounded-2xl mb-12">
                      <div className="flex-grow relative flex items-center px-3 py-2">
                        <Search className="w-5 h-5 text-on-surface-variant mr-3 shrink-0" />
                        <input 
                          type="text" 
                          placeholder="Design, Development, Writing..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface placeholder-on-surface-variant/70 w-full p-0 text-sm md:text-base font-sans"
                        />
                      </div>
                      <button 
                        onClick={() => { setActiveTab('find_work'); }}
                        className="px-6 py-3 bg-neo-surface neo-shadow-raised text-primary font-bold hover:text-primary-hover active:neo-shadow-inset rounded-xl flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-[1.02]"
                      >
                        <span className="font-sans text-xs uppercase tracking-widest">Search Jobs</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Trusted By logo row */}
                    <div className="pt-6 border-t border-outline/10 w-full">
                      <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-[0.25em] font-bold mb-4">Trusted by innovative teams</p>
                      <div className="flex flex-wrap gap-6 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-on-surface-variant">
                        <div className="flex items-center gap-1.5 font-display font-medium text-xs md:text-sm tracking-wide">
                          <span>💎 Acme Corp</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-display font-medium text-xs md:text-sm tracking-wide">
                          <span>🌍 GlobalNet</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-display font-medium text-xs md:text-sm tracking-wide">
                          <span>📐 Structura</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-display font-medium text-xs md:text-sm tracking-wide">
                          <span>⚡ FlashTech</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Premium Museum-Grade Exhibition Poster */}
                  <div className="lg:col-span-5 flex flex-col justify-center items-center relative w-full">
                    {/* Outer Frame with elegant line layout from Design HTML */}
                    <div className="relative w-full max-w-[320px] aspect-[3/4] bg-neo-surface border border-outline/25 p-5 flex flex-col justify-between overflow-hidden group neo-shadow-raised">
                      
                      {/* Grid background motif */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                      
                      {/* Top Label */}
                      <div className="flex justify-between items-baseline border-b border-outline/15 pb-4">
                        <span className="font-sans text-[8px] tracking-[0.3em] uppercase opacity-45">MyScalper // Curated Marketplace</span>
                        <span className="font-sans text-[8px] tracking-[0.3em] uppercase opacity-45">Dec 2026</span>
                      </div>

                      {/* Art Centerpiece */}
                      <div className="my-auto flex flex-col items-center relative py-6">
                        {/* Golden Circle motif */}
                        <div className="absolute w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
                          <div className="w-24 h-24 rounded-full border border-dashed border-primary/10"></div>
                        </div>

                        {/* Large Classic Serif Stat */}
                        <h2 className="font-display text-4xl md:text-5xl font-light text-primary tracking-tight z-10 select-none">
                          ₹3,24,000
                        </h2>
                        
                        {/* Subtext label */}
                        <span className="font-sans text-[9px] tracking-[0.35em] uppercase opacity-40 mt-3 z-10">Average Project Value</span>

                        {/* Intersection Gold Lines */}
                        <div className="absolute -left-4 top-1/2 w-8 h-px bg-primary/30 z-0"></div>
                        <div className="absolute -right-4 top-1/2 w-8 h-px bg-primary/30 z-0"></div>
                      </div>

                      {/* Bottom Footer block inside Art Card */}
                      <div className="mt-auto pt-4 border-t border-outline/15 flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                          </div>
                          <span className="font-mono text-[8px] tracking-[0.2em] uppercase opacity-60">Verified Premium Work</span>
                        </div>
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase opacity-40">Seq. 04</span>
                      </div>
                    </div>

                    {/* Floating Accent Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-primary text-neo-surface text-[10px] tracking-widest uppercase px-4 py-2 font-mono rounded-lg shadow-xl border border-primary-hover animate-bounce-slow">
                      Premium Edition
                    </div>
                  </div>

                </div>
              </section>

              {/* How It Works Section */}
              <section className="flex flex-col items-center gap-10">
                <div className="text-center">
                  <h2 className="font-headline text-3xl font-bold text-on-surface mb-3">How it Works</h2>
                  <p className="text-on-surface-variant font-medium">Your journey to freelance success in three seamless steps.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <div className="bg-neo-surface rounded-2xl p-8 neo-shadow-raised text-center flex flex-col items-center hover:-translate-y-1.5 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary mb-6">
                      <UserPlus className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-3">1. Create Profile</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Set up your portfolio. Showcase your skills, experience, and what makes you unique.</p>
                  </div>

                  <div className="bg-neo-surface rounded-2xl p-8 neo-shadow-raised text-center flex flex-col items-center hover:-translate-y-1.5 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-tertiary mb-6">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-3">2. Browse Jobs</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Use our intelligent matching to find projects that perfectly align with your expertise and rate.</p>
                  </div>

                  <div className="bg-neo-surface rounded-2xl p-8 neo-shadow-raised text-center flex flex-col items-center hover:-translate-y-1.5 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary mb-6">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-xl font-bold text-on-surface mb-3">3. Get Paid</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Complete the work and receive secure, guaranteed payments directly to your preferred account.</p>
                  </div>
                </div>
              </section>

              {/* Featured Jobs Section */}
              <section className="flex flex-col gap-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Featured Jobs</h2>
                    <p className="text-sm text-on-surface-variant font-medium">Hand-picked opportunities for top talent.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('find_work')}
                    className="hidden sm:flex px-5 py-2.5 bg-neo-surface neo-shadow-raised rounded-xl text-primary hover:text-tertiary active:neo-shadow-inset font-semibold text-sm items-center gap-1.5 transition-all hover:scale-105"
                  >
                    <span>View All</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Featured Large Card */}
                  <div className="md:col-span-8 bg-neo-surface rounded-3xl p-8 neo-shadow-raised flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary">
                          <Code className="w-6 h-6" />
                        </div>
                        <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-tertiary-container text-on-tertiary-container neo-shadow-inset-sm">Full-time</span>
                      </div>
                      
                      <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 hover:text-primary transition-colors cursor-pointer" onClick={() => setActiveTab('find_work')}>
                        Senior React Native Developer
                      </h3>
                      
                      <p className="text-sm text-on-surface-variant mb-6 leading-relaxed max-w-xl">
                        Join our core mobile team to build the next generation of our fintech application. Experience with fluid animations and Neomorphic UI is a huge plus.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {['React Native', 'TypeScript', 'Fintech'].map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-neo-surface neo-shadow-inset-sm text-xs text-on-surface-variant font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-on-surface/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neo-surface neo-shadow-inset overflow-hidden p-0.5">
                          <img 
                            className="w-full h-full rounded-full object-cover" 
                            alt="IndiPay Solutions logo"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiAhHmFRxdIFKGwOzi6CCdCtwt2n1UU2LJ28xu7FZ-cM6MzOaecXY01uLwAwrh9ifliA5sRcRxGb1xY1I80_hM6UT7p6m6HoXh7Dg-s5maSaRloCSIdISrZGCb8ppKVSWSTl99dTftqg8A_nSpMYruBgttJqGbpjncmFifcn9LyE9NknCctx7Ub-RS0nsLFdsntH5ux_2q0ucRuV43nSbG8LmxPo8CmhoVuLFJSZealQ2d0_hvaTTFJTFF2tgX1EiP68DqAMKhsmOA" 
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface">IndiPay Solutions</p>
                          <p className="text-xs text-on-surface-variant font-medium">Remote, US</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => addNotification('Application submitted successfully!', 'success')}
                        className="px-5 py-2.5 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset text-sm font-semibold rounded-xl hover:scale-105 transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {/* Featured Small Card 1 (UX/UI Designer) */}
                  <div className="md:col-span-4 bg-neo-surface rounded-3xl p-8 neo-shadow-raised flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-tertiary mb-6">
                        <PenTool className="w-6 h-6" />
                      </div>
                      <h3 className="font-headline text-xl font-bold text-on-surface mb-2">UX/UI Designer</h3>
                      <p className="text-xs text-on-surface-variant mb-6 font-medium">We need a master of Neumorphism and soft UI patterns.</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['Figma', 'Prototyping'].map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-neo-surface neo-shadow-inset-sm text-xs text-on-surface-variant font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-bold text-lg text-primary mb-4">₹6,500 - ₹10,000 <span className="text-xs font-normal text-on-surface-variant">/ hr</span></p>
                      <button 
                        onClick={() => { setActiveTab('find_work'); setSearchQuery('UX/UI Designer'); }}
                        className="w-full py-2.5 rounded-xl text-on-surface-variant font-semibold text-sm bg-neo-surface neo-shadow-raised hover:text-primary active:neo-shadow-inset transition-all text-center"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Featured Small Card 2 (Growth Marketing) */}
                  <div className="md:col-span-5 bg-neo-surface rounded-3xl p-8 neo-shadow-raised flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-secondary-container text-on-secondary-container neo-shadow-inset-sm">Contract</span>
                      </div>
                      
                      <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Growth Marketing</h3>
                      <p className="text-xs text-on-surface-variant mb-6 font-medium leading-relaxed">Drive acquisition for our new SaaS product targeting freelance designers across social and web platforms.</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => addNotification('Marketing role applied!', 'success')}
                        className="flex-grow py-3 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                      >
                        Apply
                      </button>
                      <button 
                        onClick={() => toggleBookmark('j3')}
                        className="w-12 h-12 bg-neo-surface neo-shadow-raised hover:text-primary active:neo-shadow-inset rounded-xl flex items-center justify-center transition-all shrink-0 hover:scale-105"
                      >
                        {bookmarkedJobIds.includes('j3') ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5 text-on-surface-variant" />}
                      </button>
                    </div>
                  </div>

                  {/* Featured Small Card 3 (Technical Writer) */}
                  <div className="md:col-span-7 bg-neo-surface rounded-3xl p-8 neo-shadow-raised flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-tertiary">
                        <PenTool className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Technical Writer (API)</h3>
                        <p className="text-xs text-on-surface-variant mb-4 font-medium leading-relaxed">Translate complex blockchain backend structures into beautiful, readable documentation for developers.</p>
                        <div className="flex gap-2 flex-wrap">
                          {['Markdown', 'Web3'].map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-neo-surface neo-shadow-inset-sm text-[10px] text-on-surface-variant font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-on-surface/10">
                      <p className="text-xs text-on-surface-variant font-medium">Project Budget: <span className="text-on-surface font-bold">₹4,15,000</span></p>
                      <button 
                        onClick={() => addNotification('Application for Technical Writer submitted!', 'success')}
                        className="px-5 py-2 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset text-xs font-bold rounded-xl hover:scale-105 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* VIEW 2: FIND WORK FEED (JOBS WITH SIDEBAR FILTERS) */}
          {activeTab === 'find_work' && (
            <motion.div
              key="find_work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-8 py-8"
            >
              {/* Left Sidebar: Filters Component */}
              <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
                <div className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised">
                  <h2 className="text-lg font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    <span>Filters</span>
                  </h2>

                  {/* Category Selection Filter checkboxes */}
                  <div className="mb-8">
                    <h3 className="text-xs font-headline font-semibold text-on-surface-variant mb-4 tracking-wide uppercase">Category</h3>
                    <div className="space-y-3">
                      {Object.keys(filterCategories).map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={(filterCategories as any)[cat]}
                            onChange={() => {
                              setFilterCategories(prev => ({
                                ...prev,
                                [cat]: !(prev as any)[cat]
                              }));
                            }}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-md bg-neo-surface neo-shadow-inset flex items-center justify-center transition-all group-hover:scale-105 ${
                            (filterCategories as any)[cat] ? 'text-primary' : 'text-transparent'
                          }`}>
                            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                          </div>
                          <span className="text-sm text-on-surface font-medium">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Min/Max Inputs */}
                  <div className="mb-8">
                    <h3 className="text-xs font-headline font-semibold text-on-surface-variant mb-4 tracking-wide uppercase">Budget Range (₹)</h3>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 bg-neo-surface neo-shadow-inset rounded-xl px-3 py-2 flex items-center">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          value={filterMinBudget}
                          onChange={(e) => setFilterMinBudget(e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-on-surface p-0"
                        />
                      </div>
                      <span className="text-on-surface-variant text-xs font-bold">—</span>
                      <div className="flex-1 bg-neo-surface neo-shadow-inset rounded-xl px-3 py-2 flex items-center">
                        <input 
                          type="number" 
                          placeholder="Max" 
                          value={filterMaxBudget}
                          onChange={(e) => setFilterMaxBudget(e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-on-surface p-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timeframe Filter Buttons */}
                  <div>
                    <h3 className="text-xs font-headline font-semibold text-on-surface-variant mb-4 tracking-wide uppercase">Timeframe</h3>
                    <div className="flex flex-col gap-2.5">
                      {['All', '< 1 Week', '1-4 Weeks', '1-3 Months'].map((tf) => (
                        <button 
                          key={tf}
                          onClick={() => setFilterTimeframe(tf === 'All' ? null : tf)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            (tf === 'All' && filterTimeframe === null) || filterTimeframe === tf
                              ? 'bg-neo-surface neo-shadow-inset text-primary font-bold'
                              : 'bg-neo-surface neo-shadow-raised text-on-surface-variant hover:text-on-surface hover:scale-[1.02]'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset filters button */}
                <button 
                  onClick={() => {
                    setFilterCategories({ Design: true, Development: true, Writing: true });
                    setFilterMinBudget('');
                    setFilterMaxBudget('');
                    setFilterTimeframe(null);
                    setSearchQuery('');
                    addNotification('Filters reset successfully', 'info');
                  }}
                  className="w-full py-3 bg-neo-surface text-on-surface-variant hover:text-primary font-bold rounded-xl neo-shadow-raised hover:scale-[1.01] active:neo-shadow-inset transition-all text-xs tracking-wider uppercase"
                >
                  Clear Filters
                </button>
              </aside>

              {/* Right Main Feed Grid */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div>
                    <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Recommended Jobs</h1>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">Showing {filteredJobs.length} matches based on your filters</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <span>Sort by:</span>
                    <span className="font-semibold text-primary cursor-pointer hover:underline">Newest</span>
                  </div>
                </div>

                {/* Main list of recommended jobs */}
                {filteredJobs.length === 0 ? (
                  <div className="bg-neo-surface rounded-2xl p-12 text-center neo-shadow-raised flex flex-col items-center">
                    <Briefcase className="w-12 h-12 text-on-surface-variant mb-4 opacity-50" />
                    <p className="font-headline text-lg font-bold text-on-surface mb-2">No matching jobs found</p>
                    <p className="text-sm text-on-surface-variant max-w-sm mb-6">Try relaxing your search terms or sidebar filters to discover more open freelance opportunities.</p>
                    <button 
                      onClick={() => {
                        setFilterCategories({ Design: true, Development: true, Writing: true });
                        setFilterMinBudget('');
                        setFilterMaxBudget('');
                        setFilterTimeframe(null);
                        setSearchQuery('');
                      }}
                      className="px-6 py-2.5 bg-neo-surface neo-shadow-raised text-primary font-bold rounded-xl text-xs active:neo-shadow-inset transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised hover:scale-[1.005] transition-transform duration-300 flex flex-col gap-4 relative"
                      >
                        {/* Bookmark Button top right */}
                        <button 
                          onClick={() => toggleBookmark(job.id)}
                          className="absolute top-6 right-6 w-10 h-10 bg-neo-surface neo-shadow-raised rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary active:neo-shadow-inset transition-all"
                        >
                          {bookmarkedJobIds.includes(job.id) ? (
                            <BookmarkCheck className="w-5 h-5 text-primary" />
                          ) : (
                            <Bookmark className="w-5 h-5 text-on-surface-variant" />
                          )}
                        </button>

                        <div className="pr-12">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              job.category === 'Design' 
                                ? 'bg-indigo-100 text-indigo-700' 
                                : job.category === 'Development' 
                                  ? 'bg-emerald-100 text-emerald-700' 
                                  : 'bg-amber-100 text-amber-700'
                            }`}>
                              {job.category}
                            </span>
                            {job.featured && (
                              <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary-container text-[10px] font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-headline font-bold text-on-surface mb-2">{job.title}</h3>
                          
                          <p className="text-xs text-on-surface-variant flex items-center gap-2 font-medium">
                            <span>🏢 {job.companyName}</span>
                            <span>•</span>
                            <span>⏱️ {job.postedAt}</span>
                            {job.location && (
                              <>
                                <span>•</span>
                                <span>📍 {job.location}</span>
                              </>
                            )}
                          </p>
                        </div>

                        <p className="text-sm text-on-surface/80 leading-relaxed mt-1">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-neo-surface neo-shadow-inset-sm text-xs text-on-surface-variant font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-on-surface/10 flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Budget</span>
                            <span className="text-lg font-bold text-on-surface">{job.budgetRange}</span>
                          </div>
                          <button 
                            onClick={() => addNotification('Application started! Let’s lock this gig in.', 'success')}
                            className="px-5 py-2.5 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset text-sm font-semibold rounded-xl hover:scale-105 transition-all"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* VIEW 3: HIRE FREELANCERS (DISCOVER TALENT GRID) */}
          {activeTab === 'hire_freelancers' && (
            <motion.div
              key="hire_freelancers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-10 py-8"
            >
              {/* Header and Pill Category Switchers */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">Discover Top Talent</h1>
                  <p className="text-on-surface-variant font-medium">Find the perfect expert for your next big project.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar py-2">
                  <div className="bg-neo-surface neo-shadow-inset flex p-1.5 rounded-xl shrink-0">
                    {(['All', 'Design', 'Development', 'Writing'] as const).map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedFreelancerCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          selectedFreelancerCategory === cat
                            ? 'bg-neo-surface neo-shadow-raised text-primary'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Freelancers Directory Grid */}
              {filteredFreelancers.length === 0 ? (
                <div className="bg-neo-surface rounded-2xl p-12 text-center neo-shadow-raised flex flex-col items-center max-w-xl mx-auto w-full">
                  <UserPlus className="w-12 h-12 text-on-surface-variant mb-4 opacity-50" />
                  <p className="font-headline text-lg font-bold text-on-surface mb-2">No freelancers found</p>
                  <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">We could not find any active freelancers matching "{searchQuery}" under {selectedFreelancerCategory}.</p>
                  <button 
                    onClick={() => { setSelectedFreelancerCategory('All'); setSearchQuery(''); }}
                    className="px-5 py-2.5 bg-neo-surface neo-shadow-raised text-primary font-bold rounded-xl text-xs active:neo-shadow-inset transition-all"
                  >
                    View All Freelancers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredFreelancers.map((freelancer) => (
                    <div 
                      key={freelancer.id} 
                      className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
                    >
                      <div className="flex justify-between items-start">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-neo-surface neo-shadow-inset p-1.5 shrink-0 relative">
                          <img 
                            className="w-full h-full rounded-full object-cover" 
                            alt={freelancer.name} 
                            src={freelancer.avatar} 
                          />
                          {freelancer.online && (
                            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-neo-surface z-10" />
                          )}
                        </div>

                        {/* Rate & Rating badge */}
                        <div className="flex flex-col items-end">
                          <div className="text-xl font-bold text-primary">
                            ₹{freelancer.hourlyRate.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-on-surface-variant">/hr</span>
                          </div>
                          
                          <div className="flex items-center gap-1 mt-2 bg-neo-surface neo-shadow-inset-sm px-2.5 py-0.5 rounded-full">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-on-surface">{freelancer.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-headline font-bold text-on-surface mb-1">{freelancer.name}</h3>
                        <p className="text-xs text-on-surface-variant font-semibold">{freelancer.title}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {freelancer.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold text-on-surface-variant bg-neo-surface px-2.5 py-1 rounded-full neo-shadow-raised-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Dynamic Hire Me Button */}
                      <button 
                        onClick={() => handleOpenHire(freelancer)}
                        className="w-full bg-neo-surface text-primary font-bold py-3 rounded-xl neo-shadow-raised hover:text-tertiary active:scale-[0.98] active:neo-shadow-inset transition-all duration-200 flex justify-center items-center gap-2 mt-2"
                      >
                        <span>Hire Me</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW 4: MESSAGES INBOX (INTERACTIVE CHAT PANELS) */}
          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-8 py-8 h-[calc(100vh-180px)] min-h-[550px]"
            >
              {/* Left Pane: Inbox Threads list */}
              <div className="w-full lg:w-96 flex flex-col bg-neo-surface rounded-2xl neo-shadow-raised p-4 shrink-0 overflow-y-auto h-full">
                <h2 className="text-xl font-headline font-bold text-on-surface mb-4 px-2">Active Conversations</h2>
                
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      onClick={() => {
                        setActiveMessageId(msg.id);
                        // Mark thread as read
                        setMessages((prev) => prev.map((m) => {
                          if (m.id === msg.id) return { ...m, unread: false };
                          return m;
                        }));
                      }}
                      className={`flex gap-3 p-3.5 rounded-xl cursor-pointer transition-all ${
                        activeMessageId === msg.id 
                          ? 'bg-neo-surface neo-shadow-inset' 
                          : 'bg-neo-surface neo-shadow-raised hover:scale-[1.01]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-neo-surface neo-shadow-inset p-0.5 shrink-0 relative">
                        <img className="w-full h-full rounded-full object-cover" alt={msg.senderName} src={msg.senderAvatar} />
                        {msg.unread && (
                          <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-neo-surface" />
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm text-on-surface truncate">{msg.senderName}</p>
                          <span className="text-[10px] text-on-surface-variant font-medium shrink-0">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium truncate mb-0.5">{msg.senderTitle}</p>
                        <p className={`text-xs truncate ${msg.unread ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>
                          {msg.previewText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane: Conversation Details & Chat Window */}
              <div className="flex-grow flex flex-col bg-neo-surface rounded-2xl neo-shadow-raised h-full overflow-hidden">
                {activeMessageThread ? (
                  <div className="flex flex-col h-full">
                    {/* Active Thread Header */}
                    <div className="p-4 border-b border-on-surface/10 flex justify-between items-center bg-neo-surface-bright/40 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neo-surface neo-shadow-inset p-0.5">
                          <img className="w-full h-full rounded-full object-cover" src={activeMessageThread.senderAvatar} alt={activeMessageThread.senderName} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface">{activeMessageThread.senderName}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium">{activeMessageThread.senderTitle}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => addNotification('Voice Call simulated successfully', 'info')}
                        className="text-xs font-semibold text-primary px-3 py-1.5 rounded-lg bg-neo-surface neo-shadow-raised hover:scale-105 active:neo-shadow-inset transition-transform"
                      >
                        Voice Call
                      </button>
                    </div>

                    {/* Chat Messages Body */}
                    <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4 bg-neo-surface-dim/10">
                      {activeMessageThread.replies?.map((rep, idx) => (
                        <div 
                          key={idx} 
                          className={`flex flex-col max-w-[75%] ${
                            rep.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                          }`}
                        >
                          <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                            rep.sender === 'user' 
                              ? 'bg-primary text-white font-medium rounded-tr-none shadow-sm' 
                              : 'bg-neo-surface text-on-surface neo-shadow-raised rounded-tl-none'
                          }`}>
                            <p className="whitespace-pre-line">{rep.text}</p>
                          </div>
                          <span className="text-[9px] text-on-surface-variant font-medium mt-1.5 px-1">{rep.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chat Send Input Box */}
                    <form onSubmit={handleSendChat} className="p-4 border-t border-on-surface/10 bg-neo-surface shrink-0 flex gap-3">
                      <div className="flex-grow bg-neo-surface neo-shadow-inset rounded-xl px-4 py-3 flex items-center">
                        <textarea 
                          placeholder={`Message ${activeMessageThread.senderName.split(' ')[0]}...`}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendChat(e);
                            }
                          }}
                          rows={1}
                          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface placeholder-on-surface-variant/70 p-0 resize-none max-h-24"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-12 h-12 rounded-xl bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset flex items-center justify-center shrink-0 transition-all hover:scale-105"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-on-surface-variant mb-4 opacity-40" />
                    <p className="font-headline text-lg font-bold text-on-surface mb-2">No conversation selected</p>
                    <p className="text-sm text-on-surface-variant max-w-xs">Select an active client threat from the left sidebar inbox to begin chatting in real-time!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* VIEW 5: USER DASHBOARD (PROJECTS & EARNINGS METRICS) */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-10 py-8"
            >
              {/* Dashboard Header Banner */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight mb-2">Welcome back, Aarav</h1>
                  <p className="text-on-surface-variant">Here's what's happening with your projects today.</p>
                </div>
                
                <button 
                  onClick={() => setIsPostJobOpen(true)}
                  className="bg-neo-surface text-tertiary font-bold shadow-neo-raised hover:text-primary active:neo-shadow-inset rounded-xl px-6 py-3 transition-all flex items-center gap-2 group hover:scale-105"
                >
                  <Plus className="w-5 h-5 shrink-0" />
                  <span>Quick Post</span>
                </button>
              </div>

              {/* Neomorphic Summary Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Active Projects card */}
                <div className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <div className="w-11 h-11 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant tracking-wide">Active Projects</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-headline font-bold text-on-surface">{activeProjects.length}</h2>
                    <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-medium">
                      <span className="text-emerald-500 font-bold">↑ +1</span> from last week
                    </p>
                  </div>
                </div>

                {/* Earnings card */}
                <div className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <div className="w-11 h-11 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-tertiary">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant tracking-wide">Earnings (This Month)</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-headline font-bold text-on-surface">
                      ₹{totalEarnings.toLocaleString('en-IN')}
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1 font-medium">
                      <span className="text-emerald-500 font-bold">↑ +12%</span> month over month
                    </p>
                  </div>
                </div>

                {/* Inbox card */}
                <div className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <div className="w-11 h-11 rounded-xl bg-neo-surface neo-shadow-inset flex items-center justify-center text-primary">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant tracking-wide">Unread Messages</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-headline font-bold text-on-surface">{unreadMessagesCount}</h2>
                    <p className="text-xs text-on-surface-variant mt-1.5 font-medium">From active freelancer threads</p>
                  </div>
                </div>
              </div>

              {/* Main Active Projects Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Active Projects Tracker (Left, 8-cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <h2 className="text-xl font-headline font-bold text-on-surface px-2">Active Project Workspace</h2>
                  
                  {activeProjects.length === 0 ? (
                    <div className="bg-neo-surface rounded-2xl p-8 text-center neo-shadow-raised">
                      <p className="text-sm text-on-surface-variant mb-4">No active freelance projects at the moment.</p>
                      <button 
                        onClick={() => setActiveTab('hire_freelancers')}
                        className="px-5 py-2.5 bg-neo-surface neo-shadow-raised text-primary font-bold rounded-xl text-xs active:neo-shadow-inset transition-all"
                      >
                        Hire a Freelancer
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {activeProjects.map((proj) => (
                        <div key={proj.id} className="bg-neo-surface rounded-2xl p-6 neo-shadow-raised flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-neo-surface neo-shadow-inset p-0.5 shrink-0">
                              <img className="w-full h-full rounded-full object-cover" src={proj.freelancerAvatar} alt={proj.freelancerName} />
                            </div>
                            <div>
                              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{proj.title}</h3>
                              <p className="text-xs text-on-surface-variant font-medium">
                                Assigned to <span className="font-semibold text-on-surface">{proj.freelancerName}</span> • {proj.freelancerTitle}
                              </p>
                              <p className="text-xs font-semibold text-primary mt-1">Budget: {proj.budget}</p>
                            </div>
                          </div>

                          {/* Progress slider and action buttons */}
                          <div className="w-full sm:w-56 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                              <span>Milestone Progress</span>
                              <span className="font-bold text-on-surface">{proj.progress}%</span>
                            </div>
                            
                            <div className="w-full h-3 bg-neo-surface neo-shadow-inset rounded-full overflow-hidden p-0.5">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-500" 
                                style={{ width: `${proj.progress}%` }}
                              />
                            </div>

                            <div className="flex gap-2 justify-end mt-1">
                              <button 
                                onClick={() => {
                                  setActiveProjects(prev => prev.map(p => {
                                    if (p.id === proj.id) return { ...p, progress: Math.min(100, p.progress + 15) };
                                    return p;
                                  }));
                                  addNotification('Progress updated!', 'success');
                                }}
                                className="px-3 py-1.5 bg-neo-surface neo-shadow-raised hover:text-primary rounded-lg text-[10px] font-bold"
                              >
                                Log Work
                              </button>
                              
                              <button 
                                onClick={() => handleCompleteProject(proj.id, proj.budget)}
                                className="px-3 py-1.5 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary rounded-lg text-[10px] font-bold"
                              >
                                Release Funds
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Saved / Bookmarked Gigs Sidebar (Right, 4-cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <h2 className="text-xl font-headline font-bold text-on-surface px-2">Bookmarked Jobs</h2>
                  
                  {bookmarkedJobIds.length === 0 ? (
                    <div className="bg-neo-surface rounded-2xl p-6 text-center neo-shadow-raised">
                      <p className="text-xs text-on-surface-variant">Your bookmarked freelance opportunities will appear here.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {jobs.filter(j => bookmarkedJobIds.includes(j.id)).map((job) => (
                        <div key={job.id} className="bg-neo-surface rounded-2xl p-5 neo-shadow-raised flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-primary-container text-on-primary-container rounded">
                              {job.category}
                            </span>
                            <button 
                              onClick={() => toggleBookmark(job.id)}
                              className="text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <h4 className="font-headline font-bold text-sm text-on-surface hover:text-primary cursor-pointer" onClick={() => { setActiveTab('find_work'); setSearchQuery(job.title); }}>
                            {job.title}
                          </h4>
                          <p className="text-[10px] text-on-surface-variant">🏢 {job.companyName}</p>
                          <p className="text-xs font-bold text-primary mt-1">{job.budgetRange}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER SECTION COMPONENT */}
      <footer className="bg-neo-surface text-on-surface-variant border-t border-on-surface/10 py-12 px-6 md:px-12 transition-all mt-auto shadow-[inset_0px_4px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <img 
              alt="MyScalper Logo" 
              className="h-8 w-auto object-contain self-start" 
              src={theme === 'cool' ? darkLogo : "https://lh3.googleusercontent.com/aida-public/AB6AXuDcU0pc5qO5N9ZdbTceuEu0bfqGTVP9V34istweg22fXYsb7tiS0BpeOtab95YE6rF8cP5mX56X2pZKZ5Rf9DVwi9E_Rw0Bo9hN-MsAHjqytE27s9Wsq6hmGu_A_ttyO5Vdt2gRqYWIAxR80baEhY7bINptOLnjYXevi4k7JLPh-5L7hprrElBBze90vrGGsDREXOChSQXFaiBmW6T6Ka73V6slaFpkBzn9Syj8CX3N-0zT454Vx_Vg86c6T8BNYz88l5uCw6vzlCdb"}
              referrerPolicy="no-referrer"
            />
            <p className="text-xs leading-relaxed max-w-xs font-medium">
              The premium neomorphic platform connecting world-class talent with forward-thinking companies. Elevate your projects with tactile design and seamless collaboration.
            </p>
            <p className="text-xs text-on-surface-variant font-bold mt-2">© 2026 MyScalper. All rights reserved.</p>
          </div>

          {/* Nav Links Col 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-bold text-on-surface mb-2 text-base">Platform</h4>
            <button onClick={() => setActiveTab('find_work')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">Find Work</button>
            <button onClick={() => setActiveTab('hire_freelancers')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">Hire Freelancers</button>
            <button onClick={() => setActiveTab('dashboard')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">User Dashboard</button>
          </div>

          {/* Nav Links Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-bold text-on-surface mb-2 text-base">Support</h4>
            <button onClick={() => addNotification('Help Center page is simulated', 'info')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">Help Center</button>
            <button onClick={() => addNotification('Community Forum is simulated', 'info')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">Community Hub</button>
            <button onClick={() => addNotification('T&C Policy simulated', 'info')} className="text-xs text-left text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200">Terms of Service</button>
          </div>

          {/* Dynamic Newsletter Subscription input */}
          <div className="flex flex-col gap-4">
            <h4 className="font-headline font-bold text-on-surface mb-1 text-base">Stay Updated</h4>
            <p className="text-[10px] leading-relaxed text-on-surface-variant">Subscribe to get tactical product updates and design tips.</p>
            
            <div className="flex p-1 bg-neo-surface neo-shadow-inset rounded-2xl max-w-sm">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-transparent border-none focus:ring-0 text-xs px-3 focus:outline-none placeholder:text-on-surface-variant/60"
              />
              <button 
                onClick={() => addNotification('Successfully subscribed to newsletter!', 'success')}
                className="w-10 h-10 bg-neo-surface neo-shadow-raised text-primary hover:text-tertiary active:neo-shadow-inset rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* DIALOG/MODAL: POST A JOB */}
      <AnimatePresence>
        {isPostJobOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPostJobOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-neo-surface rounded-3xl p-8 max-w-lg w-full neo-shadow-raised z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsPostJobOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-neo-surface neo-shadow-raised hover:text-primary active:neo-shadow-inset rounded-full flex items-center justify-center transition-transform"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Post a New Gig</h3>

              <form onSubmit={handlePostJobSubmit} className="space-y-5">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant">Job / Project Title *</label>
                  <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Senior iOS Engineer, Brand Specialist..."
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0"
                    />
                  </div>
                </div>

                {/* Category & Budget Type Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant">Category</label>
                    <div className="bg-neo-surface neo-shadow-inset rounded-xl px-2 py-2">
                      <select 
                        value={newJob.category}
                        onChange={(e) => setNewJob(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0 cursor-pointer font-bold"
                      >
                        <option value="Development" className="bg-neo-surface text-on-surface">Development</option>
                        <option value="Design" className="bg-neo-surface text-on-surface">Design</option>
                        <option value="Writing" className="bg-neo-surface text-on-surface">Writing</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant">Budget Type</label>
                    <div className="bg-neo-surface neo-shadow-inset rounded-xl px-2 py-2">
                      <select 
                        value={newJob.budgetType}
                        onChange={(e) => setNewJob(prev => ({ ...prev, budgetType: e.target.value as any }))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0 cursor-pointer font-bold"
                      >
                        <option value="fixed" className="bg-neo-surface text-on-surface">Fixed Price</option>
                        <option value="hourly" className="bg-neo-surface text-on-surface">Hourly Rate</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budgets range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant">
                      {newJob.budgetType === 'fixed' ? 'Total Budget (₹) *' : 'Min Rate (₹/hr) *'}
                    </label>
                    <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                      <input 
                        type="number" 
                        required
                        value={newJob.budgetMin}
                        onChange={(e) => setNewJob(prev => ({ ...prev, budgetMin: e.target.value }))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0"
                      />
                    </div>
                  </div>

                  {newJob.budgetType === 'hourly' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-on-surface-variant">Max Rate (₹/hr) *</label>
                      <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                        <input 
                          type="number" 
                          required
                          value={newJob.budgetMax}
                          onChange={(e) => setNewJob(prev => ({ ...prev, budgetMax: e.target.value }))}
                          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeframe & Tags */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant">Expected Timeframe</label>
                    <div className="bg-neo-surface neo-shadow-inset rounded-xl px-2 py-2">
                      <select 
                        value={newJob.timeframe}
                        onChange={(e) => setNewJob(prev => ({ ...prev, timeframe: e.target.value as any }))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0 cursor-pointer font-bold"
                      >
                        <option value="< 1 Week" className="bg-neo-surface text-on-surface">&lt; 1 Week</option>
                        <option value="1-4 Weeks" className="bg-neo-surface text-on-surface">1-4 Weeks</option>
                        <option value="1-3 Months" className="bg-neo-surface text-on-surface">1-3 Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant">Skills/Tags (comma separated)</label>
                    <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                      <input 
                        type="text" 
                        value={newJob.tagsString}
                        onChange={(e) => setNewJob(prev => ({ ...prev, tagsString: e.target.value }))}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xs text-on-surface p-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant">Job Description *</label>
                  <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-3">
                    <textarea 
                      required
                      placeholder="Detail the scope of work, technical requirements, and target outputs..."
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0 resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  className="w-full py-3 mt-4 bg-neo-surface text-primary hover:text-tertiary font-bold rounded-xl neo-shadow-raised hover:scale-[1.01] active:neo-shadow-inset transition-all"
                >
                  Post Job Board Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG/MODAL: HIRE FREELANCER OFFER */}
      <AnimatePresence>
        {isHireOpen && hiringTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHireOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-neo-surface rounded-3xl p-8 max-w-md w-full neo-shadow-raised z-10"
            >
              <button 
                onClick={() => setIsHireOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-neo-surface neo-shadow-raised hover:text-primary active:neo-shadow-inset rounded-full flex items-center justify-center transition-transform"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-neo-surface neo-shadow-inset p-0.5 shrink-0">
                  <img className="w-full h-full rounded-full object-cover" src={hiringTarget.avatar} alt={hiringTarget.name} />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">Hire {hiringTarget.name}</h3>
                  <p className="text-xs text-on-surface-variant font-medium">{hiringTarget.title}</p>
                </div>
              </div>

              <form onSubmit={handleConfirmHire} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant">Project Name *</label>
                  <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                    <input 
                      type="text" 
                      required
                      value={hiringForm.projectTitle}
                      onChange={(e) => setHiringForm(prev => ({ ...prev, projectTitle: e.target.value }))}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant">Project Budget (₹) *</label>
                  <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                    <input 
                      type="number" 
                      required
                      value={hiringForm.budget}
                      onChange={(e) => setHiringForm(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-on-surface p-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant">Invite Proposal / Message</label>
                  <div className="bg-neo-surface neo-shadow-inset rounded-xl px-4 py-2.5">
                    <textarea 
                      value={hiringForm.message}
                      onChange={(e) => setHiringForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xs text-on-surface p-0 resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 mt-4 bg-neo-surface text-primary hover:text-tertiary font-bold rounded-xl neo-shadow-raised hover:scale-[1.01] active:neo-shadow-inset transition-all"
                >
                  Send Contract Offer
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
