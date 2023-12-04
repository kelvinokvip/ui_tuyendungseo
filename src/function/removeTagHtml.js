export const removeTagHtml =(html) => {
  if(!html) return '';
  return html.toString().replace(/<[^>]+>/g, '');
}