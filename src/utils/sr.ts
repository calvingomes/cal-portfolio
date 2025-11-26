import ScrollReveal from "scrollreveal";

const isSSR = typeof window === "undefined";

type ScrollRevealInstance = ReturnType<typeof ScrollReveal>;

const sr: ScrollRevealInstance | null = isSSR ? null : ScrollReveal();

export default sr;
