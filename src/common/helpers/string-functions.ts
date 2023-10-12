
export function isStringEmpty(str: string): boolean {
  if (typeof str === "string" && str.length === 0 ||
    str === null ||
    str === undefined) return true;
  return false;
}
