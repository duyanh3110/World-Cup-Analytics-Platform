import { useState } from 'react';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TournamentCard } from '@/features/tournaments/components/TournamentCard';
import { useTournaments } from '@/features/tournaments/hooks/useTournaments';
import type { GetTournamentsParams } from '@/features/tournaments/types';

type SortField = NonNullable<GetTournamentsParams['sortBy']>;
type SortOrder = NonNullable<GetTournamentsParams['sortOrder']>;

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'year', label: 'Year' },
  { value: 'tournamentName', label: 'Tournament name' },
  { value: 'hostCountry', label: 'Host country' },
];
const pageSize = 6;

export function TournamentsPage() {
  // API pages start at 0; MUI Pagination starts at 1.
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortAnchor, setSortAnchor] = useState<HTMLElement | null>(null);
  const {
    data: tournamentsPage,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useTournaments({
    page,
    pageSize,
    sortBy,
    sortOrder,
  });
  const sortLabel = sortOptions.find((option) => option.value === sortBy)?.label;

  function handleSort(field: SortField, order: SortOrder) {
    setSortBy(field);
    setSortOrder(order);
    setPage(0);
    setSortAnchor(null);
  }

  return (
    <Stack component="main" spacing={4}>
      <Box component="header">
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Discover football history
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          sx={{ mt: 1, mb: 1, fontSize: { xs: '2rem', md: '3.25rem' } }}
        >
          TOURNAMENT EXPLORER
        </Typography>
        <Typography color="text.secondary">
          Browse World Cup editions, hosts and historic results.
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
        <TextField
          label="Search tournaments or years"
          placeholder="Search tournaments or years..."
          fullWidth
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
        />
        <Button
          id="tournament-sort-button"
          variant="outlined"
          startIcon={<SortRoundedIcon />}
          aria-haspopup="menu"
          aria-controls={sortAnchor ? 'tournament-sort-menu' : undefined}
          aria-expanded={Boolean(sortAnchor)}
          onClick={(event) => setSortAnchor(event.currentTarget)}
          sx={{ minHeight: 56, whiteSpace: 'nowrap', bgcolor: 'background.paper' }}
        >
          Sort: {sortLabel} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
        </Button>
        <Menu
          id="tournament-sort-menu"
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={() => setSortAnchor(null)}
          slotProps={{ list: { 'aria-labelledby': 'tournament-sort-button' } }}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={sortBy === option.value}
              onClick={() => handleSort(option.value, sortOrder)}
            >
              {option.label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem selected={sortOrder === 'asc'} onClick={() => handleSort(sortBy, 'asc')}>
            Ascending
          </MenuItem>
          <MenuItem selected={sortOrder === 'desc'} onClick={() => handleSort(sortBy, 'desc')}>
            Descending
          </MenuItem>
        </Menu>
      </Stack>

      <Box component="section" aria-labelledby="editions-heading" aria-busy={isFetching}>
        <Typography
          id="editions-heading"
          component="h2"
          variant="subtitle2"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          WORLD CUP EDITIONS
        </Typography>

        {isPending ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Loading tournaments" />
          </Box>
        ) : isError ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" disabled={isFetching} onClick={() => void refetch()}>
                Retry
              </Button>
            }
          >
            Unable to load tournaments. Please try again.
          </Alert>
        ) : tournamentsPage.data.length === 0 ? (
          <Alert severity="info">
            {page === 0 ? 'No tournaments available.' : 'No tournaments on this page.'}
          </Alert>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              gap: 3,
            }}
          >
            {tournamentsPage.data.map((tournament, index) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                alternate={index % 2 === 1}
              />
            ))}
          </Box>
        )}
      </Box>

      {!isPending && !isError && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Typography variant="body2" color="text.secondary" role="status">
            {tournamentsPage.data.length > 0
              ? `Showing ${tournamentsPage.page * tournamentsPage.size + 1}–${tournamentsPage.page * tournamentsPage.size + tournamentsPage.data.length} of ${tournamentsPage.totalCounts} tournaments`
              : `Showing 0 of ${tournamentsPage.totalCounts} tournaments`}
          </Typography>
          {tournamentsPage.totalPages > 0 && (
            <Pagination
              aria-label="Tournament pages"
              count={tournamentsPage.totalPages}
              page={page + 1}
              onChange={(_, value) => setPage(value - 1)}
              color="primary"
              shape="rounded"
              size="small"
              disabled={isFetching}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
