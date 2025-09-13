import { fetchSteamNews } from "./modules/home/services/home.services";
import { Home } from "./modules/home/components/Home";

const HomePage = async () => {
  const steamNews = await fetchSteamNews()
  return (
    <Home steamNews={steamNews} />
  )
}

export default HomePage