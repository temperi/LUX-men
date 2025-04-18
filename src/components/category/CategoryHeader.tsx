
interface CategoryHeaderProps {
  title: string;
  description: string;
}

export const CategoryHeader = ({ title, description }: CategoryHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-white/80 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};
