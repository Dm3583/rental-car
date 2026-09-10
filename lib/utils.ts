export const toNumberOrUndefined = (raw: string): number | undefined => {
  if (raw === '') return undefined;

  const parsed = Number(raw);

  return Number.isNaN(parsed) ? undefined : parsed;
};
