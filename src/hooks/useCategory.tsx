
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/categoryData";

export const useCategory = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    toast({
      title: favorites.includes(productId) ? "Удалено из избранного" : "Добавлено в избранное",
      description: favorites.includes(productId) 
        ? "Товар удален из списка избранного" 
        : "Товар добавлен в список избранного",
    });
  };

  return {
    selectedProduct,
    isModalOpen,
    favorites,
    handleViewDetails,
    handleToggleFavorite,
    setIsModalOpen
  };
};
