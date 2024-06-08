import Hero from "./components/Hero";
import FinancialLiteracy from "./components/FinancialLiteracy";
import Chatbot from "./components/Chatbot";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <main>
      <div className="">
        <div id="home">
          <Hero />
        </div>
        <div id="learn">
          <FinancialLiteracy />
        </div>
        <div className="fixed bottom-[20px] right-[20px] z-20">
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
