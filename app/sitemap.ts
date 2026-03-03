import { getAllArticles } from '@/lib/articles'
import { siteConfig } from '@/site.config'

export default function sitemap() {
  const articles = getAllArticles()
  
  const articleUrls = articles.map((article) => ({
    url: `https://${siteConfig.domain}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: `https://${siteConfig.domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `https://${siteConfig.domain}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...articleUrls,
  ]
}
