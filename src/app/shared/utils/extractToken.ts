export const extractToken = (token: string | null): string | null => {
  if (!token) return null;
  const parts = token.split(' ');
  return parts.length === 2 ? parts[1] : token;
};
