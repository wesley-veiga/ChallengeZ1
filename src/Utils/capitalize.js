export const capitalize = text => {
  if (typeof text !== 'string') return '';
  else return text.charAt(0).toUpperCase() + text.substring(1);
};
