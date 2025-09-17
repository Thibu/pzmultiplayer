import { NewsItem, SteamAppNewsResponse } from "../interfaces/steamData.interface"
import { preprocessSteamBBCode } from "@/app/modules/shared/utils/bbcode.utils"

export interface MultiplayerDetectionResult {
  introduced: boolean
  introducedAt: Date | null
  score: number
  reasons: string[]
  matchedNewsGid?: string
}

// Strong multiplayer indicators (as standalone words)
const STRONG_MULTI_PATTERNS = [
  /\bmultiplayer\b/i,
  /\bmulti-?player\b/i,
  /\bco-?op\b/i,
  /\bpvp\b/i,
  /\bpve\b/i,
  /\bcross-?play\b/i,
]

// Note: weaker terms like online/lan/server are ignored unless paired as 'dedicated server' in a sentence

// Keep only essential verbs; broader words like "released/available/live" cause noise
const ACTION_TERMS = [
  "add",
  "added",
  "enable",
  "enabled",
  "support",
  "supports",
  "introduce",
  "introduced",
]

const NEGATIVE_TERMS = [
  "remove",
  "removed",
  "disable",
  "disabled",
  "temporarily",
  "temporary",
  "experimental",
  "beta only",
  "not available",
  "no multiplayer",
]

function normalizeForScoring(input: string): string {
  const pre = preprocessSteamBBCode(input)
  // Drop BBCode remnants like [b]...[/b]
  return pre.replace(/\[[^\]]+\]/g, " ").toLowerCase()
}

function splitIntoSentences(input: string): string[] {
  return input
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(Boolean)
}

function countMatches(patterns: RegExp[], text: string): number {
  let count = 0
  for (const pat of patterns) {
    if (pat.test(text)) count++
  }
  return count
}

function scoreNewsItem(item: NewsItem): { score: number; reasons: string[] } {
  const text = normalizeForScoring(`${item.title}\n\n${item.contents}`)
  let score = 0
  const reasons: string[] = []

  const titleHasStrong = STRONG_MULTI_PATTERNS.some(p => p.test(item.title))
  if (titleHasStrong) { score += 2; reasons.push("Title references multiplayer") }

  const strongHits = countMatches(STRONG_MULTI_PATTERNS, text)
  if (strongHits > 0) { score += Math.min(4, strongHits * 2); reasons.push(`Strong multiplayer terms x${strongHits}`) }

  const sentences = splitIntoSentences(text)
  const actionNearStrong = sentences.some(s =>
    STRONG_MULTI_PATTERNS.some(p => p.test(s)) && ACTION_TERMS.some(a => s.includes(a))
  )
  if (actionNearStrong) { score += 3; reasons.push("Action in same sentence as multiplayer term") }

  // Dedicated server mention (treat as strong when 'dedicated' and 'server' appear in same sentence)
  const hasDedicatedServer = sentences.some(s => /\bdedicated\b/i.test(s) && /\bserver\b/i.test(s))
  if (hasDedicatedServer) { score += 3; reasons.push("Dedicated server mention") }

  // Negations reduce score when co-existing with strong signals in the same sentence
  const negativeNear = sentences.some(s =>
    NEGATIVE_TERMS.some(n => s.includes(n)) &&
    (STRONG_MULTI_PATTERNS.some(p => p.test(s)) || (/\bdedicated\b/i.test(s) && /\bserver\b/i.test(s)))
  )
  if (negativeNear) { score -= 4; reasons.push("Negation near multiplayer terms") }

  return { score, reasons }
}

export function detectMultiplayerFromNews(resp?: SteamAppNewsResponse | null): MultiplayerDetectionResult {
  if (!resp?.appnews?.newsitems?.length) {
    return { introduced: false, introducedAt: null, score: 0, reasons: [] }
  }

  const items = resp.appnews.newsitems

  // Compute scores for all items
  const scored: Array<{ item: NewsItem; score: number; reasons: string[] }> = items.map(item => {
    const { score, reasons } = scoreNewsItem(item)
    return { item, score, reasons }
  })

  // Candidates that meet the threshold
  const candidates = scored.filter(s => s.score >= 6)

  if (candidates.length === 0) {
    // If none qualify, return top score (for debugging/insight)
    const top = scored.reduce((a, b) => (a.score >= b.score ? a : b), scored[0])
    return { introduced: false, introducedAt: null, score: top?.score ?? 0, reasons: top?.reasons ?? [] }
  }

  // Pick the oldest qualifying news (smallest date)
  const oldest = candidates.reduce((old, cur) => (cur.item.date < old.item.date ? cur : old), candidates[0])
  const introducedAt = new Date(oldest.item.date * 1000)
  return {
    introduced: true,
    introducedAt,
    score: oldest.score,
    reasons: oldest.reasons,
    matchedNewsGid: String(oldest.item.gid),
  }
}


