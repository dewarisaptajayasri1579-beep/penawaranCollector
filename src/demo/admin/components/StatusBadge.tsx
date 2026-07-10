import { CustomerStatus } from '../types/customer';

interface StatusBadgeProps {
  status: CustomerStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    Active: {
      text: 'Active',
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    Inactive: {
      text: 'Inactive',
      classes: 'bg-slate-100 text-slate-600 border-slate-200',
    },
    Blocked: {
      text: 'Blocked',
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
  };

  const current = config[status] || config.Inactive;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${current.classes}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current shrink-0" />
      {current.text}
    </span>
  );
}
