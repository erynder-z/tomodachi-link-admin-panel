export const getTextExcerpt = (text: string) => {
  const maxLength = 150;

  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
};
