import { Package, Truck } from "lucide-react";

interface ProductDetailsProps {
  details: {
    season: string;
    material: string;
    composition: string;
    collection: string;
    style: string;
  };
}

export const ProductDetails = ({ details }: ProductDetailsProps) => {
  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="font-semibold mb-3">О товаре</h4>
      <div className="space-y-2">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-white/60">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          <span>Модель: рост 182 см, размер XXL</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          <span>Доставка послезавтра</span>
        </div>
      </div>
    </div>
  );
};