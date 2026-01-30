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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyIcon from '@mui/icons-material/Key';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const EMOJIS = [
  '🔥',
  '💻',
  '🎨',
  '✨',
  '🤘',
  '🚀',
  '🍕',
  '❤️',
  '💡',
  '⚡',
  '🧠',
  '👾',
];
const COLORS = [
  '#FF4D4D',
  '#FF9F43',
  '#FECA57',
  '#1DD1A1',
  '#48DBFB',
  '#5F27CD',
  '#F368E0',
];

interface WallEntry {
  id: string;
  emoji: string;
  name: string;
  message: string;
  color: string;
  ip: string;
  timestamp: number;
  fileName: string;
}

interface WallStats {
  totalEntries: number;
  fileCount: number;
  uniqueIPs: number;
  avgMessageLength: number;
  rawFiles: { name: string; size: string }[];
}

export default function AdminWall() {
  // Auth State
  const [openAuth, setOpenAuth] = useState(true);
  const [secret, setSecret] = useState('');
  const [tempSecret, setTempSecret] = useState('');
  const [authError, setAuthError] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Data & Pagination State
  const [entries, setEntries] = useState<WallEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<WallStats | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editEmoji, setEditEmoji] = useState('');
  const [editColor, setEditColor] = useState('');

  const fetchAll = async (
    targetPage: number = page,
    targetLimit: number = rowsPerPage,
    specificSecret?: string,
  ) => {
    const activeSecret = specificSecret || secret;
    if (!activeSecret) return false;

    setLoading(true);
    setAuthError(false);

    try {
      const res = await fetch(
        `/api/admin/wall?page=${targetPage + 1}&limit=${targetLimit}`,
        {
          headers: { 'x-admin-secret': activeSecret },
        },
      );

      if (res.status === 401) {
        setAuthError(true);
        setLoading(false);
        return false;
      }

      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
        setStats(data.stats);
        setTotalCount(data.pagination?.total || data.entries.length);
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Failed to fetch wall data:', error);
    }

    setLoading(false);
    return false;
  };

  const handleUnlock = async () => {
    setLoadingAuth(true);
    const success = await fetchAll(0, rowsPerPage, tempSecret);
    if (success) {
      setSecret(tempSecret);
      setOpenAuth(false);
      setPage(0);
    }
    setLoadingAuth(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchAll(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    fetchAll(0, newLimit);
  };

  const deleteFullFile = async (fileName: string) => {
    if (!confirm(`Permanently delete ${fileName} and ALL its entries?`)) return;
    const res = await fetch('/api/admin/wall', {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName }),
    });
    if (res.ok) fetchAll(0, rowsPerPage);
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
      <Dialog open={openAuth} disableEscapeKeyDown maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyIcon color="primary" /> Admin Verification
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter the administrator secret key.
          </DialogContentText>
          {authError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Invalid secret key.
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Secret Key"
            type="password"
            fullWidth
            variant="outlined"
            error={authError}
            value={tempSecret}
            onChange={(e) => {
              setTempSecret(e.target.value);
              if (authError) setAuthError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUnlock();
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleUnlock}
            variant="contained"
            fullWidth
            disabled={!tempSecret || loadingAuth}
            startIcon={
              loadingAuth && <CircularProgress size={20} color="inherit" />
            }
          >
            {loadingAuth ? 'Verifying...' : 'Access Dashboard'}
          </Button>
        </DialogActions>
      </Dialog>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <SecurityIcon color="primary" fontSize="large" />
          <Typography variant="h4" fontWeight="900">
            Wall Management
          </Typography>
        </Stack>
        {!openAuth && (
          <Button
            startIcon={<RefreshIcon />}
            variant="outlined"
            onClick={() => fetchAll()}
            disabled={loading}
          >
            Refresh
          </Button>
        )}
      </Stack>

      {stats && (
        <>
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

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Files on Disk
          </Typography>
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {stats.rawFiles.map((file) => (
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
                      {file.size} KB
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => deleteFullFile(file.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '16px 16px 0 0',
              border: '1px solid divider',
              borderBottom: 0,
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: alpha('#000', 0.05) }}>
                <TableRow>
                  <TableCell>User & Style</TableCell>
                  <TableCell>Message & Theme</TableCell>
                  <TableCell>Origin & Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  entries.map((entry) => (
                    <TableRow key={entry.id} hover>
                      <TableCell sx={{ minWidth: 280, verticalAlign: 'top' }}>
                        <Stack spacing={1}>
                          {editingId === entry.id ? (
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={0.5}
                                flexWrap="wrap"
                              >
                                {EMOJIS.map((e) => (
                                  <Box
                                    key={e}
                                    onClick={() => setEditEmoji(e)}
                                    sx={{
                                      cursor: 'pointer',
                                      fontSize: '1.2rem',
                                      p: 0.5,
                                      border: '2px solid',
                                      borderColor:
                                        editEmoji === e
                                          ? 'primary.main'
                                          : 'transparent',
                                      borderRadius: 1,
                                    }}
                                  >
                                    {e}
                                  </Box>
                                ))}
                              </Stack>
                              <TextField
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
                              <Typography fontWeight="700">
                                {entry.name}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'top' }}>
                        {editingId === entry.id ? (
                          <Stack spacing={1}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                              value={editMessage}
                              onChange={(e) => setEditMessage(e.target.value)}
                            />
                            <Stack direction="row" spacing={1}>
                              {COLORS.map((c) => (
                                <Box
                                  key={c}
                                  onClick={() => setEditColor(c)}
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    bgcolor: c,
                                    cursor: 'pointer',
                                    border:
                                      editColor === c
                                        ? '2px solid #000'
                                        : 'none',
                                  }}
                                />
                              ))}
                            </Stack>
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
                        <Stack spacing={1} alignItems="flex-start">
                          <Chip
                            label={entry.ip}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                          />
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            sx={{ color: 'text.secondary' }}
                          >
                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                            <Typography
                              variant="caption"
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              {new Date(entry.timestamp).toLocaleString()}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            sx={{ color: 'primary.main', opacity: 0.8 }}
                          >
                            <FolderOpenIcon sx={{ fontSize: 14 }} />
                            <Typography
                              variant="caption"
                              sx={{ fontFamily: 'monospace' }}
                            >
                              {entry.fileName}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="right" sx={{ verticalAlign: 'top' }}>
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
                            <IconButton onClick={() => handleEditInit(entry)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component={Paper}
            sx={{ borderRadius: '0 0 16px 16px', border: '1px solid divider' }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
}
