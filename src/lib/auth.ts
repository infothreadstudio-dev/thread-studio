/**
 * Admin authentication helpers.
 * In production ADMIN_KEY must be set — no weak defaults.
 */
export function getAdminKey(): string | null {
  const key = process.env.ADMIN_KEY?.trim();
  if (key && key.length >= 16) return key;

  if (process.env.NODE_ENV === "production") {
    console.error(
      "[security] ADMIN_KEY is missing or too short in production. Admin routes disabled."
    );
    return null;
  }

  // Dev-only fallback so local work still functions
  return process.env.ADMIN_KEY?.trim() || "threadstudio-dev-only";
}

export function isValidAdminKey(provided: string | null | undefined): boolean {
  const expected = getAdminKey();
  if (!expected || !provided) return false;
  if (provided.length !== expected.length) return false;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) {
    ok |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return ok === 0;
}
