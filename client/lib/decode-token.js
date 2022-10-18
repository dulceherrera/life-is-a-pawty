export default function decodeToken(token) {
  const [, encondedPayload] = token.split('.');
  const jsonPayload = atob(encondedPayload);
  const payload = JSON.parse(jsonPayload);
  return payload;
}
