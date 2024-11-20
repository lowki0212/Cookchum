import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, 
  DialogActions, DialogContent, DialogTitle, TextField, Box, IconButton, Avatar, Select, MenuItem, 
  InputLabel, FormControl
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import './FavoriteTab.css';
import { useLocation,useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';

const FavoriteRecipesTab = () => {
  const [favorites, setFavorites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ recipeId: '', dateAdded: '' });
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();


  const location = useLocation();
  const userId = location.state?.userId;
  const handleBack = () => {
    navigate(-1);
}
  
  // Fetch favorites for the logged-in user
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`/api/favRecipes/getFavRecipe?userId=${userId}`);
      console.log(response.data); // Log to check if recipe is included in the response
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  }, [userId]);

  // Fetch all available recipes for the dropdown
  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recipe/getAllRecipes');
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
      fetchRecipes();
    }
  }, [userId, fetchFavorites, fetchRecipes]);

  /*const handleOpenDialog = () => {
    setFormData({ recipeId: '', dateAdded: '' });
    setOpenDialog(true);
  };*/

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ recipeId: '', dateAdded: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const selectedRecipe = recipes.find(recipe => recipe.recipeId === formData.recipeId);
      
      const payload = {
        dateAdded: formData.dateAdded || null,
        recipe: selectedRecipe,  // Send the whole recipe object
        user: { userId: userId }  // Keep the user ID as before
      };
  
      // Make the POST request with the full recipe object
      await axios.post("/api/favRecipes/postFavRecipe", payload, {
        headers: {
          "Content-Type": "application/json", // Explicitly set Content-Type
        }
      });
      
      fetchFavorites();  // Fetch the updated favorites list
      handleCloseDialog();  // Close the dialog
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/favRecipes/deleteFavRecipe/${id}`);
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1em', marginTop: '1em' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">Favorite Recipes</Typography>
        <IconButton color="primary" aria-label="user profile">
          <Avatar><AccountCircleIcon /></Avatar>
        </IconButton>
      </Box>
      
      

      
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Favorite ID</TableCell>
              <TableCell>Recipe</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.favoriteId}>
                <TableCell>{favorite.favoriteId}</TableCell>
                <TableCell>
                  {favorite.recipe?.name || "Unknown"}
                </TableCell>
                <TableCell>{favorite.dateAdded}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(favorite.favoriteId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        style={{ marginBottom: '1em' }}
      > 
        Back
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Recipe</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="recipe-select-label">Recipe</InputLabel>
            <Select
              labelId="recipe-select-label"
              name="recipeId"
              value={formData.recipeId}
              onChange={handleChange}
            >
              {recipes.map((recipe) => (
                <MenuItem key={recipe.recipeId} value={recipe.recipeId}>
                  {recipe.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date Added"
            name="dateAdded"
            value={formData.dateAdded}
            onChange={handleChange}
            fullWidth
            margin="dense"
            type="date"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default FavoriteRecipesTab;
