
export interface UnitData {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  location: string;
  type?: string;
  model?: string;
  fuel?: string;
  drive?: string;
  warning?: string;
  os_type?: string;
  mars_sign?: string;
  sun_sign?: string;
  script?: string;
}

export interface ManualPreview {
  specifications: string;
  procedures: string;
  troubleshooting: string;
}

export interface FrictionAlert {
  level: '🔴 CRITICAL' | '🟠 SIGNAL LAG' | '🟢 NOMINAL' | '🟡 LOW VOLTAGE';
  alert: string;
  desc: string;
}

export enum AppView {
  LOGIN = 'login',
  HOME = 'home',
  GENERATOR = 'generator',
  DASHBOARD = 'dashboard'
}
