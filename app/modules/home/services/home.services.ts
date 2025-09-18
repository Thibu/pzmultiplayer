// This module is used by both server and client (React Query). Do not mark as server-only.
// Note: This module is imported by client components via React Query; do not mark as server-only.

import { httpGet } from "../../shared/services/httpServices"
import { SteamAppNewsResponse } from "../../home/interfaces/steamData.interface"

export const fetchSteamNews = async (): Promise<SteamAppNewsResponse> => {
    const endPoint = "steam-news"
    const response = await httpGet<SteamAppNewsResponse>(endPoint)

    const newsItems = response?.appnews?.newsitems ?? []
    if (newsItems.length > 0) {
        const seenByGid = new Set<string>()
        const seenComposite = new Set<string>()
        const uniqueItems = newsItems.filter((item) => {
            const gidKey = String(item.gid)
            if (gidKey && gidKey !== "0") {
                if (seenByGid.has(gidKey)) return false
                seenByGid.add(gidKey)
            }

            const title = item.title ?? ""
            const contents = item.contents ?? ""
            const compositeKey = `${title}__SEP__${contents}`
            if (seenComposite.has(compositeKey)) return false
            seenComposite.add(compositeKey)
            return true
        })

        if (uniqueItems.length !== newsItems.length) {
            response.appnews.newsitems = uniqueItems
            response.appnews.count = uniqueItems.length
        }
    }

    return response
}

// Fetch only the latest news item from upstream (count=1). Used for lightweight periodic checks.
export const fetchLatestSteamNews = async (): Promise<SteamAppNewsResponse> => {
    const endPoint = "steam-news?count=1"
    const response = await httpGet<SteamAppNewsResponse>(endPoint)
    return response
}