import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Add, DragIndicator, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';

interface Meal {
  id: string;
  day: string;
  mealType: string;
  recipe: string;
  notes: string;
}

const MealPlan = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [mealPlan, setMealPlan] = useState<Meal[]>([
    {
      id: '1',
      day: 'Monday',
      mealType: 'Dinner',
      recipe: 'Tomato Pasta',
      notes: 'Use fresh tomatoes from inventory'
    },
    {
      id: '2',
      day: 'Tuesday',
      mealType: 'Lunch',
      recipe: 'Avocado Toast',
      notes: 'Add chili flakes for spice'
    }
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const getMealsForDay = (day: string) => {
    return mealPlan.filter(meal => meal.day === day);
  };

  const handleAddMeal = () => {
    if (!selectedDay || !selectedMealType) {
      toast.error('Please select both day and meal type');
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      day: selectedDay,
      mealType: selectedMealType,
      recipe: 'New Recipe',
      notes: 'Add your notes here...'
    };

    setMealPlan(prev => [...prev, newMeal]);
    setOpenDialog(false);
    setSelectedDay('');
    setSelectedMealType('');
    toast.success('Meal added to plan!');
  };

  const handleDeleteMeal = (id: string) => {
    setMealPlan(prev => prev.filter(meal => meal.id !== id));
    toast.info('Meal removed from plan');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Meal Planner
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Plan your weekly meals and generate shopping lists
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ mb: 3 }}
        >
          Add Meal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {days.map(day => {
          const dayMeals = getMealsForDay(day);
          return (
            <Grid item xs={12} md={6} lg={4} key={day}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    {day}
                  </Typography>

                  {dayMeals.length === 0 ? (
                    <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No meals planned
                    </Typography>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {dayMeals.map(meal => (
                        <Box
                          key={meal.id}
                          sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                            <Chip 
                              label={meal.mealType} 
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleDeleteMeal(meal.id)}
                            >
                              <Delete />
                            </Button>
                          </Box>
                          
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {meal.recipe}
                          </Typography>
                          
                          {meal.notes && (
                            <Typography variant="body2" color="text.secondary">
                              {meal.notes}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" size="large" sx={{ px: 4 }}>
          Generate Shopping List
        </Button>
      </Box>

      {/* Add Meal Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Meal to Plan</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Day</InputLabel>
              <Select
                value={selectedDay}
                label="Day"
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {days.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Meal Type</InputLabel>
              <Select
                value={selectedMealType}
                label="Meal Type"
                onChange={(e) => setSelectedMealType(e.target.value)}
              >
                {mealTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Recipe"
              placeholder="Enter recipe name"
              fullWidth
            />

            <TextField
              label="Notes"
              placeholder="Add any notes..."
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddMeal} variant="contained">
            Add Meal
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MealPlan;