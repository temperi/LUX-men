
-- Таблица отзывов
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  likes INTEGER DEFAULT 0 NOT NULL,
  dislikes INTEGER DEFAULT 0 NOT NULL
);

-- Таблица реакций на отзывы (лайки/дизлайки)
CREATE TABLE IF NOT EXISTS public.review_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, review_id)
);

-- Таблица избранных отзывов
CREATE TABLE IF NOT EXISTS public.favorite_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, review_id)
);

-- RLS политики для отзывов
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Все могут просматривать отзывы
CREATE POLICY "Отзывы доступны для чтения всем" 
ON public.reviews FOR SELECT 
USING (true);

-- Пользователи могут создавать свои отзывы
CREATE POLICY "Пользователи могут создавать свои отзывы" 
ON public.reviews FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Пользователи могут редактировать свои отзывы
CREATE POLICY "Пользователи могут редактировать свои отзывы" 
ON public.reviews FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Пользователи могут удалять свои отзывы
CREATE POLICY "Пользователи могут удалять свои отзывы" 
ON public.reviews FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- RLS политики для реакций
ALTER TABLE public.review_reactions ENABLE ROW LEVEL SECURITY;

-- Все могут просматривать реакции
CREATE POLICY "Реакции доступны для чтения всем" 
ON public.review_reactions FOR SELECT 
USING (true);

-- Пользователи могут создавать свои реакции
CREATE POLICY "Пользователи могут создавать свои реакции" 
ON public.review_reactions FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять свои реакции
CREATE POLICY "Пользователи могут обновлять свои реакции" 
ON public.review_reactions FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Пользователи могут удалять свои реакции
CREATE POLICY "Пользователи могут удалять свои реакции" 
ON public.review_reactions FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- RLS политики для избранных отзывов
ALTER TABLE public.favorite_reviews ENABLE ROW LEVEL SECURITY;

-- Пользователи могут видеть только свои избранные отзывы
CREATE POLICY "Избранные отзывы видны только их владельцам" 
ON public.favorite_reviews FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Пользователи могут добавлять отзывы в избранное
CREATE POLICY "Пользователи могут добавлять отзывы в избранное" 
ON public.favorite_reviews FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Пользователи могут удалять из избранного
CREATE POLICY "Пользователи могут удалять из избранного" 
ON public.favorite_reviews FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
