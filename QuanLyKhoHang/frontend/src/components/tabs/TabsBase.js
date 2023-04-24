import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { v4 } from 'uuid';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ paddingTop: '10px' }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsBase({
  tabLabels = [{ label: 'Label', id: 1 }],
  tabPanels = ['Panel 1'],
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ minHeight: 'unset', height: '42px' }}
        >
          {tabLabels.map((tab) => (
            <Tab
              key={v4()}
              label={tab.label}
              {...a11yProps(tab.id)}
              sx={{
                padding: '5px',
                minHeight: 'unset',
                height: '42px',
                fontSize: '13px',
                textTransform: 'capitalize',
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabPanels.map((tabPanel, index) => (
        <TabPanel key={v4()} value={value} index={index}>
          {tabPanel}
        </TabPanel>
      ))}
    </Box>
  );
}
export default TabsBase;
