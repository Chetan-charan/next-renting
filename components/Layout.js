import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';


const Layout = () => {

    return <AppBar style={{marginBottom:'24px', paddingBottom: 0}} position="static">
    <Toolbar variant="dense">
    <Button  variant="text" color='inherit'><Link href='/'>Home</Link></Button>
    <Button  variant="text" color='inherit'><Link href='/furniture'>Furniture</Link></Button>
    <Button  variant="text" color='inherit'><Link href='/appliances'>Appliances</Link></Button>
    <Button  variant="text" color='inherit'><Link href='/fitness'>Fitness-funzone</Link></Button>
    <Button  variant="text" color='inherit'><Link href='/laptops'>Laptops</Link></Button>
    </Toolbar>
  </AppBar>

}

export default Layout;