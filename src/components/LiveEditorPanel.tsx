/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../translations';
import { Language, AdminRole, AdminAccount, CMSAuditLog, DealSubmission, ContactEnquiry } from '../types';
import {
  Settings,
  Edit2,
  Upload,
  X,
  Search,
  Sparkles,
  Globe,
  RefreshCw,
  FileText,
  Check,
  Eye,
  HelpCircle,
  Info,
  Trash2,
  Layers,
  Image as ImageIcon,
  Lock,
  Unlock,
  Users,
  LogOut,
  Plus,
  Shield,
  Key,
  Inbox,
  Briefcase,
  Download,
  Clipboard,
  Mail,
  AlertCircle
} from 'lucide-react';
import DragonLogo from './DragonLogo';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface LiveEditorPanelProps {
  language: Language;
  onRefresh: () => void;
}

// Map logical translation keys to sections
const SECTIONS = [
  {
    id: 'header-nav',
    nameEN: 'Header, Footer & Navigation',
    nameVI: 'Thanh điều hướng & Chân trang',
    keys: [
      'NAV_HOME', 'NAV_ABOUT', 'NAV_SERVICES', 'NAV_GOVERNANCE', 'NAV_INDUSTRIES', 
      'NAV_PROCESS', 'NAV_INSIGHTS', 'NAV_FOUNDERS', 'NAV_CONTACT', 'NAV_ALIGNMENT', 
      'BTN_SUBMIT_DEAL', 'BTN_BOOK_DISCUSSION', 'MANAGED_BY', 'THINK_FORWARD', 'BEYOND_ROUND', 
      'FOOTER_SHORT_DESC', 'FOOTER_RIGHTS', 'FOOTER_LOCATION_LABEL', 'FOOTER_CONTACT', 
      'FOOTER_SERVICES', 'FOOTER_COMPANY', 'FOOTER_LEGAL', 'PRIVACY_POLICY', 'TERMS_OF_USE', 
      'ADVISORY_DISCLAIMER', 'CONFIDENTIALITY_NOTICE'
    ]
  },
  {
    id: 'hero',
    nameEN: 'Hero Section & Intro Statement',
    nameVI: 'Lời tâm huyết & Phần Mở đầu',
    keys: [
      'HERO_BADGE', 'HERO_TITLE', 'HERO_DESC', 'HERO_CTA_PRIMARY', 'HERO_CTA_SECONDARY',
      'HERO_SUBTEXT', 'TRUST_TITLE', 'TRUST_DESC'
    ]
  },
  {
    id: 'services',
    nameEN: 'Core Advisory Services',
    nameVI: 'Hạng mục Dịch vụ Tư vấn',
    keys: [
      'SERV_TITLE', 'SERV_SUBTITLE', 'SERV_LEARN_MORE', 
      'SERV_1_TITLE', 'SERV_1_DESC', 'SERV_2_TITLE', 'SERV_2_DESC', 
      'SERV_3_TITLE', 'SERV_3_DESC', 'SERV_4_TITLE', 'SERV_4_DESC', 
      'SERV_5_TITLE', 'SERV_5_DESC', 'SERV_6_TITLE', 'SERV_6_DESC'
    ]
  },
  {
    id: 'industries-why',
    nameEN: 'Consumer Economy & Why Choose Us',
    nameVI: 'Lĩnh vực Trọng điểm & Điểm vượt trội',
    keys: [
      'IND_TITLE', 'IND_DESC', 
      'IND_1_TITLE', 'IND_1_SUB', 'IND_2_TITLE', 'IND_2_SUB', 
      'IND_3_TITLE', 'IND_3_SUB', 'IND_4_TITLE', 'IND_4_SUB', 'IND_5_TITLE', 'IND_5_SUB',
      'WHY_TITLE', 'WHY_1_TITLE', 'WHY_1_DESC', 'WHY_2_TITLE', 'WHY_2_DESC', 
      'WHY_3_TITLE', 'WHY_3_DESC', 'WHY_4_TITLE', 'WHY_4_DESC', 'WHY_QUOTE'
    ]
  },
  {
    id: 'process-alignment',
    nameEN: 'Process & Alignment Fee Model',
    nameVI: 'Quy trình & Biểu phí Đồng hành',
    keys: [
      'PROC_TITLE', 'PROC_SUBTITLE', 'PROC_DISCLAIMER_NOTE', 
      'ALIGN_TITLE', 'ALIGN_SUBTITLE', 'ALIGN_1_TITLE', 'ALIGN_1_SUB', 'ALIGN_1_DESC', 
      'ALIGN_2_TITLE', 'ALIGN_2_SUB', 'ALIGN_2_DESC', 'ALIGN_3_TITLE', 'ALIGN_3_SUB', 
      'ALIGN_3_DESC', 'ALIGN_FOOTNOTE'
    ]
  },
  {
    id: 'checklist-insights',
    nameEN: 'Founder Fit & Resources',
    nameVI: 'Bản tự đánh giá & Góc Nhìn sáng lập',
    keys: [
      'FIT_TITLE', 'FIT_Q1', 'FIT_Q2', 'FIT_Q3', 'FIT_Q4', 'FIT_Q5', 'FIT_Q6', 'FIT_CTA', 
      'FIT_SECONDARY', 'INSIGHTS_TITLE', 'INSIGHTS_CTA', 'FINAL_CTA_TITLE', 'FINAL_CTA_DESC'
    ]
  },
  {
    id: 'modals-ui',
    nameEN: 'Inquiry Modals & UI Tokens',
    nameVI: 'Mẫu Đơn Bảo mật & Thẻ chức năng',
    keys: [
      'MODAL_BOOK_BADGE', 'MODAL_BOOK_TITLE', 'MODAL_SUBMIT_BADGE', 'MODAL_SUBMIT_TITLE', 
      'MODAL_SUBMIT_SUB', 'BACK_TO_HOME', 'SUBMIT', 'SUCCESS', 'SUBMIT_INQUIRY', 
      'SEND_MESSAGE', 'BOOK_MEETING', 'LEARN_MORE', 'GET_IN_TOUCH', 'READ_ARTICLE', 
      'EST_READING_TIME', 'CATEGORY'
    ]
  }
];

// Seeding and storage utilities for security-conscious, offline-first client CMS admin controls
const seedAdminAccounts = (): AdminAccount[] => {
  if (typeof window === 'undefined') return [];
  const existing = localStorage.getItem('ag_admin_accounts');
  if (!existing) {
    const defaultAccounts: AdminAccount[] = [
      {
        username: 'admin',
        name: 'AG Executive Senior Partner',
        role: 'Super Admin',
        dateCreated: '2026-06-01',
        passwordHash: 'admin'
      },
      {
        username: 'editor',
        name: 'AG Content Curator',
        role: 'Editor',
        dateCreated: '2026-06-01',
        passwordHash: 'editor'
      }
    ];
    localStorage.setItem('ag_admin_accounts', JSON.stringify(defaultAccounts));
    return defaultAccounts;
  }
  return JSON.parse(existing) as AdminAccount[];
};

const getAuditLogs = (): CMSAuditLog[] => {
  if (typeof window === 'undefined') return [];
  const existing = localStorage.getItem('ag_cms_audit_logs');
  return existing ? (JSON.parse(existing) as CMSAuditLog[]) : [];
};

const appendAuditLog = (username: string, role: string, action: string): CMSAuditLog[] => {
  if (typeof window === 'undefined') return [];
  const logs = getAuditLogs();
  const newLog: CMSAuditLog = {
    id: 'log_' + Date.now() + Math.random().toString(36).substr(2, 4),
    username,
    role: role as AdminRole,
    action,
    timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19)
  };
  const updated = [newLog, ...logs].slice(0, 100);
  localStorage.setItem('ag_cms_audit_logs', JSON.stringify(updated));
  return updated;
};

