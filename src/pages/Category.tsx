
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { ProductModal } from "@/components/ProductModal";
import { categoryData } from "@/data/categoryData";
import { CategoryHeader } from "@/components/category/CategoryHeader";
import { CategoryNotFound } from "@/components/category/CategoryNotFound";
import { ProductGrid } from "@/components/category/ProductGrid";
import { useCategory } from "@/hooks/useCategory";

const Category = () => {
  const { type } = useParams<{ type: string }>();
  const { 
    selectedProduct, 
    isModalOpen, 
    favorites, 
    handleViewDetails, 
    handleToggleFavorite, 
    setIsModalOpen 
  } = useCategory();
  
  const category = type ? categoryData[type as keyof typeof categoryData] : null;

  if (!category) {
    return <CategoryNotFound />;
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <CategoryHeader title={category.title} description={category.description} />
          <ProductGrid 
            products={category.products}
            onViewDetails={handleViewDetails}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
      
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={{
            ...selectedProduct,
            description: selectedProduct.description || "" // Ensure description is always provided
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Category;
