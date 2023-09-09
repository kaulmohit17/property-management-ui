import { ThemeProvider, Flex, extendTheme} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: 'teal.500',
        fontWeight: 'bold',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
        <Flex justify="center" p={4} bg="teal.100" width="100%" justifyContent="space-around"
        mb="2rem">
          <Link to="/" mx={2}>
            Equipment List
          </Link>
          <Link  to="/parts" mx={2}>
            Parts
          </Link>
          <Link  to="/technicians" mx={2}>
            Technicians
          </Link>
        </Flex>
    </ThemeProvider>
  );
}

export default Dashboard;