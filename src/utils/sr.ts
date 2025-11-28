let srInstance: any = null;

const loadScrollReveal = async () => {
  if (typeof window === "undefined") return { reveal: () => {} };

  if (!srInstance) {
    const ScrollReveal = (await import("scrollreveal")).default;
    srInstance = ScrollReveal();
  }

  return srInstance;
};

export default loadScrollReveal;
