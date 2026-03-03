import { getAllArticles } from '@/lib/articles'
import { siteConfig } from '@/site.config'
import Link from 'next/link'

// SVG Icons
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

const TagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
)

export default function ArticlesPage() {
  const articles = getAllArticles()
  
  // 按分类分组
  const categories = Array.from(new Set(articles.map(a => a.category)))
  
  // 分类颜色映射
  const categoryColors: Record<string, string> = {
    '春节': 'from-red-600 to-red-800',
    '元宵': 'from-orange-600 to-red-700',
    '端午': 'from-green-600 to-emerald-700',
    '七夕': 'from-pink-600 to-rose-700',
    '中秋': 'from-yellow-600 to-amber-700',
    '国庆': 'from-red-700 to-rose-800',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Floating Header */}
      <header className="fixed top-6 left-6 right-6 z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <h1 className="text-xl font-bold text-white">{siteConfig.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5">传统节日 · 音乐文化</p>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Page Title - Exaggerated Typography */}
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              文章
              <span className="block bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent">
                列表
              </span>
            </h2>
            <p className="text-lg text-slate-400">探索节日音乐的文化与魅力</p>
          </div>

          {/* Category Navigation - Horizontal Scroll */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(category => {
                const gradient = categoryColors[category] || 'from-slate-600 to-slate-800'
                return (
                  <a
                    key={category}
                    href={`#${category}`}
                    className={`flex-shrink-0 px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity duration-200 cursor-pointer flex items-center gap-2`}
                  >
                    <TagIcon />
                    {category}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Articles by Category - Timeline Style */}
          <div className="max-w-6xl mx-auto">
            {categories.map((category, categoryIndex) => {
              const categoryArticles = articles.filter(a => a.category === category)
              const gradient = categoryColors[category] || 'from-slate-600 to-slate-800'
              
              return (
                <div 
                  key={category} 
                  id={category} 
                  className="mb-20 scroll-mt-32"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <CalendarIcon />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white">{category}</h3>
                      <p className="text-slate-400 text-sm mt-1">{categoryArticles.length} 篇文章</p>
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryArticles.map((article, index) => (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.slug}`}
                        className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Article Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`px-3 py-1 bg-gradient-to-r ${gradient} rounded-lg text-xs font-semibold text-white`}>
                            {article.category}
                          </div>
                          <span className="text-xs text-slate-500">{article.date}</span>
                        </div>

                        {/* Article Title */}
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-amber-400 group-hover:bg-clip-text transition-all duration-300">
                          {article.title}
                        </h4>

                        {/* Article Description */}
                        <p className="text-slate-400 mb-6 leading-relaxed">
                          {article.description}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-red-400 font-medium group-hover:gap-3 transition-all duration-200">
                          <span>阅读更多</span>
                          <ArrowRightIcon />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">{siteConfig.name} © 2025</p>
        </div>
      </footer>
    </div>
  )
}
