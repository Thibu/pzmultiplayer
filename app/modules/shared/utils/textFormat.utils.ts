const STEAM_CLAN_IMAGE_BASE = 'https://clan.cloudflare.steamstatic.com/images'

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function replacePlaceholders(input: string): string {
  return input.replace(/\{STEAM_CLAN_IMAGE\}/g, STEAM_CLAN_IMAGE_BASE)
}

function applyBasicTags(escaped: string): string {
  // Order matters minimally here; use non-greedy and dotall
  let out = escaped
    .replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1<\/strong>')
    .replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1<\/em>')
    .replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1<\/u>')
    .replace(/\[h3\]([\s\S]*?)\[\/h3\]/gi, '<h3>$1<\/h3>')
    .replace(/\[p\]([\s\S]*?)\[\/p\]/gi, '<p>$1<\/p>')

  // Remove [expand ...] wrappers (unwrap content)
  out = out.replace(/\[expand[^\]]*\]/gi, '')
  out = out.replace(/\[\/expand\]/gi, '')

  // [url=href]text[/url]
  out = out.replace(/\[url=([\s\S]*?)\]([\s\S]*?)\[\/url\]/gi, (_m, href: string, text: string) => {
    const safeHref = escapeAttribute(href)
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${text}</a>`
  })

  // [img src="..."][/img] — support both raw and escaped quotes (after escapeHtml)
  out = out.replace(/\[img\s+src=(?:\"|&quot;|&#39;)([\s\S]*?)(?:\"|&quot;|&#39;)\]\[\/img\]/gi, (_m, src: string) => {
    const safeSrc = escapeAttribute(src.trim())
    return `<img src="${safeSrc}" alt="" loading="lazy" />`
  })

  // [img]url[/img]
  out = out.replace(/\[img\]\s*([\s\S]*?)\s*\[\/img\]/gi, (_m, src: string) => {
    const safeSrc = escapeAttribute(src.trim())
    return `<img src="${safeSrc}" alt="" loading="lazy" />`
  })

  return out
}

function buildLists(inputWithTags: string): string {
  const lines = inputWithTags.split(/\n/)
  const html: string[] = []
  let inUl = false
  let inSubUl = false

  const closeAllLists = () => {
    if (inSubUl) { html.push('</ul>'); inSubUl = false }
    if (inUl) { html.push('</ul>'); inUl = false }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    if (/^--\s+/.test(line)) {
      const content = line.replace(/^--\s+/, '')
      if (!inUl) { html.push('<ul>'); inUl = true }
      if (!inSubUl) { html.push('<ul>'); inSubUl = true }
      html.push(`<li>${content}</li>`)
      continue
    }
    if (/^-\s+/.test(line)) {
      const content = line.replace(/^-\s+/, '')
      if (inSubUl) { html.push('</ul>'); inSubUl = false }
      if (!inUl) { html.push('<ul>'); inUl = true }
      html.push(`<li>${content}</li>`)
      continue
    }

    // Not a list line
    closeAllLists()
    html.push(line)
  }

  closeAllLists()
  return html.join('\n')
}

export function formatSteamContent(input: string): string {
  if (!input) return ''
  // Normalize and substitute placeholders
  const normalized = replacePlaceholders(input.replace(/\r\n?/g, '\n'))
  // Escape HTML special chars first to avoid injection from the API
  const escaped = escapeHtml(normalized)
  // Apply common BBCode-like tags used by Steam
  const withTags = applyBasicTags(escaped)
  // Convert markdown-like lists (- and --) to <ul><li>
  const withLists = buildLists(withTags)
  // Convert remaining newlines to <br/>, but avoid adding inside tags unnecessarily
  const html = withLists.replace(/\n{2,}/g, '<br/><br/>').replace(/\n/g, '<br/>')
  return html
}

const textFormat = {
  formatSteamContent,
}

export default textFormat


