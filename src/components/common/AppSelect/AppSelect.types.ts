export interface SelectOption {
  label: string;
  value: string;
}

export interface AppSelectProps {
  label: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  enabled?: boolean;
}