import { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Ingredient } from '@/app/api/ingredients/mock-ingredients';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axiosInstance.get('/ingredients');
        setIngredients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ingredients');
        setTimeout(() => setLoading(false), 4000)
        console.error('Error fetching ingredients:', err);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, loading, error };
}; 