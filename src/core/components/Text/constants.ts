export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'div'] as const;
export const TEXT_TAGS = ['p', 'span', 'label'] as const;
export const TYPOGRAPHY_TAGS = [...HEADING_TAGS, ...TEXT_TAGS] as const;
