declare module 'react-google-recaptcha' {
  import { Component, RefObject } from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    theme?: 'light' | 'dark';
    size?: 'normal' | 'compact' | 'invisible';
    tabindex?: number;
    onExpired?: () => void;
    onError?: () => void;
    onLoad?: () => void;
    grecaptcha?: any;
    hl?: string;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    isolated?: boolean;
    ref?: RefObject<ReCAPTCHA>;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    getValue(): string | null;
    reset(): void;
    execute(): void;
    executeAsync(): Promise<string>;
  }
}

