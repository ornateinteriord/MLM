import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from 'react-data-table-component';
import { DASHBOARD_CUTSOM_STYLE } from '../../../utils/DataTableColumnsProvider';

const SupportTickets = () => {
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleReplyClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsReplyDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsReplyDialogOpen(false);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    // Handle reply submission logic here
    console.log('Reply submitted:', replyText, 'for ticket:', selectedTicket);
    handleCloseDialog();
  };

  const columns = [
    {
      name: 'Ticket Date',
      selector: (row: any) => row.ticketDate,
      sortable: true,
    },
    {
      name: 'Ticket No',
      selector: (row: any) => row.ticketNo,
      sortable: true,
    },
    {
      name: 'Type of ticket',
      selector: (row: any) => row.type,
      sortable: true,
    },
    {
      name: 'Subject',
      selector: (row: any) => row.subject,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <span
          style={{
            backgroundColor: row.status === 'Pending' ? '#ffd700' : '#90EE90',
            padding: '0.5rem',
            borderRadius: '4px',
            color: '#000',
          }}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <Button
          variant="contained"
          onClick={() => handleReplyClick(row)}
          sx={{
            backgroundColor: '#04112f',
            '&:hover': { backgroundColor: '#0a1f4d' }
          }}
        >
          Reply
        </Button>
      ),
    },
  ];

  const data = [
    {
      ticketDate: '2024-03-18',
      ticketNo: '760',
      type: 'Payments related',
      subject: 'Payment Issue',
      status: 'Pending',
    },
    // Add more ticket data as needed
  ];

  return (
    <>
      <Typography variant="h4" sx={{ margin: '2rem', mt: 10 }}>
        Support Tickets
      </Typography>
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#04112f',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              List of Support Tickets
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  sx={{ minWidth: 200 }}
                />
              </div>
              <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={DASHBOARD_CUTSOM_STYLE}
                paginationPerPage={25}
                paginationRowsPerPageOptions={[25, 50, 100]}
                highlightOnHover
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isReplyDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#04112f', color: '#fff' }}>
          Reply to Ticket #{selectedTicket?.ticketNo}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Ticket Date:</strong> {selectedTicket?.ticketDate}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Type of Ticket:</strong> {selectedTicket?.type}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Subject:</strong> {selectedTicket?.subject}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Status:</strong> {selectedTicket?.status}
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Type your reply here..."
            sx={{
              mt: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#04112f',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#04112f',
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReply}
            variant="contained"
            sx={{
              backgroundColor: '#04112f',
              '&:hover': { backgroundColor: '#0a1f4d' }
            }}
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupportTickets;