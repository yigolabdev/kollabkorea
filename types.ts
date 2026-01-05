/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

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
