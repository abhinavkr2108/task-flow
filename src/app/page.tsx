import LandingPage from "@/components/LandingPage";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <LandingPage />
    </main>
  );
}
