import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  TextField
} from '@mui/material';
import { Search, AccessTime, Restaurant, Favorite } from '@mui/icons-material';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: string;
  ingredients: string[];
  category: string;
}

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Avocado Toast',
      description: 'Creamy avocado on crispy toast with a sprinkle of chili flakes.',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
      cookTime: '10 mins',
      difficulty: 'Easy',
      ingredients: ['Avocado', 'Bread', 'Lemon', 'Chili Flakes', 'Salt'],
      category: 'Breakfast'
    },
    {
      id: '2',
      title: 'Tomato Pasta',
      description: 'Fresh tomato sauce with herbs over al dente pasta.',
      image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop',
      cookTime: '25 mins',
      difficulty: 'Medium',
      ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Basil', 'Olive Oil'],
      category: 'Lunch'
    },
    {
      id: '3',
      title: 'Vegetable Stir Fry',
      description: 'Quick and healthy stir fry with fresh seasonal vegetables.',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e0571?w=400&h=300&fit=crop',
      cookTime: '15 mins',
      difficulty: 'Easy',
      ingredients: ['Mixed Vegetables', 'Soy Sauce', 'Ginger', 'Garlic', 'Sesame Oil'],
      category: 'Dinner'
    }
  ];

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

  const filteredRecipes = recipes.filter(recipe =>
    (selectedCategory === 'All' || recipe.category === selectedCategory) &&
    (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Recipe Ideas
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Discover delicious recipes based on your ingredients
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{ flexGrow: 1, minWidth: 250 }}
          />
          <Button variant="outlined" startIcon={<Restaurant />}>
            Use My Ingredients
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  {recipe.title}
                </Typography>
                
                <Typography color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                  {recipe.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<AccessTime />} 
                    label={recipe.cookTime} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    label={recipe.difficulty} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                  <Chip 
                    label={recipe.category} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                  {recipe.ingredients.length > 3 && '...'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button variant="outlined" size="small" fullWidth>
                    View Recipe
                  </Button>
                  <Button size="small" color="error">
                    <Favorite />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredRecipes.length === 0 && (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No recipes found. Try a different search or category.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Recipes;