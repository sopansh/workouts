/**
 * three.js r128 is loaded as a classic <script> (pinned + SRI-checked in index.html) and
 * exposes a global. Every module imports it from here so the dependency lives in one place
 * and a failed CDN load can be detected (THREE === null) instead of throwing everywhere.
 */
export const THREE = globalThis.THREE ?? null;
