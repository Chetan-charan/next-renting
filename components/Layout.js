import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';


const Layout = () => {

    const router = useRouter();

    return <AppBar style={{marginBottom:'24px', paddingBottom: 0}} position="static">
    <Toolbar variant="dense">
    <Button onClick={() => {router.push('/')}} variant="text" color='inherit'>Home</Button>
    <Button onClick={() => {router.push('/furniture')}} variant="text" color='inherit'>Furniture</Button>
    <Button onClick={() => {router.push('/appliances')}} variant="text" color='inherit'>Appliances</Button>
    <Button onClick={() => {router.push('/fitness')}} variant="text" color='inherit'>Fitness-funzone</Button>
    <Button onClick={() => {router.push('/laptops')}}  variant="text" color='inherit'>Laptops</Button>
    </Toolbar>
  </AppBar>

}

export default Layout;