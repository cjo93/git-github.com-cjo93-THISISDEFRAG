
export interface ManualPreview {
  specifications: string;
  procedures: string;
  troubleshooting: string;
}

export enum Step {
  NOISE = 'noise',
  SIGNAL = 'signal',
  ACTION = 'action'
}
