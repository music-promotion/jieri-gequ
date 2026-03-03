import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { siteConfig } from '@/site.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

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

  return {
    title: `${article.title} - ${siteConfig.name}`,
    description: article.description,
    keywords: article.keywords.join(', '),
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-700">
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">首页</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-red-600">文章</Link>
            <span>/</span>
            <span>{article.category}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          {/* 文章头部 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                {article.category}
              </span>
              <span>{article.date}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600">
              {article.description}
            </p>
          </div>

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                hr: () => <hr className="my-8 border-gray-200" />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* 返回按钮 */}
          <div className="mt-12 pt-8 border-t">
            <Link
              href="/articles"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              ← 返回文章列表
            </Link>
          </div>
        </article>
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
