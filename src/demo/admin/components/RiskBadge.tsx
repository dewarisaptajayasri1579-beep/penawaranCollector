import { CustomerRiskLevel } from '../types/customer';

interface RiskBadgeProps {
  riskLevel: CustomerRiskLevel;
}

export default function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const config = {
    Low: {
      text: 'Low',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    Medium: {
      text: 'Medium',
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    High: {
      text: 'High',
      classes: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    Critical: {
      text: 'Critical',
      classes: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse',
    },
  };

  const current = config[riskLevel] || config.Low;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${current.classes}`}>
      {current.text}
    </span>
  );
}
