import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <img
        src={images[selectedImage]}
        alt={name}
        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
      />
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${name} ${index + 1}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer ${
              selectedImage === index ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  );
};