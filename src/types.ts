/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'EN' | 'VI';

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'governance'
  | 'industries'
  | 'process'
  | 'founders'
  | 'insights'
  | 'contact'
  | 'alignment'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'confidentiality';

export interface SiteSettings {
  email: string;
  website: string;
  address: string;
  phone?: string;
  parentBrand: string;
  parentTagline: string;
  slogan: string;
  hasGovernanceAdvisory: boolean;
  hasFeesPublic: boolean;
  defaultLogoUrl?: string;
}

export interface Article {
  id: string;
  slug: string;
  titleEN: string;
  titleVI: string;
  categoryEN: string;
  categoryVI: string;
  excerptEN: string;
  excerptVI: string;
  contentEN: string;
  contentVI: string;
  readingTime: string;
  publishedDate: string;
}

export interface DealSubmission {
  id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  businessEmail: string;
  phoneNumber?: string;
  industry: string;
  companyStage: string;
  revenueSummary: string;
  capitalSought: string;
  useOfFunds: string;
  businessDescription: string;
  pitchDeckStatus: string;
  interestInGovernance: 'Yes' | 'No' | 'Unsure';
  timestamp: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  timestamp: string;
}

export interface GovernanceScore {
  ownershipClarity: number;
  leadershipAccountability: number;
  decisionGovernance: number;
  reportingFinancialControl: number;
  investorReadiness: number;
  riskCompliance: number;
}

export type AdminRole = 'Super Admin' | 'Editor';

export interface AdminAccount {
  username: string;
  name: string;
  role: AdminRole;
  dateCreated: string;
  passwordHash: string;
}

export interface CMSAuditLog {
  id: string;
  username: string;
  role: AdminRole;
  action: string;
  timestamp: string;
}

