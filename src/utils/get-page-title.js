import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Yidu Platform Management'
// 设置当前网页的标题
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
