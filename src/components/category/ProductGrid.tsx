
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/data/categoryData";

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const ProductGrid = ({ 
  products, 
  onViewDetails, 
  favorites, 
  onToggleFavorite 
}: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
