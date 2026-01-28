'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  Chip,
  alpha,
  Stack,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';

interface WallEntry {
  id: string;
  emoji: string;
  name: string;
  message: string;
  ip: string;
}

export default function AdminWall() {
  const [secret, setSecret] = useState('');
  const [entries, setEntries] = useState<WallEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    if (!secret) return;
    setLoading(true);
    const res = await fetch('/api/admin/wall', {
      headers: { 'x-admin-secret': secret },
    });
    if (res.ok) setEntries(await res.json());
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    const res = await fetch('/api/admin/wall', {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchAll();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <SecurityIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight="900">
          Wall Management
        </Typography>
      </Stack>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Admin Secret Key"
            type="password"
            fullWidth
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <IconButton
            onClick={fetchAll}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              borderRadius: 2,
              px: 4,
            }}
          >
            Load Entries
          </IconButton>
        </Stack>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 4, overflow: 'hidden' }}
        >
          <Table>
            <TableHead sx={{ bgcolor: alpha('#000', 0.05) }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Message
                </TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry: WallEntry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{entry.emoji}</span>
                      <Typography variant="subtitle2" fontWeight="700">
                        {entry.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: 'none', md: 'table-cell' },
                      maxWidth: 300,
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {entry.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={entry.ip} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
