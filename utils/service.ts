export function getQueryParams(
  params: Record<string, any>,
  hasQuestionMark = false,
) {
  const str = new URLSearchParams(params).toString() || '';
  if (!hasQuestionMark || !str) {
    return str;
  }
  return `?${str}`;
}
