const isServer = typeof window === "undefined";

const sr =
  !isServer ? (await import("scrollreveal")).default() : { reveal: () => { } };

export default sr;
