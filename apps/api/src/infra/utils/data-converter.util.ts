export function toDate(data: string | Date | undefined): Date | undefined {
  if (!data) return undefined;
  return data instanceof Date ? data : new Date(data);
}
