
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">LUXMEN</h3>
            <p className="text-white/60 text-sm">
              Премиальная мужская одежда
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">
              О нас
            </Link>
            <Link to="/collections" className="text-white/80 hover:text-white transition-colors">
              Коллекции
            </Link>
          </div>
          
          <div>
            <div className="flex space-x-4 justify-center md:justify-end">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} LUXMEN. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
