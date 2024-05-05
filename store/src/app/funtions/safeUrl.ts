export default function safeUrl(s: string) {
  return s.replace(/[\[\]\'\"]/g, '');
}
