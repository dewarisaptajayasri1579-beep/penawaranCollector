export interface ProposalFormInput {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  businessType: string;
  collectorCount: string;
  notes: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  type: 'overdue' | 'today' | 'promised' | 'collected';
}

export interface ProblemCard {
  id: number;
  title: string;
  desc: string;
  iconName: string;
  color: 'orange' | 'red' | 'yellow' | 'blue' | 'purple' | 'slate';
}

export interface SolutionStep {
  step: number;
  title: string;
  desc: string;
  role: string;
  iconName: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  desc: string;
  iconName: string;
  badge: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  desc: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}
