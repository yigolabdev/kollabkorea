/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { LucideIcon } from 'lucide-react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Artist interface for retail activation cards
export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}

// Stage data for roadmap/timeline visualization
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
