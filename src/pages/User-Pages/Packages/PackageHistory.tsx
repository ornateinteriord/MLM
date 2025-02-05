import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from 'react-data-table-component';
import { useMediaQuery } from '@mui/material';
import { DASHBOARD_CUTSOM_STYLE, getPackageHistoryColumns } from '../../../utils/DataTableColumnsProvider';

const PackageHistory = () => {
  const isMobile = useMediaQuery('(max-width:600px)');


  // Sample data - replace with actual data
  const packages = [
    {
      id: '1',
      name: 'Basic Package',
      status: 'Active',
      date: '2024-01-15',
      amount: '$99'
    },
    // Add more package data as needed
  ];

  return (
    <Card sx={{ 
      margin: isMobile ? '1rem' : '2rem',
      backgroundColor: '#fff', 
      mt: 10 
    }}>
      <CardContent sx={{ padding: isMobile ? '12px' : '24px' }}>
        <Accordion 
          defaultExpanded
          sx={{
            boxShadow: 'none',
            '&.MuiAccordion-root': {
              backgroundColor: '#fff'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#04112f',
              color: '#fff',
              '& .MuiSvgIcon-root': { color: '#fff' },
              minHeight: isMobile ? '48px' : '64px',
            }}
          >
            Package History
          </AccordionSummary>
          <AccordionDetails>
            <DataTable
              columns={getPackageHistoryColumns()}
              data={packages}
              pagination
              customStyles={DASHBOARD_CUTSOM_STYLE}
              paginationPerPage={isMobile ? 10 : 25}
              paginationRowsPerPageOptions={isMobile ? [10, 20, 50] : [25, 50, 100]}
              highlightOnHover
              responsive
              subHeader
              subHeaderComponent={
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: isMobile ? '0.25rem' : '0.5rem' }}>
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                  />
                </div>
              }
            />
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PackageHistory;
