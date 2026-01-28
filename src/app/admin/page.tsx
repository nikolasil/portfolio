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
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
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

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');

  const fetchAll = async () => {
    if (!secret) return;
    setLoading(true);
    const res = await fetch('/api/admin/wall', {
      headers: { 'x-admin-secret': secret },
    });
    if (res.ok) setEntries(await res.json());
    setLoading(false);
  };

  const handleEditInit = (entry: WallEntry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditMessage(entry.message);
  };

  const handleSave = async (id: string) => {
    const res = await fetch('/api/admin/wall', {
      method: 'PATCH',
      headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: editName, message: editMessage }),
    });
    if (res.ok) {
      setEditingId(null);
      fetchAll();
    }
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
          <Button
            variant="contained"
            onClick={fetchAll}
            sx={{ px: 4, borderRadius: 2, fontWeight: 'bold' }}
          >
            Load Entries
          </Button>
        </Stack>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 4, border: '1px solid divider' }}
        >
          <Table>
            <TableHead sx={{ bgcolor: alpha('#000', 0.05) }}>
              <TableRow>
                <TableCell>User / ID</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Meta</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell sx={{ minWidth: 200 }}>
                    <Stack spacing={1}>
                      {editingId === entry.id ? (
                        <TextField
                          size="small"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <span>{entry.emoji}</span>
                          <Typography fontWeight="700">{entry.name}</Typography>
                        </Stack>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ fontFamily: 'monospace', opacity: 0.5 }}
                      >
                        {entry.id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {editingId === entry.id ? (
                      <TextField
                        fullWidth
                        multiline
                        size="small"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                      />
                    ) : (
                      <Typography variant="body2">{entry.message}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={entry.ip} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      {editingId === entry.id ? (
                        <>
                          <IconButton
                            color="success"
                            onClick={() => handleSave(entry.id)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={() => setEditingId(null)}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleEditInit(entry)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Stack>
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
