import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Search, Delete, Edit, QrCodeScanner } from '@mui/icons-material';
import { toast } from 'react-toastify';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  addedDate: string;
}

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Avocado',
      category: 'Fruits',
      quantity: 3,
      expiryDate: '2024-02-15',
      addedDate: '2024-01-20'
    },
    {
      id: '2',
      name: 'Tomato',
      category: 'Vegetables',
      quantity: 5,
      expiryDate: '2024-02-10',
      addedDate: '2024-01-22'
    },
    {
      id: '3',
      name: 'Eggs',
      category: 'Dairy',
      quantity: 12,
      expiryDate: '2024-02-05',
      addedDate: '2024-01-25'
    }
  ]);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    // Demo add item
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: 'New Item',
      category: 'Other',
      quantity: 1,
      expiryDate: '2024-02-28',
      addedDate: new Date().toISOString().split('T')[0]
    };
    setInventory(prev => [...prev, newItem]);
    setOpenDialog(false);
    toast.success('Item added to inventory!');
  };

  const handleDeleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from inventory');
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'Expired', color: 'error' };
    if (diffDays <= 3) return { status: 'Expiring Soon', color: 'warning' };
    return { status: 'Fresh', color: 'success' };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          My Inventory
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Manage your kitchen items and track expiry dates
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{ flexGrow: 1, minWidth: 250 }}
          />
          <Button
            variant="outlined"
            startIcon={<QrCodeScanner />}
            sx={{ px: 3 }}
          >
            Scan Barcode
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{ px: 3 }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredInventory.map((item) => {
          const expiryStatus = getExpiryStatus(item.expiryDate);
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id} component="div">
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
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Chip 
                      label={expiryStatus.status} 
                      color={expiryStatus.color as 'error' | 'warning' | 'success'} 
                      size="small"
                    />
                  </Box>
                  
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Category: {item.category}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {filteredInventory.length === 0 && (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items found. Add some items to your inventory!
          </Typography>
        </Box>
      )}

      {/* Add Item Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            This is a demo. In a real app, you'd have a form to add items.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">
            Add Demo Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Inventory;