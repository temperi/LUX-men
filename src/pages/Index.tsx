import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Sale } from "@/components/Sale";
import { Promotions } from "@/components/Promotions";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Promotions />
      <Sale />
      <Footer />
    </div>
  );
};

export default Index;