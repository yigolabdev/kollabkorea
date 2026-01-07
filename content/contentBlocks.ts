export type ContentBlockKind = 'lead' | 'body' | 'quote';

export interface ContentBlock {
  kind: ContentBlockKind;
  en?: string;
  ko?: string;
}

export interface ContentSection {
  id: string;
  title?: string;
  blocks: ContentBlock[];
}

