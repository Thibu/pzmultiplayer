// This module is used by both server and client (React Query). Do not mark as server-only.

import { httpGet } from "../../shared/services/httpServices"
import { SteamAppNewsResponse } from "../../home/interfaces/steamData.interface"

export const fetchSteamNews = async (): Promise<SteamAppNewsResponse> => {
    const endPoint = "steam-news"
    const response = await httpGet<SteamAppNewsResponse>(endPoint)
    return response
}