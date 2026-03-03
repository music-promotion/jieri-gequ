import { siteConfig } from '@/site.config'
import Link from 'next/link'

// SVG Icons
const MusicIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

export default function Home() {
  const festivals = [
    { name: '春节', month: '正月', color: 'from-red-600 to-red-800' },
    { name: '元宵', month: '正月', color: 'from-orange-600 to-red-700' },
    { name: '端午', month: '五月', color: 'from-green-600 to-emerald-700' },
    { name: '七夕', month: '七月', color: 'from-pink-600 to-rose-700' },
    { name: '中秋', month: '八月', color: 'from-yellow-600 to-amber-700' },
    { name: '国庆', month: '十月', color: 'from-red-700 to-rose-800' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Floating Header */}
      <header className="fixed top-6 left-6 right-6 z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{siteConfig.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5">传统节日 · 音乐文化</p>
          </div>
          <Link
            href="/articles"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
          >
            浏览文章
          </Link>
        </div>
      </header>

      {/* Hero Section - Exaggerated Minimalism */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Oversized Typography */}
          <div className="max-w-6xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-red-600/20 to-amber-600/20 rounded-full border border-red-500/30">
              <SparklesIcon />
              <span className="text-sm font-medium text-red-300">传统节日音乐宝库</span>
            </div>
            
            <h2 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tight leading-none">
              节日
              <span className="block bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent">
                歌曲
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              从传统民乐到现代流行，为每个节日找到最动听的旋律
            </p>

            {/* CTA Above Fold */}
            <a
              href={siteConfig.targetProduct.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg shadow-xl shadow-green-500/30 transition-all duration-200 cursor-pointer group"
            >
              <MusicIcon />
              <span>AI 生成专属节日歌曲</span>
              <ArrowRightIcon />
            </a>
          </div>

          {/* Festival Calendar Layout - Unique Design */}
          <div className="max-w-7xl mx-auto mb-20">
            <h3 className="text-4xl font-bold text-white mb-12 text-center">节日日历</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {festivals.map((festival, index) => (
                <Link
                  key={festival.name}
                  href="/articles"
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${festival.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                    <CalendarIcon />
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold mb-1">{festival.name}</div>
                      <div className="text-sm opacity-80">{festival.month}</div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Features Section - Minimal Cards */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <MusicIcon />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">精选曲库</h4>
                <p className="text-slate-400 leading-relaxed">
                  涵盖春节、中秋、国庆等传统节日，从民乐到流行应有尽有
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <CalendarIcon />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">节日氛围</h4>
                <p className="text-slate-400 leading-relaxed">
                  根据不同节日特色，推荐最应景的音乐，营造浓厚节日氛围
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <SparklesIcon />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">AI 定制</h4>
                <p className="text-slate-400 leading-relaxed">
                  使用 AI 工具，一键生成专属节日歌曲，让你的庆典独一无二
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section - Bold Minimal */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 p-12 text-center">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  定制专属节日歌曲
                </h3>
                <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
                  {siteConfig.targetProduct.description}
                </p>
                <a
                  href={siteConfig.targetProduct.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-red-50 transition-all duration-200 shadow-2xl cursor-pointer group"
                >
                  <span>立即体验</span>
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Related Sites - Minimal Grid */}
          <div className="max-w-6xl mx-auto mt-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">相关推荐</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {siteConfig.relatedSites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{site.name}</span>
                    <ArrowRightIcon />
                  </div>
                </a>
              ))}
            </div>
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
