export default function getMetaFromPost(post, { type } = {}) {
  // Todo update this function when migration to contentful is completed
  if (!post) {
    return {}
  }
  function getSeoField(field) {
    return post.frontmatter.seo && post.frontmatter.seo[field]
  }

  return {
    title: getSeoField('title') || post.frontmatter.title || '',
    description: getSeoField('description') || post.frontmatter.excerpt || '',
    url: post.fields ? post.fields.slug : undefined,
    type,
    publishedTime: type === 'article' ? post.frontmatter.date : undefined,
    image: getSeoField('image')
      ? post.frontmatter.seo.image &&
        post.frontmatter.seo.image.childImageSharp.og.src
      : post.frontmatter.image && post.frontmatter.image.childImageSharp.og.src,
  }
}
