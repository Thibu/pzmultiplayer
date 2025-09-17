export const dynamic = 'force-dynamic'

import { fetchSteamNews } from "./modules/home/services/home.services";
import { Home } from "./modules/home/components/Home";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const HomePage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['steamNews'],
    queryFn: fetchSteamNews,
  })
  const state = dehydrate(queryClient)
  return (
    <HydrationBoundary state={state}>
      <Home />
    </HydrationBoundary>
  )
}

export default HomePage