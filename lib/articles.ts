import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  title: string
  date: string
  category: string
  keywords: string[]
  description: string
  content: string
}

export function getAllArticles(): Article[] {
  // 检查目录是否存在
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        keywords: data.keywords,
        description: data.description,
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return articles
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      keywords: data.keywords,
      description: data.description,
      content,
    }
  } catch {
    return null
  }
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles()
  return articles.filter(article => article.category === category)
}
