const STEAM_CLAN_IMAGE_BASE = 'https://clan.cloudflare.steamstatic.com/images'

function normalizeNewlines(input: string): string {
  return input.replace(/\r\n?/g, '\n')
}

function replacePlaceholders(input: string): string {
  return input.replace(/\{STEAM_CLAN_IMAGE\}/g, STEAM_CLAN_IMAGE_BASE)
}

function stripExpandTags(input: string): string {
  return input
    .replace(/\[expand[^\]]*\]/gi, '')
    .replace(/\[\/expand\]/gi, '')
}

function normalizeImgTags(input: string): string {
  // Convert [img src="..."][/img] => [img]...[/img]
  return input.replace(/\[img\s+src=(?:\"|&quot;|&#39;)([\s\S]*?)(?:\"|&quot;|&#39;)\]\[\/img\]/gi, (_m, src: string) => {
    return `[img]${src.trim()}[/img]`
  })
}

function sanitizeUnknownBracketedSegments(input: string): string {
  const knownSimple = new Set([
    'img','/img','b','/b','i','/i','u','/u','h1','/h1','h3','/h3','p','/p','list','/list','li','/li','ul','/ul','*','/*','expand','/expand','previewyoutube','/previewyoutube','url','/url'
  ])
  return input.replace(/\[([^\]\[]+)\]/g, (match: string, inner: string) => {
    const trimmed = inner.trim()
    const lower = trimmed.toLowerCase()
    // Allow parameterized known tags
    if (lower.startsWith('url=') || lower.startsWith('img ') || lower.startsWith('previewyoutube=')) return match
    if (knownSimple.has(lower)) return match
    // If it looks like a valid bbcode name (letters/numbers only) keep it
    if (/^[a-z0-9]+$/i.test(trimmed)) return match
    // Otherwise neutralize to parentheses to avoid being parsed as a tag
    return `(${trimmed})`
  })
}

function convertPreviewYouTubeToLinks(input: string): string {
  let out = input
  // [previewyoutube=VIDEO_ID;full][/previewyoutube]
  out = out.replace(/\[previewyoutube=([^\];\]]+)(?:;[^\]]*)?\](?:\[\/previewyoutube\])?/gi, (_m, videoId: string) => {
    const id = videoId.trim()
    return `[url=https://www.youtube.com/watch?v=${id}]Watch on YouTube[/url]`
  })
  // [previewyoutube]VIDEO_ID[/previewyoutube]
  out = out.replace(/\[previewyoutube\]([\s\S]*?)\[\/previewyoutube\]/gi, (_m, body: string) => {
    const id = body.trim()
    if (!id) return ''
    return `[url=https://www.youtube.com/watch?v=${id}]Watch on YouTube[/url]`
  })
  return out
}

function simplifyListsToDashes(input: string): string {
  // Convert [list...][*]..[/\*]...[/list] blocks into simple "- " bullet lines
  let out = input.replace(/\[list[^\]]*\]([\s\S]*?)\[\/list\]/gi, (_m, inner: string) => {
    let body = inner
      .replace(/\[\*\]/gi, '\n- ')
      .replace(/\[\/\*\]/gi, '')
      .trim()
    if (!body.startsWith('\n- ')) body = `\n- ${body}`
    return `${body}\n`
  })
  // Cleanup any stray [*] or [/ *] outside of list blocks to avoid invalid "*" tag
  out = out.replace(/\[\*\]/gi, '- ').replace(/\[\/\*\]/gi, '')
  return out
}

// Removed convertDashListsToBBCode to avoid introducing [*] tags that break rendering

export function preprocessSteamBBCode(raw: string): string {
  if (!raw) return ''
  let text = normalizeNewlines(raw)
  text = replacePlaceholders(text)
  text = stripExpandTags(text)
  text = normalizeImgTags(text)
  text = sanitizeUnknownBracketedSegments(text)
  text = convertPreviewYouTubeToLinks(text)
  // Simplify Steam BBCode lists to plain dash bullets to avoid invalid tags like [*]
  text = simplifyListsToDashes(text)
  // Collapse excessive blank lines to at most two
  text = text.replace(/\n{3,}/g, '\n\n')
  return text
}

const bbcodeUtils = {
  preprocessSteamBBCode,
}

export default bbcodeUtils


