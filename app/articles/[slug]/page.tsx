import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { siteConfig } from '@/site.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// SVG Icons
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: '文章未找到',
    }
  }

  const articleUrl = `https://${siteConfig.domain}/articles/${slug}`

  return {
    title: `${article.title} - ${siteConfig.name}`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    
    // Open Graph
    openGraph: {
      type: "article",
      locale: "zh_CN",
      url: articleUrl,
      title: article.title,
      description: article.description,
      siteName: siteConfig.name,
      publishedTime: article.date,
      authors: [siteConfig.name],
      tags: article.keywords,
    },
    
    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    
    // Canonical URL
    alternates: {
      canonical: articleUrl,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // JSON-LD 结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `https://${siteConfig.domain}`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${siteConfig.domain}/articles/${slug}`,
    },
    keywords: article.keywords.join(", "),
    articleSection: article.category,
    inLanguage: "zh-CN",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating Header */}
      <header className="fixed top-6 left-6 right-6 z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <h1 className="text-xl font-bold text-white">{siteConfig.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <HomeIcon />
              <span>/</span>
              <Link href="/articles" className="hover:text-white transition-colors duration-200">文章</Link>
              <span>/</span>
              <span className="text-red-400">{article.category}</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Article Header - Exaggerated Typography */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
                <CalendarIcon />
                {article.category}
              </div>
              <span className="text-sm text-slate-500">{article.date}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Article Content - Styled Markdown */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-white mt-12 mb-6 tracking-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-white mt-10 mb-5 tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-3 mb-6 ml-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-3 mb-6 ml-6">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-slate-300 text-lg leading-relaxed pl-2">
                    <span className="text-red-400 mr-3">•</span>
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-red-400 hover:text-red-300 underline decoration-red-400/30 hover:decoration-red-300 transition-colors duration-200 cursor-pointer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-white">
                    {children}
                  </strong>
                ),
                hr: () => (
                  <hr className="my-12 border-white/10" />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/articles"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-medium transition-all duration-200 cursor-pointer group"
            >
              <ArrowLeftIcon />
              <span>返回文章列表</span>
            </Link>
          </div>
        </article>
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
