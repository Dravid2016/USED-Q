import {
  Smartphone,
  Laptop,
  Car,
  Home,
  Shirt,
  Armchair,
  BookOpen,
  Dumbbell,
  Briefcase,
  Package,
} from 'lucide-react';

export const categoryIconMap = {
  mobiles: Smartphone,
  electronics: Laptop,
  vehicles: Car,
  property: Home,
  fashion: Shirt,
  furniture: Armchair,
  books: BookOpen,
  sports: Dumbbell,
  jobs: Briefcase,
  other: Package,
};

export interface CategoryIconProps {
  id: string;
  className?: string;
}

export default function CategoryIcon({ id, className = "w-6 h-6" }: CategoryIconProps) {
  const IconComponent = categoryIconMap[id as keyof typeof categoryIconMap] || Package;
  return <IconComponent className={className} />;
}
