export const processHashtag = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => {
    return { where: { hashtag }, create: { hashtag } };
  });
};
