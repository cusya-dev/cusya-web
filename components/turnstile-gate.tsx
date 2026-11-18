"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_ID = "cf-turnstile-script";

export function TurnstileGate({ siteKey, next }: { siteKey: string; next: string }) {
  const { t } = useI18n();
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [failed, setFailed] = useState(false);

  const submit = useCallback(
    async (token: string) => {
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token, next }),
        });
        const data = (await res.json()) as { ok?: boolean; next?: string };
        if (!res.ok || !data.ok) throw new Error("verify failed");
        window.location.replace(data.next ?? "/");
      } catch {
        setFailed(true);
        window.turnstile?.reset(widgetId.current);
      }
    },
    [next]
  );

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (cancelled || !box.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(box.current, {
        sitekey: siteKey,
        theme: "light",
        callback: (token: string) => {
          setFailed(false);
          void submit(token);
        },
        "error-callback": () => setFailed(true),
        "expired-callback": () => window.turnstile?.reset(widgetId.current),
      });
    };

    const onScriptError = () => {
      if (!cancelled) setFailed(true); // skrip Cloudflare diblokir/offline → tampilkan pesan, jangan diam
    };

    if (window.turnstile) {
      mount();
    } else {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
      script.addEventListener("error", onScriptError);
    }

    return () => {
      cancelled = true;
      document.getElementById(SCRIPT_ID)?.removeEventListener("load", mount);
      document.getElementById(SCRIPT_ID)?.removeEventListener("error", onScriptError);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey, submit]);

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div ref={box} className="flex min-h-[65px] items-center justify-center" />
      {failed && (
        <p role="alert" className="text-sm font-semibold text-rose-600">
          {t.verify.error}
        </p>
      )}
    </div>
  );
}
