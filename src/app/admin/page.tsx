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
  Tooltip,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';

const EMOJIS = ['🔥', '💻', '🎨', '✨', '🤘', '🚀', '🍕', '❤️'];
const COLORS = [
  '#FF4D4D', // Red
  '#FF9F43', // Orange
  '#FECA57', // Yellow
  '#1DD1A1', // Green
  '#48DBFB', // Light Blue
  '#5F27CD', // Purple
  '#F368E0', // Pink
];

interface WallEntry {
  id: string;
  emoji: string;
  name: string;
  message: string;
  color: string;
  ip: string;
  timestamp: number;
}

interface WallStats {
  totalEntries: number;
  fileCount: number;
  uniqueIPs: number;
  avgMessageLength: number;
  rawFiles: { name: string; size: string }[];
}

export default function AdminWall() {
  const [secret, setSecret] = useState('');
  const [entries, setEntries] = useState<WallEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<WallStats | null>(null);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editColor, setEditColor] = useState('');

  const fetchAll = async () => {
    if (!secret) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/wall', {
        headers: { 'x-admin-secret': secret },
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch wall data:', error);
    }
    setLoading(false);
  };

  const deleteFullFile = async (fileName: string) => {
    if (!confirm(`Permanently delete ${fileName} and ALL its entries?`)) return;

    const res = await fetch('/api/admin/wall', {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName }),
    });

    if (res.ok) fetchAll();
  };

  const handleEditInit = (entry: WallEntry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditMessage(entry.message);
    setEditEmoji(entry.emoji);
    setEditColor(entry.color || COLORS[4]);
  };

  const handleSave = async (id: string) => {
    const res = await fetch('/api/admin/wall', {
      method: 'PATCH',
      headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        name: editName,
        message: editMessage,
        emoji: editEmoji,
        color: editColor,
      }),
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

      {stats && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              label: 'Total Messages',
              value: stats.totalEntries,
              color: '#61dafb',
            },
            {
              label: 'Files in /data',
              value: stats.fileCount,
              color: '#1DD1A1',
            },
            {
              label: 'Unique Visitors',
              value: stats.uniqueIPs,
              color: '#FF9F43',
            },
            {
              label: 'Avg. Length',
              value: `${stats.avgMessageLength} chars`,
              color: '#F368E0',
            },
          ].map((stat, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  borderLeft: `6px solid ${stat.color}`,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ textTransform: 'uppercase' }}
                >
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="900">
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Data Files on Disk
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {stats?.rawFiles?.map((file) => (
          <Grid key={file.name} size={{ xs: 12, sm: 4 }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: alpha('#f44336', 0.05),
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontFamily: 'monospace' }}
                >
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Size: {file.size} KB
                </Typography>
              </Box>
              <Tooltip title="Delete Whole File">
                <IconButton
                  color="error"
                  onClick={() => deleteFullFile(file.name)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>

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
            sx={{ px: 4, borderRadius: 2, fontWeight: 'bold', minWidth: 150 }}
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
                <TableCell>User & Style</TableCell>
                <TableCell>Message & Theme</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell sx={{ minWidth: 280, verticalAlign: 'top' }}>
                    <Stack spacing={2}>
                      {editingId === entry.id ? (
                        <Stack spacing={1.5}>
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{ mb: 0.5, display: 'block' }}
                            >
                              Choose Emoji:
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              {EMOJIS.map((e) => (
                                <Box
                                  key={e}
                                  onClick={() => setEditEmoji(e)}
                                  sx={{
                                    cursor: 'pointer',
                                    p: 0.5,
                                    borderRadius: 1,
                                    border: '2px solid',
                                    borderColor:
                                      editEmoji === e
                                        ? 'primary.main'
                                        : 'transparent',
                                    bgcolor:
                                      editEmoji === e
                                        ? alpha('#000', 0.05)
                                        : 'transparent',
                                    fontSize: '1.2rem',
                                  }}
                                >
                                  {e}
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                          <TextField
                            label="Display Name"
                            size="small"
                            fullWidth
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </Stack>
                      ) : (
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: alpha(entry.color || '#000', 0.1),
                              border: `2px solid ${entry.color || '#ccc'}`,
                              fontSize: '1.2rem',
                            }}
                          >
                            {entry.emoji}
                          </Box>
                          <Typography fontWeight="700">{entry.name}</Typography>
                        </Stack>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'monospace',
                          opacity: 0.4,
                          fontSize: '10px',
                        }}
                      >
                        ID: {entry.id}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ verticalAlign: 'top' }}>
                    {editingId === entry.id ? (
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ mb: 0.5, display: 'block' }}
                          >
                            Theme Color:
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {COLORS.map((c) => (
                              <Tooltip key={c} title={c}>
                                <Box
                                  onClick={() => setEditColor(c)}
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    bgcolor: c,
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    borderColor:
                                      editColor === c ? '#000' : 'transparent',
                                    boxShadow: editColor === c ? 2 : 0,
                                    '&:hover': { transform: 'scale(1.1)' },
                                  }}
                                />
                              </Tooltip>
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: 'pre-wrap' }}
                      >
                        {entry.message}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Chip
                      label={entry.ip}
                      size="small"
                      variant="outlined"
                      sx={{ fontFamily: 'monospace' }}
                    />
                  </TableCell>

                  <TableCell align="right" sx={{ verticalAlign: 'top' }}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      {editingId === entry.id ? (
                        <>
                          <IconButton
                            color="success"
                            onClick={() => handleSave(entry.id)}
                            size="small"
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setEditingId(null)}
                            size="small"
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => handleEditInit(entry)}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(entry.id)}
                            size="small"
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
