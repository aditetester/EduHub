// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, IconButton,
  TableContainer, TablePagination, TextField, InputAdornment, Box, styled,
  Fade, Tooltip, useTheme, Typography, Chip
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';
import { Resource } from './types';
import { ResourceDetails } from './ResourceDetails';
import { api } from '../../services/api';
import { SubscriptionType } from './ResourceDetails';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DownloadIcon from '@mui/icons-material/Download';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  marginTop: theme.spacing(3),
  '& .MuiTableRow-root': {
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    }
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  '&.header': {
    backgroundColor: '#1A237E',
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.95rem',
  },
}));

const LockedOverlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  pointerEvents: 'none',
}));

const PremiumChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
  color: theme.palette.common.white,
  fontWeight: 600,
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white,
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(3),
  '& .MuiTextField-root': {
    transition: 'transform 0.3s ease',
    '&:focus-within': {
      transform: 'scale(1.01)',
    }
  }
}));

interface ResourceTableProps {
  resources: Resource[];
  onResourceClick: (resource: Resource) => void;
  hasSubscription: boolean;
}
 
export const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  onResourceClick,
  hasSubscription
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = resources?.filter(resource =>
    resource?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResourceClick = (resource: Resource) => {
    console.log('Selected resource:', resource);
    if (onResourceClick) {
      onResourceClick(resource);
    }
  };

  const handleSubscribe = async (type: SubscriptionType) => {
    try {
      // Implement your subscription logic here
      console.log(`Subscribing to ${type}`);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <AnimatePresence>
      <SearchWrapper>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              backgroundColor: 'background.paper',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }
            }
          }}
        />
      </SearchWrapper>

      <Paper 
        elevation={0} 
        sx={{ 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className="header">Thumbnail</StyledTableCell>
                <StyledTableCell className="header">Name</StyledTableCell>
                <StyledTableCell className="header">Details</StyledTableCell>
                <StyledTableCell className="header">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResources
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((resource) => (
                  <TableRow 
                    key={resource._id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <StyledTableCell>
                      <Box sx={{ position: 'relative' }}>
                        <motion.img
                          src={resource.thumbnailUrl || '/placeholder.png'}
                          alt={resource.name}
                          style={{ 
                            width: '60px', 
                            height: '60px', 
                            objectFit: 'cover',
                            borderRadius: '12px',
                          }}
                          whileHover={{ scale: 1.05 }}
                        />
                        {resource.isLocked && !hasSubscription && (
                          <LockedOverlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ opacity: 0.9 }}
                          >
                            <PremiumChip
                              icon={<LockIcon />}
                              label="Premium"
                              size="small"
                            />
                          </LockedOverlay>
                        )}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {resource.name}
                      </Typography>
                      {resource.description && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            mt: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {resource.description}
                        </Typography>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={resource.type === 'PDF' ? 
                          `Size: ${resource.size}` : 
                          `Duration: ${resource.duration}`
                        }
                        size="small"
                        sx={{ 
                          backgroundColor: theme => 
                            resource.type === 'PDF' ? 
                              '#4ECDC4' : 
                              '#4ECDC4',
                          color: 'white',
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {resource.isLocked && !hasSubscription ? (
                        <Button
                          variant="contained"
                          startIcon={<LockIcon />}
                          onClick={() => handleResourceClick(resource)}
                          sx={{
                            background: 'linear-gradient(45deg, #00CED1 30%, #B39DDB 90%)',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 3,
                            boxShadow: '0 3px 12px rgba(33,150,243,0.3)',
                            '&:hover': {
                              boxShadow: '0 4px 16px rgba(33,150,243,0.4)',
                              transform: 'translateY(-1px)',
                            }
                          }}
                        >
                          Unlock Premium
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleResourceClick(resource)}
                          sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            boxShadow: 'none',
                            backgroundColor: '#00CED1',
                            '&:hover': {
                              backgroundColor: '#00B0B9',
                              transform: 'translateY(-1px)',
                            }
                          }}
                        >
                          View Now
                        </Button>
                      )}
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredResources.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          />
        </StyledTableContainer>
      </Paper>

      {selectedResource && (
        <ResourceDetails
          open={showDetails}
          onClose={() => {
            setShowDetails(false);
            setSelectedResource(null);
          }}
          resource={selectedResource}
          onSubscribe={handleSubscribe}
        />
      )}
    </AnimatePresence>
  );
}; 