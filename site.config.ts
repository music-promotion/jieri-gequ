export const siteConfig = {
  name: "节日歌曲大全",
  domain: "jieri-gequs.top",
  description: "提供各类节日歌曲推荐、节日音乐资源，涵盖春节、中秋、国庆等传统节日音乐",
  keywords: ["节日歌曲", "节日音乐", "传统节日歌曲", "节日歌曲推荐"],
  
  // 目标产品
  targetProduct: {
    name: "AndMusic.chat",
    url: "https://andmusic.chat",
    description: "AI 音乐生成工具，一键生成专属节日歌曲"
  },
  
  // 站点主题
  theme: {
    primaryColor: "#ef4444",
    categories: ["春节", "中秋", "国庆", "元宵", "端午", "七夕"]
  },
  
  // 百度推送
  baidu: {
    siteUrl: "https://jieri-gequs.top",
    token: "" // 待填充
  },
  
  // 关联站点（用于外链推荐）
  relatedSites: [
    { name: "春节歌曲专题", url: "https://chunjie-music.top" },
    { name: "AI音乐生成工具", url: "https://ai-music-tools.top" },
    { name: "生日歌曲定制", url: "https://birthday-song-ai.top" }
  ]
}
