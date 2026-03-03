import { siteConfig } from '@/site.config'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-red-600">{siteConfig.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{siteConfig.description}</p>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              发现最适合节日的音乐
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              从传统节日到现代庆典，为每个特殊时刻找到完美的背景音乐
            </p>
            
            {/* CTA */}
            <a 
              href={siteConfig.targetProduct.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              🎵 用 AI 生成专属节日歌曲
            </a>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {siteConfig.theme.categories.map((category) => (
              <Link
                key={category}
                href="/articles"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">查看歌曲推荐</p>
              </Link>
            ))}
          </div>

          {/* 文章入口 */}
          <div className="text-center mb-12">
            <Link
              href="/articles"
              className="inline-block bg-white px-8 py-3 rounded-lg font-semibold text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              📚 浏览所有文章
            </Link>
          </div>

          {/* Product Promotion */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-8 text-white mb-12">
            <h3 className="text-2xl font-bold mb-3">想要定制专属节日歌曲？</h3>
            <p className="mb-4 text-red-50">
              {siteConfig.targetProduct.description}
            </p>
            <a 
              href={siteConfig.targetProduct.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              立即体验 →
            </a>
          </div>

          {/* Related Sites */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {siteConfig.relatedSites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{site.name}</span>
                  <span className="text-xs text-gray-500 block mt-1">→</span>
                </a>
              ))}
            </div>
          </div>
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
