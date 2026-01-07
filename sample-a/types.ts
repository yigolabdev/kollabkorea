import { LucideIcon } from 'lucide-react';

export interface StageData {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  Icon: LucideIcon;
  color: string;
  position: {
    top: number; // Percentage 0-100 for desktop arc
  };
}