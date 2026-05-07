declare namespace grecaptcha {
  type BadgePosition = {
    bottomright?: string;
    bottomleft?: string;
    inline?: string;
  };

  type RenderParameters = {
    sitekey: string;
    badge?: BadgePosition | string;
    size?: 'invisible' | 'compact' | 'normal';
    tabindex?: number;
    callback?: (token: string) => void;
    'expired-callback'?: () => void;
    'error-callback'?: () => void;
  };

  type ExecuteParameters = {
    action: string;
  };

  type GRecaptcha = {
    render(container: string | HTMLElement, parameters: RenderParameters): number;
    execute(siteKey: string, parameters?: ExecuteParameters): Promise<string>;
    reset(opt_widget_id?: number): void;
    getResponse(opt_widget_id?: number): string;
    ready(callback: () => void): void;
  };
}

interface Window {
  grecaptcha?: grecaptcha.GRecaptcha;
}
