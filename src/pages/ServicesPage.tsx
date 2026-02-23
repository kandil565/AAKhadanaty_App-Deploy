import { useState } from "react";
import { services, categories } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) => {
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = s.name.includes(search) || s.description.includes(search);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">جميع الخدمات</h1>
          <p className="text-muted-foreground">اختر الخدمة المناسبة من بين {services.length} خدمة متاحة</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن خدمة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">لا توجد نتائج مطابقة لبحثك</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
