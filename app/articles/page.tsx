import { getAllArticles } from '@/lib/articles'
import { siteConfig } from '@/site.config'
import Link from 'next/link'

export default function ArticlesPage() {
  const articles = getAllArticles()
  
  // 按分类分组
  const categories = Array.from(new Set(articles.map(a => a.category)))
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-700">
            {siteConfig.name}
          </Link>
          <p className="text-sm text-gray-600 mt-1">节日音乐资讯与推荐</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">文章列表</h1>
          
          {/* 分类导航 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <a
                key={category}
                href={`#${category}`}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                {category}
              </a>
            ))}
          </div>

          {/* 按分类显示文章 */}
          {categories.map(category => {
            const categoryArticles = articles.filter(a => a.category === category)
            return (
              <div key={category} id={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                  {category}
                </h2>
                <div className="grid gap-6">
                  {categoryArticles.map(article => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-600">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.date}</span>
                        <span className="text-red-600">阅读更多 →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>{siteConfig.name} © 2025</p>
        </div>
      </footer>
    </div>
  )
}
