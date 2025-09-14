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

function convertDashListsToBBCode(input: string): string {
  const lines = input.split(/\n/)
  const out: string[] = []
  let inList = false

  const flushList = () => {
    if (inList) { out.push('[/list]'); inList = false }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (/^--\s+/.test(line)) {
      const content = line.replace(/^--\s+/, '')
      if (!inList) { out.push('[list]'); inList = true }
      out.push(`[*]${content}`)
      continue
    }
    flushList()
    out.push(line)
  }

  flushList()
  return out.join('\n')
}

export function preprocessSteamBBCode(raw: string): string {
  if (!raw) return ''
  let text = normalizeNewlines(raw)
  text = replacePlaceholders(text)
  text = stripExpandTags(text)
  text = normalizeImgTags(text)
  text = convertDashListsToBBCode(text)
  // Collapse excessive blank lines to at most two
  text = text.replace(/\n{3,}/g, '\n\n')
  return text
}

const bbcodeUtils = {
  preprocessSteamBBCode,
}

export default bbcodeUtils