export default function LiveEditorPanel({ language, onRefresh }: LiveEditorPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'leads' | 'admin'>('text');
  
  // Leads submissions state
  const [dealSubmissions, setDealSubmissions] = useState<DealSubmission[]>([]);
  const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>([]);
  const [governanceDiagnostics, setGovernanceDiagnostics] = useState<any[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<any[]>([]);
  
  // Firebase User Authentication state
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setFirebaseUser(result.user);
      loadLeadsData();
    } catch (err) {
      console.error('Google sign in failed:', err);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      setFirebaseUser(null);
      loadLeadsData();
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };
  
  const [activeLeadsSubTab, setActiveLeadsSubTab] = useState<'deals' | 'contacts' | 'governance' | 'newsletter'>('deals');
  const [leadsSearchQuery, setLeadsSearchQuery] = useState('');

  const loadLeadsData = async () => {
    // First load from local storage to populate immediately
    let localDeals = [];
    let localContacts = [];
    let localGov = [];
    let localNews = [];

    if (typeof window !== 'undefined') {
      try {
        localDeals = JSON.parse(localStorage.getItem('ag_deal_submissions') || '[]');
        localContacts = JSON.parse(localStorage.getItem('ag_contact_enquiries') || '[]');
        localGov = JSON.parse(localStorage.getItem('ag_governance_diagnostics') || '[]');
        localNews = JSON.parse(localStorage.getItem('ag_subscribers') || '[]');
        
        setDealSubmissions(Array.isArray(localDeals) ? [...localDeals].reverse() : []);
        setContactEnquiries(Array.isArray(localContacts) ? [...localContacts].reverse() : []);
        setGovernanceDiagnostics(Array.isArray(localGov) ? [...localGov].reverse() : []);
        setNewsletterSubscribers(Array.isArray(localNews) ? [...localNews].reverse() : []);
      } catch (err) {
        console.error('Error loading leads data from localStorage:', err);
      }
    }

    // Try fetching from Firestore database if connected and authenticated
    try {
      try {
        const dealsSnapshot = await getDocs(collection(db, 'dealSubmissions'));
        const dealsList = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDealSubmissions(dealsList as any);
      } catch (err) {
        console.log('Error loading deals from Firestore:', err);
      }

      try {
        const contactsSnapshot = await getDocs(collection(db, 'contactEnquiries'));
        const contactsList = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContactEnquiries(contactsList as any);
      } catch (err) {
        console.log('Error loading contacts from Firestore:', err);
      }

      try {
        const gobSnapshot = await getDocs(collection(db, 'governanceDiagnostics'));
        const govList = gobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGovernanceDiagnostics(govList);
      } catch (err) {
        console.log('Error loading governance diagnostics from Firestore:', err);
      }

      try {
        const newsSnapshot = await getDocs(collection(db, 'newsletterSubscribers'));
        const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNewsletterSubscribers(newsList);
      } catch (err) {
        console.log('Error loading newsletter subscribers from Firestore:', err);
      }
    } catch (generalErr) {
      console.log('Firestore load deferred or unauthorized. Using local fallback cache.', generalErr);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'leads') {
      loadLeadsData();
    }
  }, [isOpen, activeTab]);

  const handleDeleteSubmission = async (type: 'deal' | 'contact' | 'gov' | 'news', id: string) => {
    if (!window.confirm(
      language === 'EN'
        ? 'Are you sure you want to delete this record?'
        : 'Bạn có chắc chắn muốn xóa bản ghi này không?'
    )) return;

    try {
      if (type === 'deal') {
        // Delete from Firestore
        try {
          await deleteDoc(doc(db, 'dealSubmissions', id));
        } catch (err) {
          console.error('Firestore record delete failed:', err);
        }

        const raw = localStorage.getItem('ag_deal_submissions');
        if (raw) {
          const list = JSON.parse(raw);
          const filtered = list.filter((item: any) => item.id !== id);
          localStorage.setItem('ag_deal_submissions', JSON.stringify(filtered));
          if (loggedInUser) {
            appendAuditLog(loggedInUser.username, loggedInUser.role, `Deleted deal submission: ${id}`);
          }
        }
      } else if (type === 'contact') {
        // Delete from Firestore
        try {
          await deleteDoc(doc(db, 'contactEnquiries', id));
        } catch (err) {
          console.error('Firestore contact delete failed:', err);
        }

        const raw = localStorage.getItem('ag_contact_enquiries');
        if (raw) {
          const list = JSON.parse(raw);
          const filtered = list.filter((item: any) => item.id !== id);
          localStorage.setItem('ag_contact_enquiries', JSON.stringify(filtered));
          if (loggedInUser) {
            appendAuditLog(loggedInUser.username, loggedInUser.role, `Deleted contact enquiry: ${id}`);
          }
        }
      } else if (type === 'gov') {
        // Delete from Firestore
        try {
          await deleteDoc(doc(db, 'governanceDiagnostics', id));
        } catch (err) {
          console.error('Firestore governance delete failed:', err);
        }

        const raw = localStorage.getItem('ag_governance_diagnostics');
        if (raw) {
          const list = JSON.parse(raw);
          const filtered = list.filter((item: any) => item.timestamp !== id && item.email !== id && item.id !== id);
          localStorage.setItem('ag_governance_diagnostics', JSON.stringify(filtered));
          if (loggedInUser) {
            appendAuditLog(loggedInUser.username, loggedInUser.role, `Deleted governance diagnostic draft`);
          }
        }
      } else if (type === 'news') {
        // Delete from Firestore
        try {
          await deleteDoc(doc(db, 'newsletterSubscribers', id));
        } catch (err) {
          console.error('Firestore subscription delete failed:', err);
        }

        const raw = localStorage.getItem('ag_subscribers');
        if (raw) {
          const list = JSON.parse(raw);
          const filtered = list.filter((item: any) => item.email !== id && item.id !== id);
          localStorage.setItem('ag_subscribers', JSON.stringify(filtered));
          if (loggedInUser) {
            appendAuditLog(loggedInUser.username, loggedInUser.role, `Deleted newsletter subscription: ${id}`);
          }
        }
      }
      loadLeadsData();
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  const handleExportData = (typeStr: 'deals' | 'contacts' | 'governance' | 'newsletter') => {
    let dataToExport: any[] = [];
    let filename = `ag_${typeStr}_export_${new Date().toISOString().split('T')[0]}`;
    
    if (typeStr === 'deals') dataToExport = dealSubmissions;
    else if (typeStr === 'contacts') dataToExport = contactEnquiries;
    else if (typeStr === 'governance') dataToExport = governanceDiagnostics;
    else if (typeStr === 'newsletter') dataToExport = newsletterSubscribers;

    if (dataToExport.length === 0) {
      alert(language === 'EN' 
        ? 'No data available to export.' 
        : 'Không có dữ liệu để xuất.'
      );
      return;
    }

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${filename}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (loggedInUser) {
      const logs = appendAuditLog(loggedInUser.username, loggedInUser.role, `Exported ${typeStr} dataset as JSON`);
      setAuditLogs(logs);
    }
  };

  // Secret activation of whole site customizer tools togglable by URL parameter
  const [isCmsEnabled, setIsCmsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_cms_enabled') === 'true';
    }
    return false;
  });
  const [textLanguage, setTextLanguage] = useState<Language>(language);
  const [selectedSection, setSelectedSection] = useState<string>('header-nav');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom logo style state variables (default, empty, hidden)
  const [logoStyle, setLogoStyle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_logo_style') || 'default';
    }
    return 'default';
  });

  // Admin and CMS Role authentication state
  const [loggedInUser, setLoggedInUser] = useState<AdminAccount | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('ag_admin_session');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [auditLogs, setAuditLogs] = useState<CMSAuditLog[]>([]);
  
  // Admin Login Inputs
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Manage Admin Accounts action form
  const [adminSubTab, setAdminSubTab] = useState<'users' | 'logs'>('users');
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('Editor');
  const [addAccountError, setAddAccountError] = useState('');
  const [addAccountSuccess, setAddAccountSuccess] = useState('');

  const handleLogoStyleChange = (style: string) => {
    localStorage.setItem('ag_logo_style', style);
    setLogoStyle(style);
    
    if (loggedInUser) {
      const logs = appendAuditLog(loggedInUser.username, loggedInUser.role, `Logo display set to: ${style}`);
      setAuditLogs(logs);
    }

    // Fire global custom events to notify Logo components to reload
    window.dispatchEvent(new Event('logo_changed'));
    onRefresh();
  };
  
  // Custom logo state variables
  const [logoOption, setLogoOption] = useState<'url' | 'upload'>('url');
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const [currentLogoPreview, setCurrentLogoPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success indicator for copy and save
  const [hasSaved, setHasSaved] = useState<Record<string, boolean>>({});

  // On mount, load initial states
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Seed accounts and load log lists
      const seeded = seedAdminAccounts();
      setAccounts(seeded);
      setAuditLogs(getAuditLogs());

      const storedLogo = localStorage.getItem('ag_custom_logo');
      if (storedLogo) {
        setCurrentLogoPreview(storedLogo);
        if (storedLogo.startsWith('http')) {
          setLogoUrlInput(storedLogo);
        }
      }
      const style = localStorage.getItem('ag_logo_style') || 'default';
      setLogoStyle(style);
    }

    const handleOpenLogoEditor = () => {
      setIsOpen(true);
      setActiveTab('image');
      setLogoOption('upload');
    };

    const handleCmsStateChanged = () => {
      setIsCmsEnabled(localStorage.getItem('ag_cms_enabled') === 'true');
    };

    window.addEventListener('open_logo_editor', handleOpenLogoEditor);
    window.addEventListener('cms_state_changed', handleCmsStateChanged);
    return () => {
      window.removeEventListener('open_logo_editor', handleOpenLogoEditor);
      window.removeEventListener('cms_state_changed', handleCmsStateChanged);
    };
  }, []);

  // Update editor's active language when user toggles language state in top header
  useEffect(() => {
    setTextLanguage(language);
  }, [language]);

  // Handle translation change
  const handleTextChange = (key: string, newValue: string) => {
    // Write directly to translations memory structure
    TRANSLATIONS[textLanguage][key] = newValue;

    // Load existing local storage overrides
    try {
      const saved = localStorage.getItem('ag_translations_overrides');
      const overrides = saved ? JSON.parse(saved) : { EN: {}, VI: {} };
      
      overrides[textLanguage][key] = newValue;
      localStorage.setItem('ag_translations_overrides', JSON.stringify(overrides));
      
      // Highlight changes with success badge
      setHasSaved(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setHasSaved(prev => ({ ...prev, [key]: false }));
      }, 1500);

      if (loggedInUser) {
        const previewStr = newValue.length > 25 ? newValue.slice(0, 25) + '...' : newValue;
        const logs = appendAuditLog(
          loggedInUser.username,
          loggedInUser.role,
          `Modified "${key}" (${textLanguage}) to: "${previewStr}"`
        );
        setAuditLogs(logs);
      }

      // Trigger dynamic react re-render recursively
      onRefresh();
    } catch (e) {
      console.error('Error saving translation overrides:', e);
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError(textLanguage === 'EN' ? 'Please enter both login fields.' : 'Vui lòng cung cấp đầy đủ thông tin.');
      return;
    }
    
    const currentAccounts = seedAdminAccounts();
    const matched = currentAccounts.find(acc => acc.username.toLowerCase() === loginUsername.trim().toLowerCase());
    
    if (matched && matched.passwordHash === loginPassword) {
      sessionStorage.setItem('ag_admin_session', JSON.stringify(matched));
      setLoggedInUser(matched);
      const logs = appendAuditLog(matched.username, matched.role, 'Admin session authenticated.');
      setAuditLogs(logs);
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError(
        textLanguage === 'EN' 
          ? 'Invalid Admin Credentials. Please check username/password.' 
          : 'Tên hoặc mật khẩu đăng nhập không đúng.'
      );
    }
  };

  // Logout handler
  const handleLogout = () => {
    if (loggedInUser) {
      const logs = appendAuditLog(loggedInUser.username, loggedInUser.role, 'Logged out from session.');
      setAuditLogs(logs);
    }
    sessionStorage.removeItem('ag_admin_session');
    setLoggedInUser(null);
  };

  // Create new Admin Account handler
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setAddAccountError('');
    setAddAccountSuccess('');
    
    if (!newUsername.trim() || !newName.trim() || !newPassword.trim()) {
      setAddAccountError(textLanguage === 'EN' ? 'All user details are mandatory.' : 'Vui lòng điền đủ mọi chi tiết.');
      return;
    }

    const currentAccounts = seedAdminAccounts();
    const exists = currentAccounts.some(acc => acc.username.toLowerCase() === newUsername.trim().toLowerCase());
    
    if (exists) {
      setAddAccountError(
        textLanguage === 'EN' 
          ? `Username "${newUsername}" is already taken.` 
          : `Tài khoản "${newUsername}" đã được đăng ký.`
      );
      return;
    }

    const created: AdminAccount = {
      username: newUsername.trim().toLowerCase(),
      name: newName.trim(),
      role: newRole,
      dateCreated: new Date().toISOString().split('T')[0],
      passwordHash: newPassword
    };

    const updated = [...currentAccounts, created];
    localStorage.setItem('ag_admin_accounts', JSON.stringify(updated));
    setAccounts(updated);
    
    if (loggedInUser) {
      const logs = appendAuditLog(
        loggedInUser.username, 
        loggedInUser.role, 
        `Created ${newRole}: ${created.username} (${created.name})`
      );
      setAuditLogs(logs);
    }
    
    setNewUsername('');
    setNewName('');
    setNewPassword('');
    setNewRole('Editor');
    setAddAccountSuccess(
      textLanguage === 'EN' 
        ? 'Account successfully generated.' 
        : 'Đăng ký tài khoản mới thành công.'
    );
    
    setTimeout(() => setAddAccountSuccess(''), 3000);
  };

  // Delete Admin Account handler
  const handleDeleteAccount = (usernameToDelete: string) => {
    if (usernameToDelete === 'admin') {
      alert(textLanguage === 'EN' ? 'Primary Super Admin lock prevented this action.' : 'Tài khoản Super Admin chính không thể bị xóa.');
      return;
    }

    if (loggedInUser?.username === usernameToDelete) {
      alert(textLanguage === 'EN' ? 'You cannot terminate your own active session.' : 'Không thể xóa tài khoản hiện tại của bạn.');
      return;
    }

    if (window.confirm(
      textLanguage === 'EN' 
        ? `Confirm deletion of user account: "${usernameToDelete}"?` 
        : `Xác nhận xóa tài khoản: "${usernameToDelete}"?`
    )) {
      const currentAccounts = seedAdminAccounts();
      const filtered = currentAccounts.filter(acc => acc.username !== usernameToDelete);
      localStorage.setItem('ag_admin_accounts', JSON.stringify(filtered));
      setAccounts(filtered);
      
      if (loggedInUser) {
        const logs = appendAuditLog(
          loggedInUser.username, 
          loggedInUser.role, 
          `Deleted admin user: ${usernameToDelete}`
        );
        setAuditLogs(logs);
      }
    }
  };

  // Image Upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          localStorage.setItem('ag_custom_logo', base64);
          setCurrentLogoPreview(base64);
          
          if (loggedInUser) {
            const logs = appendAuditLog(
              loggedInUser.username,
              loggedInUser.role,
              `Uploaded new base64 logo image (${Math.round(base64.length / 1024)}kb)`
            );
            setAuditLogs(logs);
          }

          // Fire global custom events to notify Logo components to reload
          window.dispatchEvent(new Event('logo_changed'));
          onRefresh();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLogoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (logoUrlInput.trim()) {
      localStorage.setItem('ag_custom_logo', logoUrlInput.trim());
      setCurrentLogoPreview(logoUrlInput.trim());
      
      if (loggedInUser) {
        const logs = appendAuditLog(
          loggedInUser.username,
          loggedInUser.role,
          `Set custom logo URL to: ${logoUrlInput.trim()}`
        );
        setAuditLogs(logs);
      }

      window.dispatchEvent(new Event('logo_changed'));
      onRefresh();
      
      setHasSaved(prev => ({ ...prev, logo: true }));
      setTimeout(() => {
        setHasSaved(prev => ({ ...prev, logo: false }));
      }, 2000);
    }
  };

  // Reset actions
  const resetAllTranslations = () => {
    if (window.confirm(
      textLanguage === 'EN' 
        ? 'Are you sure you want to reset all customized texts?' 
        : 'Bạn có chắc chắn muốn khôi phục toàn bộ văn bản mặc định?'
    )) {
      if (loggedInUser) {
        appendAuditLog(loggedInUser.username, loggedInUser.role, 'Reset all website translation overrides to default.');
      }
      localStorage.removeItem('ag_translations_overrides');
      // Reload page to re-parse original TRANSLATIONS dictionary
      window.location.reload();
    }
  };

  const resetLogo = () => {
    localStorage.removeItem('ag_custom_logo');
    localStorage.removeItem('ag_logo_style');
    setCurrentLogoPreview(null);
    setLogoUrlInput('');
    setLogoStyle('default');
    
    if (loggedInUser) {
      const logs = appendAuditLog(loggedInUser.username, loggedInUser.role, 'Reset logo visual settings to default.');
      setAuditLogs(logs);
    }

    window.dispatchEvent(new Event('logo_changed'));
    onRefresh();
  };

  // Filter keys according to selections and search queries
  const getFilteredKeys = () => {
    let list: string[] = [];
    if (selectedSection === 'all') {
      list = SECTIONS.reduce((acc, sec) => [...acc, ...sec.keys], [] as string[]);
    } else {
      const found = SECTIONS.find(s => s.id === selectedSection);
      if (found) {
        list = found.keys;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(key => {
        const val = (TRANSLATIONS[textLanguage][key] || '').toLowerCase();
        return key.toLowerCase().includes(q) || val.includes(q);
      });
    }

    return list;
  };

  const filteredKeys = getFilteredKeys();

  return (
    <>
      {/* 1. FLOATING CONTROL LAUNCHER BUTTON - Hidden from non-editor users unless query parameters match */}
      {isCmsEnabled && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 border border-[#C9A227]/50 text-[#C9A227] hover:text-white hover:bg-[#C9A227] shadow-[0_4px_24px_rgba(201,162,39,0.3)] transition-all duration-300 font-sans font-medium text-sm hover:scale-105 active:scale-95 group"
          id="live-customizer-launcher-btn"
          title="Live Visual Editor"
        >
          <div className="relative">
            <Settings size={18} className="animate-[spin_6s_linear_infinite]" />
            <Edit2 size={9} className="absolute -top-1 -right-1 text-white group-hover:scale-125 transition-transform" />
          </div>
          <span className="tracking-wider text-xs font-semibold">
            {language === 'EN' ? 'LIVE CMS EDITOR' : 'CHỈNH SỬA TRỰC TIẾP'}
          </span>
        </button>
      )}

      {/* 2. DYNAMICS EDITOR PANEL SIDEBAR DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-950 border-l border-slate-905 z-50 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="live-editor-sidebar-container"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#C9A227]/10 text-[#C9A227]">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold font-sans text-white uppercase tracking-wider">
                {language === 'EN' ? 'Live Site Customizer' : 'Bảng Chỉnh Sửa Website'}
              </h2>
              <p className="text-[10px] text-slate-500 font-mono">AG CAPITAL ADVISORY • ACTIVE</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors"
            id="live-editor-close-btn"
          >
            <X size={16} />
          </button>
        </div>

        {/* Gated Admin Authentication vs Full CMS Actions */}
        {!loggedInUser ? (
          <div className="flex-grow flex flex-col justify-center p-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] border border-[#C9A227]/30 shadow-inner">
                <Lock size={20} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold font-sans text-white uppercase tracking-wider">
                  {language === 'EN' ? 'Authorized Terminal Login' : 'Đăng Nhập Quản Trị Viên'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {language === 'EN' 
                    ? 'Authentication required to modify enterprise content.' 
                    : 'Cần xác thực tài khoản để chỉnh sửa cấu trúc website.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {language === 'EN' ? 'Administrator ID' : 'Tên tài khoản Admin'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <Shield size={12} />
                  </span>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder={language === 'EN' ? 'e.g. admin' : 'Ví dụ: admin'}
                    className="w-full bg-slate-900 border border-slate-800 rounded pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#C9A227]/60"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {language === 'EN' ? 'Secure Passkey' : 'Khóa Bảo Mật'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <Key size={12} />
                  </span>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#C9A227]/60"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-950/20 border border-red-900/40 rounded text-[11px] text-red-300 leading-relaxed font-sans">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#C9A227] hover:bg-[#B08D20] text-slate-950 font-bold rounded text-xs tracking-wider transition-colors uppercase cursor-pointer shadow-md select-none"
              >
                {language === 'EN' ? 'Authenticate Partner Session' : 'Xác Thực Phiên Làm Việc'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Logged in User Status Panel */}
            <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-900 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-300 truncate font-sans">
                    {language === 'EN' ? 'Operator:' : 'Nhân sự:'} <strong className="text-white">{loggedInUser.name}</strong>
                  </p>
                  <span className={`inline-block px-1.5 py-0.2 mt-0.5 rounded text-[8px] font-mono tracking-wide ${
                    loggedInUser.role === 'Super Admin'
                      ? 'bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/30'
                      : 'bg-indigo-950/40 text-blue-400 border border-blue-900/30'
                  }`}>
                    {loggedInUser.role}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-[9px] text-slate-400 hover:text-red-400 flex items-center gap-1 font-mono transition-colors border border-slate-800 hover:border-red-950 px-2.5 py-1 rounded hover:bg-red-950/10 cursor-pointer shrink-0"
              >
                <LogOut size={10} />
                <span>LOGOUT</span>
              </button>
            </div>

            {/* Interactive CMS Tabs */}
            <div className="flex border-b border-slate-900/60 bg-slate-900/10 shrink-0">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 text-xs font-medium font-sans tracking-wide border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'text'
                    ? 'border-[#C9A227] text-white bg-slate-900/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/20'
                }`}
              >
                <FileText size={14} className="text-[#C9A227]" />
                {language === 'EN' ? 'Website Text' : 'Nội dung Chữ'}
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 py-3 text-xs font-medium font-sans tracking-wide border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'image'
                    ? 'border-[#C9A227] text-white bg-slate-900/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/20'
                }`}
              >
                <ImageIcon size={14} className="text-[#C9A227]" />
                {language === 'EN' ? 'Logo/Emblems' : 'Logo & Ảnh'}
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex-1 py-3 text-xs font-medium font-sans tracking-wide border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'leads'
                    ? 'border-[#C9A227] text-white bg-slate-900/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/20'
                }`}
              >
                <Inbox size={14} className="text-[#C9A227]" />
                {language === 'EN' ? 'Leads' : 'Yêu cầu'}
              </button>
              {loggedInUser.role === 'Super Admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex-1 py-3 text-xs font-medium font-sans tracking-wide border-b-2 transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'admin'
                      ? 'border-[#C9A227] text-white bg-slate-900/20'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-950/20'
                  }`}
                >
                  <Users size={14} className="text-[#C9A227]" />
                  {language === 'EN' ? 'Admins' : 'Quyền Hạn'}
                </button>
              )}
            </div>

            {/* Tab Panel Content */}
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar space-y-4">
              
              {/* TAB 1: TEXT TRANSLATION CMS */}
              {activeTab === 'text' && (
                <div className="space-y-4" id="text-cms-form-layer">
                  
                  {/* Language Selection Filter */}
                  <div className="bg-slate-900/30 p-3 rounded border border-slate-900 space-y-2">
                    <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                      <Globe size={11} className="text-[#C9A227]" />
                      {language === 'EN' ? 'Target Translation Language:' : 'Ngôn ngữ cần chỉnh sửa:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTextLanguage('EN')}
                        className={`py-1.5 rounded text-xs transition-all ${
                          textLanguage === 'EN'
                            ? 'bg-[#C9A227]/10 text-white font-bold border border-[#C9A227]/40'
                            : 'bg-slate-900 text-slate-400 border border-transparent hover:text-white'
                        }`}
                      >
                        English (EN)
                      </button>
                      <button
                        onClick={() => setTextLanguage('VI')}
                        className={`py-1.5 rounded text-xs transition-all ${
                          textLanguage === 'VI'
                            ? 'bg-[#C9A227]/10 text-white font-bold border border-[#C9A227]/40'
                            : 'bg-slate-900 text-slate-400 border border-transparent hover:text-white'
                        }`}
                      >
                        Tiếng Việt (VI)
                      </button>
                    </div>
                  </div>

                  {/* Category Dropdown and Global Search bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                        <Layers size={11} className="text-[#C9A227]" />
                        {language === 'EN' ? 'Select Page / Section:' : 'Chọn Trang / Phân mục:'}
                      </label>
                      {loggedInUser.role === 'Super Admin' ? (
                        <button
                          onClick={resetAllTranslations}
                          className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline font-mono"
                        >
                          <Trash2 size={10} />
                          {language === 'EN' ? 'Reset All Texts' : 'Khôi phục Mặc định'}
                        </button>
                      ) : (
                        <span className="text-[9px] text-slate-500 font-mono">EDIT-ONLY ACCESS</span>
                      )}
                    </div>

                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full bg-slate-900 text-xs text-white border border-slate-800 rounded px-2.5 py-2 outline-none focus:border-[#C9A227]/60"
                      id="section-selection-dropdown"
                    >
                      <option value="all">{language === 'EN' ? 'Show All Sections' : 'Hiện tất cả các phần'}</option>
                      {SECTIONS.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {language === 'EN' ? sec.nameEN : sec.nameVI}
                        </option>
                      ))}
                    </select>

                    {/* Quick Search */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-500">
                        <Search size={12} />
                      </div>
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Search texts or keywords...' : 'Tìm kiếm văn bản hoặc từ khóa...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 text-xs text-white border border-slate-800 rounded pl-7 pr-7 py-2 outline-none focus:border-[#C9A227]/60"
                        id="text-keyword-search"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-white"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Editable Fields list container */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{language === 'EN' ? 'KEY FIELDS FOUND' : 'CÁC TRƯỜNG DỮ LIỆU CHỮ'} ({filteredKeys.length})</span>
                      <span>AUTO-SAVE INSTANTLY</span>
                    </div>

                    {filteredKeys.length === 0 ? (
                      <div className="text-center py-6 border border-dashed border-slate-900 rounded">
                        <p className="text-xs text-slate-500">{language === 'EN' ? 'No fields match your search filter' : 'Không tìm thấy kết quả nào khớp'}</p>
                      </div>
                    ) : (
                      <div className="space-y-4.5" id="dynamic-inputs-scroller">
                        {filteredKeys.map((key) => {
                          const value = TRANSLATIONS[textLanguage][key] || '';
                          const isLong = value.length > 60 || key.includes('DESC') || key.includes('SUBTITLE') || key.includes('QUOTE') || key.includes('NOTE') || key.includes('Q');
                          
                          return (
                            <div
                              key={key}
                              className="p-3 bg-slate-900/20 border border-slate-900 hover:border-slate-800 rounded transition-all space-y-1.5"
                              id={`input-block-${key}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-[#C9A227] tracking-wider truncate max-w-[250px]" title={key}>
                                  {key}
                                </span>
                                {hasSaved[key] && (
                                  <span className="text-[9px] text-green-400 flex items-center gap-1 font-mono animate-fade-in">
                                    <Check size={8} /> Saved Live
                                  </span>
                                )}
                              </div>
                              
                              {/* Rich Text Editor Input Area */}
                              {isLong ? (
                                <textarea
                                  rows={3}
                                  value={value}
                                  onChange={(e) => handleTextChange(key, e.target.value)}
                                  className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-850 focus:border-[#C9A227]/40 rounded p-2 outline-none resize-y custom-scrollbar leading-relaxed"
                                  placeholder={`Type text for ${key}...`}
                                  id={`textarea-${key}`}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleTextChange(key, e.target.value)}
                                  className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-850 focus:border-[#C9A227]/40 rounded px-2 py-1.5 outline-none truncate"
                                  placeholder={`Type text for ${key}...`}
                                  id={`input-${key}`}
                                />
                              )}

                              {/* Quick original english context pointer */}
                              {textLanguage === 'VI' && (
                                <div className="text-[9px] text-slate-500 italic flex items-start gap-1 font-sans">
                                  <Info size={9} className="shrink-0 mt-0.5 text-slate-600" />
                                  <span className="truncate max-w-full">
                                    ENG Ref: {TRANSLATIONS['EN'][key] || 'None'}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: ACTIVE LOGOS & BRAND IMAGES */}
              {activeTab === 'image' && (
                <div className="space-y-4" id="logo-customizer-form-layer">
                  <div className="bg-[#C9A227]/5 border border-[#C9A227]/20 p-3 rounded text-slate-300">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-1">
                      <Sparkles size={12} className="text-[#C9A227]" />
                      {language === 'EN' ? 'Emblem Customization Engine' : 'Hệ Thống Thay Đổi Thiết Kế Logo'}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {language === 'EN'
                        ? 'Upload your brand circle corporate emblem. We apply exact scaling ratios and glowing golden outline frame filters automatically.'
                        : 'Tải lên hình ảnh thiết kế logo của bạn. Hệ thống tự động thiết kế lớp viền kim màu vàng hổ phách và tạo khối tinh xảo.'}
                    </p>
                  </div>

                  {/* Logo Style Options Selector */}
                  <div className="bg-slate-900/30 p-3 rounded border border-slate-900 space-y-2">
                    <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                      <Layers size={11} className="text-[#C9A227]" />
                      {language === 'EN' ? 'Logo Display Mode:' : 'Kiểu hiển thị Logo:'}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                      <button
                        onClick={() => handleLogoStyleChange('default')}
                        className={`py-2 px-1 rounded transition-all text-center leading-tight ${
                          logoStyle === 'default'
                            ? 'bg-[#C9A227]/20 text-white font-bold border border-[#C9A227]/40'
                            : 'bg-slate-900 text-slate-400 border border-transparent hover:text-white'
                        }`}
                      >
                        {language === 'EN' ? 'Gold Dragon' : 'Mặc Định'}
                      </button>
                      <button
                        onClick={() => handleLogoStyleChange('empty')}
                        className={`py-2 px-1 rounded transition-all text-center leading-tight ${
                          logoStyle === 'empty'
                            ? 'bg-[#C9A227]/20 text-white font-bold border border-[#C9A227]/40'
                            : 'bg-slate-900 text-slate-400 border border-transparent hover:text-white'
                        }`}
                        title="Creates a clean blank double-ring gold circular outline without the dragon inside"
                      >
                        {language === 'EN' ? 'Blank Emblem' : 'Bỏ Trống'}
                      </button>
                      <button
                        onClick={() => handleLogoStyleChange('hidden')}
                        className={`py-2 px-1 rounded transition-all text-center leading-tight ${
                          logoStyle === 'hidden'
                            ? 'bg-[#C9A227]/20 text-white font-bold border border-[#C9A227]/40'
                            : 'bg-slate-900 text-slate-400 border border-transparent hover:text-white'
                        }`}
                      >
                        {language === 'EN' ? 'Hide Circle' : 'Ẩn Vòng Tròn'}
                      </button>
                    </div>
                  </div>

                  {/* Current Active Logo Preview */}
                  <div className="bg-slate-900/10 border border-slate-900 p-4 rounded text-center space-y-3.5">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">
                      {language === 'EN' ? 'LIVE EMBLEM PREVIEW ON CANVAS' : 'XEM TRƯỚC LOGO ĐANG HOẠT ĐỘNG'}
                    </span>

                    <div className="flex justify-center">
                      {logoStyle === 'hidden' ? (
                        <div className="rounded-full border-2 border-dashed border-slate-700 h-24 w-24 md:h-28 md:w-28 flex flex-col items-center justify-center p-2 text-slate-500 font-mono text-[9px] select-none">
                          <X size={18} className="text-red-500/70 mb-1 animate-pulse" />
                          <span>{language === 'EN' ? 'EMBLEM HIDDEN' : 'ĐÃ ẨN LOGO'}</span>
                        </div>
                      ) : logoStyle === 'empty' ? (
                        <div className="relative rounded-full overflow-hidden shrink-0 border border-[#C9A227] bg-white shadow-[0_0_20px_rgba(201,162,39,0.30)] h-24 w-24 md:h-28 md:w-28 flex flex-col items-center justify-center">
                          <span className="text-slate-300 uppercase font-mono tracking-widest text-[10px] font-bold">AG</span>
                          <span className="text-[#C9A227] text-[7px] font-bold tracking-wider uppercase">BLANK</span>
                        </div>
                      ) : (
                        <div className="flex justify-center p-2 rounded-full bg-slate-950/20 border border-slate-900/40">
                          <DragonLogo size="lg" showText={false} />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <span className="text-[10px] text-slate-500 italic">
                        {currentLogoPreview 
                          ? (language === 'EN' ? 'Current: Dynamic Custom file' : 'Hiện dùng: File hình tự chọn')
                          : (language === 'EN' ? 'Current: Default Gold Dragon Logo' : 'Hiện dùng: Logo Rồng Vàng mặc định')}
                      </span>
                      
                      {currentLogoPreview && (
                        <button
                          onClick={resetLogo}
                          className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline bg-red-950/10 px-2 py-1 rounded border border-red-900/30"
                        >
                          <Trash2 size={10} />
                          {language === 'EN' ? 'Reset Default' : 'Xóa & Dùng Mặc Định'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Choosing Logo Integration Action */}
                  <div className="space-y-3">
                    <div className="flex border-b border-slate-900">
                      <button
                        onClick={() => setLogoOption('url')}
                        className={`flex-1 pb-2 text-xs font-medium focus:outline-none transition-all ${
                          logoOption === 'url' ? 'border-b border-[#C9A227] text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {language === 'EN' ? 'Web Image URL' : 'Dán đường dẫn Link ảnh'}
                      </button>
                      <button
                        onClick={() => setLogoOption('upload')}
                        className={`flex-1 pb-2 text-xs font-medium focus:outline-none transition-all ${
                          logoOption === 'upload' ? 'border-b border-[#C9A227] text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {language === 'EN' ? 'Drop Local File' : 'Tải File từ máy'}
                      </button>
                    </div>

                    {/* OPTION A: INPUT URL LINK */}
                    {logoOption === 'url' && (
                      <form onSubmit={handleLogoUrlSubmit} className="space-y-2">
                        <label className="text-[10px] text-slate-400 font-sans block">
                          {language === 'EN' ? 'Paste direct HTTPS image link:' : 'Dán địa chỉ link ảnh tuyệt đối:'}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="https://example.com/corporate-logo.png"
                            value={logoUrlInput}
                            onChange={(e) => setLogoUrlInput(e.target.value)}
                            className="flex-grow bg-slate-900 text-xs text-white border border-slate-800 rounded px-2.5 py-2 outline-none focus:border-[#C9A227]/60"
                            id="logo-url-input-field"
                          />
                          <button
                            type="submit"
                            className="px-3.5 bg-[#C9A227] hover:bg-[#B08D20] text-slate-950 rounded text-xs font-bold transition-colors shrink-0 font-sans"
                          >
                            {hasSaved.logo ? (
                              <Check size={14} className="mx-auto" />
                            ) : (
                              language === 'EN' ? 'Apply Logo' : 'Áp Dụng'
                            )}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* OPTION B: drag-and-drop local file uploader conforming to guidelines */}
                    {logoOption === 'upload' && (
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                          dragActive
                            ? 'border-[#C9A227] bg-[#C9A227]/5'
                            : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/30'
                        }`}
                        id="logo-drag-drop-zone"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="logo-desktop-file-loader"
                        />

                        <div className="p-3 bg-[#C9A227]/10 rounded-full text-[#C9A227]">
                          <Upload size={18} />
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-100 font-sans">
                            {language === 'EN' ? 'Drop your logo file here' : 'Kéo thả tệp tin ảnh của bạn tại đây'}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {language === 'EN' ? 'PNG, JPG, SVG are supported • Max 5MB' : 'Chọn định dạng PNG, JPG, SVG • Dung lượng tối đa 5MB'}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="mt-1 px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[10px] font-medium hover:text-white hover:bg-slate-800 transition-colors font-sans"
                        >
                          {language === 'EN' ? 'Or browse folder' : 'Hoặc duyệt thư mục tệp tin'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dynamic instruction for live site change */}
                  <div className="pt-2 space-y-2">
                    <div className="p-3 bg-red-950/10 rounded border border-red-900/30 flex items-start gap-2">
                      <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <div className="text-[10px] text-slate-400 leading-normal space-y-1">
                        <p>
                          <strong>{language === 'EN' ? 'Temporary Storage Warning:' : 'Lưu Ý Về Thiết Bị Khác / Điện Thoại:'}</strong><br />
                          {language === 'EN' 
                            ? 'Files uploaded here are saved in your current browser\'s local storage. They will not reflect when sharing the site or opening on your mobile phone.'
                            : 'Logo bạn tải lên tại góc admin này được lưu tạm ở Bộ nhớ trình duyệt (localStorage) trên máy tính hiện tại. Nó sẽ KHÔNG tự động đồng bộ khi bạn mở link trên điện thoại hoặc chia sẻ định dạng.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#C9A227]/5 rounded border border-[#C9A227]/20 flex items-start gap-2">
                      <Info size={14} className="text-[#C9A227] shrink-0 mt-0.5" />
                      <div className="text-[10px] text-slate-300 leading-normal space-y-1">
                        <strong className="text-[#C9A227] block">
                          {language === 'EN' ? 'How to secure a permanent logo for all devices:' : 'Cách cập nhật Logo cố định vĩnh viễn cho tất cả thiết bị:'}
                        </strong>
                        <ol className="list-decimal pl-3.5 space-y-0.5 mt-1 text-slate-400">
                          <li>
                            {language === 'EN' 
                              ? 'Upload the logo image in your chat message with the developer AI, or put a file named "logo.png" or "logo.svg" into the project files.' 
                              : 'Hãy gửi file ảnh logo (hoặc dán liên kết URL ảnh logo) trực tiếp vào khung chat thoại với AI developer.'}
                          </li>
                          <li>
                            {language === 'EN' 
                              ? 'We will permanently hardcode the image in the config.ts configuration file, making it load flawlessly on all desktop/phone views.' 
                              : 'AI sẽ tiến hành nhúng trực tiếp liên kết logo đó vào mã nguồn gốc "src/config.ts", giúp hiển thị đồng đều 100% trên mọi dòng điện thoại di động và máy tính.'}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: LEADS & FORMS MANAGEMENT */}
              {activeTab === 'leads' && (
                <div className="space-y-4" id="leads-management-layer">
                  
                  {/* Live Firebase Cloud Sync Controller */}
                  <div className="p-3 bg-slate-950 rounded border border-slate-900 flex flex-col sm:flex-row gap-3 items-center justify-between" id="firebase-cloud-sync-controller">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${firebaseUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
                      <div>
                        <p className="text-xs font-bold text-white flex items-center gap-1">
                          <span>{firebaseUser ? (language === 'EN' ? 'Cloud Sync Online' : 'Kết Nối Đám Mây Hoạt Động') : (language === 'EN' ? 'Local Sandbox Offline' : 'Hệ Thống Đang Dùng Offline')}</span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {firebaseUser ? (language === 'EN' ? `Authenticated Operator: ${firebaseUser.email}` : `Xác thực nhân sự: ${firebaseUser.email}`) : (language === 'EN' ? 'Interactive submits fallback to localstorage until Google login.' : 'Yêu cầu được lưu cục bộ đến khi đăng nhập Google.')}
                        </p>
                      </div>
                    </div>
                    {firebaseUser ? (
                      <button
                        onClick={handleGoogleSignOut}
                        className="px-2.5 py-1 text-[9px] font-mono hover:text-red-400 border border-slate-800 rounded hover:bg-red-950/20 transition cursor-pointer"
                      >
                        DISCONNECT
                      </button>
                    ) : (
                      <button
                        onClick={handleGoogleAuth}
                        className="px-3 py-1 bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold text-xs rounded transition flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>Sign in with Google</span>
                      </button>
                    )}
                  </div>

                  {/* Lead Category Navigation subtabs */}
                  <div className="flex border-b border-slate-900 font-mono text-[9px] shrink-0 overflow-x-auto gap-0.5 scrollbar-none pb-1">
                    <button
                      onClick={() => setActiveLeadsSubTab('deals')}
                      className={`py-2 px-3 text-center font-bold uppercase transition-all whitespace-nowrap rounded ${
                        activeLeadsSubTab === 'deals' ? 'bg-[#C9A227]/25 text-[#C9A227] border border-[#C9A227]/40 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Deals' : 'Thương vụ'} ({dealSubmissions.length})
                    </button>
                    <button
                      onClick={() => setActiveLeadsSubTab('contacts')}
                      className={`py-2 px-3 text-center font-bold uppercase transition-all whitespace-nowrap rounded ${
                        activeLeadsSubTab === 'contacts' ? 'bg-[#C9A227]/25 text-[#C9A227] border border-[#C9A227]/40 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Contacts' : 'Liên hệ'} ({contactEnquiries.length})
                    </button>
                    <button
                      onClick={() => setActiveLeadsSubTab('governance')}
                      className={`py-2 px-3 text-center font-bold uppercase transition-all whitespace-nowrap rounded ${
                        activeLeadsSubTab === 'governance' ? 'bg-[#C9A227]/25 text-[#C9A227] border border-[#C9A227]/40 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Diagnostic' : 'Đánh giá'} ({governanceDiagnostics.length})
                    </button>
                    <button
                      onClick={() => setActiveLeadsSubTab('newsletter')}
                      className={`py-2 px-3 text-center font-bold uppercase transition-all whitespace-nowrap rounded ${
                        activeLeadsSubTab === 'newsletter' ? 'bg-[#C9A227]/25 text-[#C9A227] border border-[#C9A227]/40 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Newsletter' : 'Bản tin'} ({newsletterSubscribers.length})
                    </button>
                  </div>

                  {/* Top Bar for Leads: Search + Download Data as JSON */}
                  <div className="flex gap-2 items-center bg-slate-900/10 p-2 border border-slate-900 rounded">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-500">
                        <Search size={12} />
                      </div>
                      <input
                        type="text"
                        placeholder={language === 'EN' ? 'Search submissions...' : 'Tìm kiếm yêu cầu...'}
                        value={leadsSearchQuery}
                        onChange={(e) => setLeadsSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded pl-7 pr-7 py-1.5 text-xs text-white outline-none focus:border-[#C9A227]/40"
                      />
                      {leadsSearchQuery && (
                        <button
                          onClick={() => setLeadsSearchQuery('')}
                          className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-white"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleExportData(activeLeadsSubTab)}
                      className="px-3 py-1.5 bg-[#C9A227]/10 hover:bg-[#C9A227]/25 border border-[#C9A227]/30 hover:border-[#C9A227] text-[#C9A227] rounded text-xs font-bold flex items-center gap-1 transition-all duration-300 shrink-0 cursor-pointer font-sans"
                      title={language === 'EN' ? 'Download JSON data' : 'Xuất dữ liệu JSON'}
                    >
                      <Download size={12} />
                      <span>{language === 'EN' ? 'Export' : 'Tải về'}</span>
                    </button>
                  </div>

                  {/* Listings section */}
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto custom-scrollbar pr-1 pb-4">
                    
                    {/* A. DEALS SUBMISSIONS LIST */}
                    {activeLeadsSubTab === 'deals' && (
                      <>
                        {dealSubmissions
                          .filter(item => {
                            const q = leadsSearchQuery.toLowerCase();
                            return !q || item.fullName.toLowerCase().includes(q) || item.companyName.toLowerCase().includes(q) || item.businessEmail.toLowerCase().includes(q);
                          })
                          .map((item) => {
                            const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A';
                            return (
                              <div key={item.id} className="p-3 bg-slate-900/35 border border-slate-900 rounded space-y-2.5 text-xs relative hover:border-slate-800 transition">
                                <button
                                  onClick={() => handleDeleteSubmission('deal', item.id)}
                                  className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 size={12} />
                                </button>
                                
                                <div className="border-b border-slate-905 pb-2 pr-6">
                                  <span className="text-[9px] font-mono text-[#C9A227] block tracking-wide uppercase mb-0.5">{dateStr} • ID: {item.id}</span>
                                  <h4 className="font-bold text-white text-sm">{item.companyName}</h4>
                                  <span className="text-slate-400 text-xs">{item.fullName} • {item.jobTitle}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-2.5 text-[11px] leading-relaxed text-slate-300 font-sans">
                                  <div className="grid grid-cols-2 gap-2">
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Email:' : 'Email:'}</strong> {item.businessEmail}</p>
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Phone:' : 'SĐT:'}</strong> {item.phoneNumber || 'N/A'}</p>
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Industry:' : 'Ngành:'}</strong> {item.industry}</p>
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Stage:' : 'Giai đoạn:'}</strong> {item.companyStage}</p>
                                  </div>
                                  <p className="border-t border-slate-900/60 pt-1.5"><strong className="text-[#C9A227] mr-1">{language === 'EN' ? 'Capital Sought:' : 'Vốn cần gọi:'}</strong> <span className="font-mono font-semibold text-white">{item.capitalSought}</span></p>
                                  <p><strong className="text-slate-500 block mb-0.5">{language === 'EN' ? 'Traction & Financial Summary:' : 'Tóm tắt doanh thu & sức hút:'}</strong> <span className="text-slate-300 pr-1 block bg-black/30 p-2 rounded border border-slate-905">{item.revenueSummary}</span></p>
                                  <p><strong className="text-slate-500 block mb-0.5">{language === 'EN' ? 'Use of Funds Plan:' : 'Kế hoạch sử dụng vốn:'}</strong> <span className="text-slate-300 pr-1 block bg-black/30 p-2 rounded border border-slate-905">{item.useOfFunds}</span></p>
                                  <p><strong className="text-slate-500 block mb-0.5">{language === 'EN' ? 'Business Description:' : 'Hoạt động kinh doanh:'}</strong> <span className="text-slate-300 pr-1 block bg-black/30 p-2 rounded border border-slate-905">{item.businessDescription}</span></p>
                                  <div className="grid grid-cols-2 gap-2 border-t border-slate-900/60 pt-2 text-[10px]">
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Deck status:' : 'Tình trạng slide:'}</strong> <span className="text-slate-205">{item.pitchDeckStatus}</span></p>
                                    <p><strong className="text-slate-500">{language === 'EN' ? 'Advisory Need:' : 'Cơ cấu Quản trị:'}</strong> <span className="text-slate-205">{item.interestInGovernance}</span></p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {dealSubmissions.length === 0 && (
                          <div className="text-center py-12 border border-dashed border-slate-900 rounded">
                            <Briefcase size={24} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-xs text-slate-400">{language === 'EN' ? 'No deal registration leads submitted yet.' : 'Chưa có đăng ký thương vụ gọi vốn nào.'}</p>
                            <p className="text-[10px] text-slate-600 mt-2">{language === 'EN' ? 'Go to Submit Deal page and fill out the form.' : 'Vui lòng hoàn tất biểu hợp tác gọi vốn bên ngoài để hiển thị.'}</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* B. CONTACT ENQUIRIES LIST */}
                    {activeLeadsSubTab === 'contacts' && (
                      <>
                        {contactEnquiries
                          .filter(item => {
                            const q = leadsSearchQuery.toLowerCase();
                            return !q || item.fullName.toLowerCase().includes(q) || item.company.toLowerCase().includes(q) || item.email.toLowerCase().includes(q);
                          })
                          .map((item) => {
                            const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A';
                            return (
                              <div key={item.id} className="p-3 bg-slate-900/35 border border-slate-900 rounded space-y-2 text-xs relative hover:border-slate-800 transition">
                                <button
                                  onClick={() => handleDeleteSubmission('contact', item.id)}
                                  className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 size={12} />
                                </button>
                                
                                <div className="border-b border-slate-905 pb-1.5 pr-6">
                                  <span className="text-[9px] font-mono text-[#C9A227] block tracking-wide uppercase mb-0.5">{dateStr}</span>
                                  <h4 className="font-bold text-white text-sm">{item.fullName}</h4>
                                  <span className="text-slate-400 text-xs">{item.company} • {item.jobTitle}</span>
                                </div>
                                
                                <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300 font-sans">
                                  <p><strong className="text-slate-500">{language === 'EN' ? 'Email:' : 'Email:'}</strong> {item.email}</p>
                                  <p><strong className="text-slate-500">{language === 'EN' ? 'Phone:' : 'Điện thoại:'}</strong> {item.phone || 'N/A'}</p>
                                  <p><strong className="text-slate-500">{language === 'EN' ? 'Purpose:' : 'Mục đích:'}</strong> <span className="text-[#C9A227] font-semibold">{item.purpose}</span></p>
                                  <div className="p-2.5 mt-1 bg-black rounded border border-slate-900 text-slate-205">
                                    <p className="font-mono text-[9px] text-slate-500 mb-1.5 uppercase tracking-wider">{language === 'EN' ? 'Inquiry Message' : 'Nội dung bộ phận tiếp nhận'}</p>
                                    <p className="whitespace-pre-line leading-relaxed text-xs">{item.message}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {contactEnquiries.length === 0 && (
                          <div className="text-center py-12 border border-dashed border-slate-900 rounded">
                            <Mail size={24} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-xs text-slate-400">{language === 'EN' ? 'No contact inquiries submitted yet.' : 'Chưa có lời nhắn liên hệ từ đối tác.'}</p>
                            <p className="text-[10px] text-slate-600 mt-2">{language === 'EN' ? 'Test by writing a message in any contact sections.' : 'Hãy thử gửi một tin nhắn từ chân trang hoặc phần Liên Hệ.'}</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* C. GOVERNANCE ASSESSMENT LIST */}
                    {activeLeadsSubTab === 'governance' && (
                      <>
                        {governanceDiagnostics
                          .filter(item => {
                            const q = leadsSearchQuery.toLowerCase();
                            return !q || (item.name || '').toLowerCase().includes(q) || (item.company || '').toLowerCase().includes(q) || (item.email || '').toLowerCase().includes(q);
                          })
                          .map((item, idx) => {
                            const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A';
                            const uniqueId = item.timestamp || item.email || idx.toString();
                            return (
                              <div key={uniqueId} className="p-3 bg-slate-900/35 border border-slate-900 rounded space-y-2 text-xs relative hover:border-slate-800 transition">
                                <button
                                  onClick={() => handleDeleteSubmission('gov', uniqueId)}
                                  className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 size={12} />
                                </button>
                                
                                <div className="border-b border-slate-905 pb-1.5 pr-6">
                                  <span className="text-[9px] font-mono text-[#C9A227] block tracking-wide uppercase mb-0.5">{dateStr}</span>
                                  <h4 className="font-bold text-white text-sm">{item.company || 'Governance Assessment'}</h4>
                                  <span className="text-slate-400 text-xs">{item.name || 'Anonymous User'} • {item.email || 'No email specified'}</span>
                                </div>
                                
                                <div className="space-y-2 text-[11px] leading-relaxed text-slate-300 font-sans">
                                  <div className="flex items-center gap-2">
                                    <strong className="text-slate-500">{language === 'EN' ? 'Total readiness score:' : 'Tổng điểm tự đánh giá:'}</strong>
                                    <span className="px-2 py-0.5 bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] rounded text-xs font-mono font-bold">{item.percentage || 0}%</span>
                                  </div>
                                  {item.scores && (
                                    <div className="p-2.5 bg-black rounded border border-slate-900 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-[9.5px]">
                                      <p><span className="text-slate-500">Cap Table Clarity:</span> <strong className="text-slate-200">{item.scores.ownershipClarity || 0}/5</strong></p>
                                      <p><span className="text-slate-500">Leadership Bound:</span> <strong className="text-slate-200">{item.scores.leadershipAccountability || 0}/5</strong></p>
                                      <p><span className="text-slate-500">Decision Rules:</span> <strong className="text-slate-200">{item.scores.decisionGovernance || 0}/5</strong></p>
                                      <p><span className="text-slate-505 font-sans">Reporting Control:</span> <strong className="text-slate-200">{item.scores.reportingFinancialControl || 0}/5</strong></p>
                                      <p><span className="text-slate-500">Investor Ready:</span> <strong className="text-slate-200">{item.scores.investorReadiness || 0}/5</strong></p>
                                      <p><span className="text-slate-555 font-sans">Risk Awareness:</span> <strong className="text-slate-200">{item.scores.riskCompliance || 0}/5</strong></p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        {governanceDiagnostics.length === 0 && (
                          <div className="text-center py-12 border border-dashed border-slate-900 rounded">
                            <Clipboard size={24} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-xs text-slate-400">{language === 'EN' ? 'No custom scorecard diagnostics generated yet.' : 'Chưa có lượt tự chấm năng lực quản trị doanh nghiệp nào.'}</p>
                            <p className="text-[10px] text-slate-600 mt-2">{language === 'EN' ? 'Try taking the live assessment scorecard on Governance page.' : 'Người dùng có thể thử tại mục "Đánh Giá Quản Trị" ngoài trang chủ.'}</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* D. NEWSLETTER SUBSCRIBERS LIST */}
                    {activeLeadsSubTab === 'newsletter' && (
                      <>
                        {newsletterSubscribers
                          .filter(item => {
                            const q = leadsSearchQuery.toLowerCase();
                            return !q || (item.email || '').toLowerCase().includes(q);
                          })
                          .map((item, idx) => {
                            const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A';
                            return (
                              <div key={item.email || idx} className="p-2.5 bg-slate-900/35 border border-slate-900 rounded flex items-center justify-between text-xs hover:border-slate-800 transition">
                                <div className="space-y-0.5 min-w-0 pr-4">
                                  <span className="font-bold text-white block truncate text-xs" title={item.email}>{item.email}</span>
                                  <span className="text-[9px] font-mono text-slate-500 uppercase">{language === 'EN' ? 'Registered: ' : 'Ngày đăng ký: '}{dateStr}</span>
                                </div>
                                <button
                                  onClick={() => handleDeleteSubmission('news', item.id || item.email)}
                                  className="text-slate-500 hover:text-red-400 p-1.5 transition shrink-0 cursor-pointer"
                                  title="Delete subscriber focus"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            );
                          })}
                        {newsletterSubscribers.length === 0 && (
                          <div className="text-center py-12 border border-dashed border-slate-900 rounded">
                            <Mail size={24} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-xs text-slate-400">{language === 'EN' ? 'No newsletter subscribers yet.' : 'Chưa có lượt đăng ký nhận bản tin gửi đi.'}</p>
                          </div>
                        )}
                      </>
                    )}

                  </div>

                </div>
              )}

              {/* TAB 3: ADMIN ACCOUNTS & AUDIT LOG PANEL */}
              {activeTab === 'admin' && loggedInUser.role === 'Super Admin' && (
                <div className="space-y-4" id="admin-roles-panel">
                  
                  {/* Internal Admin Sub-Tabs */}
                  <div className="flex border-b border-slate-900 font-mono text-[10px] shrink-0">
                    <button
                      onClick={() => setAdminSubTab('users')}
                      className={`flex-1 pb-2 text-center font-bold tracking-wider uppercase transition-all ${
                        adminSubTab === 'users' ? 'border-b border-[#C9A227] text-white animate-fade-in' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Users & Roles' : 'Người dùng & Quyền'}
                    </button>
                    <button
                      onClick={() => setAdminSubTab('logs')}
                      className={`flex-1 pb-2 text-center font-bold tracking-wider uppercase transition-all ${
                        adminSubTab === 'logs' ? 'border-b border-[#C9A227] text-white animate-fade-in' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {language === 'EN' ? 'Audit System Logs' : 'Nhật ký CMS'}
                    </button>
                  </div>

                  {/* Subtab 1: Admin user listings and Creation Forms */}
                  {adminSubTab === 'users' && (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Create Admin Panel Form */}
                      <form onSubmit={handleAddAccount} className="bg-slate-900/35 p-3.5 rounded border border-slate-900/80 space-y-3">
                        <h4 className="text-[11px] font-bold text-white flex items-center gap-1.5 uppercase tracking-wider font-sans">
                          <Plus size={13} className="text-[#C9A227]" />
                          {language === 'EN' ? 'Add CMS Administrator' : 'Thêm Quản Trị Viên Mới'}
                        </h4>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">{language === 'EN' ? 'Username' : 'Tên tài khoản'}</label>
                            <input
                              type="text"
                              required
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                              placeholder="e.g. partner_dan"
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#C9A227]/40 font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">{language === 'EN' ? 'Display Name' : 'Tên hiển thị'}</label>
                            <input
                              type="text"
                              required
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="e.g. Dan Nguyen"
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#C9A227]/40 font-sans"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">{language === 'EN' ? 'Password' : 'Mật khẩu'}</label>
                            <input
                              type="password"
                              required
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#C9A227]/40"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">{language === 'EN' ? 'Privileges' : 'Cấp bậc Quyền'}</label>
                            <select
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value as AdminRole)}
                              className="w-full bg-slate-950 text-xs text-white border border-slate-800 rounded px-2 py-1.5 outline-none focus:border-[#C9A227]/40"
                            >
                              <option value="Editor">{language === 'EN' ? 'Editor (Text Only)' : 'Biên Tập Viên'}</option>
                              <option value="Super Admin">{language === 'EN' ? 'Super Admin (All)' : 'Quản Trị Viên Tối Cao'}</option>
                            </select>
                          </div>
                        </div>

                        {addAccountError && (
                          <div className="text-[10px] text-red-400 bg-red-950/20 border border-red-900/30 p-2 rounded">
                            {addAccountError}
                          </div>
                        )}

                        {addAccountSuccess && (
                          <div className="text-[10px] text-green-400 bg-green-950/20 border border-green-900/30 p-2 rounded flex items-center gap-1.5">
                            <Check size={11} /> {addAccountSuccess}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-1.5 bg-[#C9A227]/10 hover:bg-[#C9A227]/30 text-[#C9A227] hover:text-white border border-[#C9A227]/30 hover:border-[#C9A227] rounded text-[10px] font-bold tracking-wider transition-all duration-300 uppercase font-mono cursor-pointer"
                        >
                          {language === 'EN' ? 'DEPLOY CREDENTIALS' : 'CẤP VAI TRÒ'}
                        </button>
                      </form>

                      {/* User Account Registry List */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                          {language === 'EN' ? 'ACTIVE ACCESS CREDIT RECOGNITIONS' : 'CÁC VAI TRÒ ĐANG HOẠT ĐỘNG'} ({accounts.length})
                        </span>

                        <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                          {accounts.map(acc => (
                            <div
                              key={acc.username}
                              className="p-2.5 bg-slate-900/30 border border-slate-900 rounded flex items-center justify-between hover:border-slate-800 transition-colors"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-white leading-normal truncate">{acc.name}</span>
                                  <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono truncate ${
                                    acc.role === 'Super Admin' 
                                      ? 'bg-[#C9A227]/25 text-[#C9A227]' 
                                      : 'bg-blue-950/40 text-blue-400'
                                  }`}>
                                    {acc.role}
                                  </span>
                                </div>
                                <p className="text-[9px] font-mono text-slate-500">
                                  @{acc.username} • {language === 'EN' ? 'Added' : 'Ngày tạo'}: {acc.dateCreated}
                                </p>
                              </div>

                              <button
                                onClick={() => handleDeleteAccount(acc.username)}
                                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/10 rounded border border-transparent hover:border-red-950/20 transition-all cursor-pointer shrink-0"
                                title={`Revoke roles for @${acc.username}`}
                                disabled={acc.username === 'admin' || loggedInUser.username === acc.username}
                              >
                                <Trash2 size={11} className={acc.username === 'admin' || loggedInUser.username === acc.username ? 'opacity-20' : ''} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtab 2: CMD Digital Logging Terminal Console */}
                  {adminSubTab === 'logs' && (
                    <div className="space-y-2 animate-fade-in font-mono">
                      <div className="flex items-center justify-between text-[9px] text-slate-500">
                        <span>SYSTEM LOG AUDIT SPACE</span>
                        <span>COUNT: {auditLogs.length}/100</span>
                      </div>

                      <div className="bg-slate-950 border border-slate-900/80 rounded p-3 h-[250px] overflow-y-auto custom-scrollbar flex flex-col justify-start gap-2 text-[10px] leading-relaxed">
                        {auditLogs.length === 0 ? (
                          <div className="text-slate-700 text-center py-16 italic">
                            No system audits logged in current workspace memory.
                          </div>
                        ) : (
                          auditLogs.map(log => (
                            <div key={log.id} className="border-b border-slate-900 pb-1.5 space-y-0.5">
                              <div className="flex items-start justify-between gap-1 flex-wrap">
                                <span className="text-[9px] text-[#C9A227] shrink-0">
                                  [{log.timestamp}]
                                </span>
                                <span className="text-[9px] text-slate-500 shrink-0 font-bold">
                                  @{log.username} ({log.role})
                                </span>
                              </div>
                              <p className="text-slate-300 break-all">
                                &gt; {log.action}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </>
        )}

        {/* Footer info inside sidebar */}
        <div className="p-3 bg-slate-900/40 border-t border-slate-900/80 text-center text-[10px] text-slate-500 font-mono select-none">
          AG CAPITAL • ADVISORY CMS TERMINAL • v2.0
        </div>
      </div>
    </>
  );
}
