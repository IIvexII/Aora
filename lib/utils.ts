export function capitalize(text: string | null) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return "";
}
