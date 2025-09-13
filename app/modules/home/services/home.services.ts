"use server"

import { httpGet } from "../../shared/services/httpServices"
import { SteamAppNewsResponse } from "../../home/interfaces/steamData.interface"

export const fetchSteamNews = async (): Promise<SteamAppNewsResponse> => {
    const endPoint = process.env.STEAM_API || ""
    const response = await httpGet<SteamAppNewsResponse>(endPoint)
    return response
}