type DLParams = Record<string, any>;

export const pushDL = (event: string, params: DLParams = {}) => {
  if (typeof window === "undefined") return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event,
    ...params,
  });
};
