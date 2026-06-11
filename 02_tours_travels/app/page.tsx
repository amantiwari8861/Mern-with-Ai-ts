import LandingPage from "@/views/LandingPage";

// Renders DB-backed collections — fetch at request time so new destinations
// appear without a rebuild.
export const dynamic = "force-dynamic";

const HomePage = async () => {
  return <LandingPage />;
};

export default HomePage;
