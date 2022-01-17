import Item from '../components/Item';
import { useSelector,useDispatch } from 'react-redux';
import {updateOrderAmount} from '../actions';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import itemStyles from '../styles/items.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Appliances({data}){

    const dispatch = useDispatch();
    const router = useRouter();
    const count = useSelector(state => state.orderCountReducer);

    const items = useSelector(state => state.itemUpdateReducer);
    const fetcher = async (url) => {
        const res = await fetch(url);
        const data1 = await res.json();
        return data1;
    }
    const {data:appliances,error} = useSWR('https://equipment-renting.herokuapp.com/appliances', fetcher,{initialData: data,revalidateOnMount: true});

    return <>
    <Button onClick={() =>{
       
       dispatch(updateOrderAmount(items.map(({price}) => price).reduce((price,sum) => price + sum,0)))
       router.push('/checkout');
      
     } } style={{marginLeft: '88%',marginBottom: '10px',marginTop: '15px', color: 'green'}}  variant="text">checkout
     <Badge  badgeContent={count} color="secondary">
     <ShoppingCartOutlinedIcon             
  fontSize="large" />
   </Badge>
   </Button>
   <div className={itemStyles.itemList}>
    {appliances ? appliances.map((item) => <Item key={item._id}  name={item.name} pic={item.picUrl} price={item.price} />) : <p>Laoding..</p>}
    </div>
    </>

}

export const getStaticProps = async () => {

    const res = await fetch(`https://equipment-renting.herokuapp.com/appliances`);
    const data = await res.json();
    return {
        props: {
            data,
        }
    }

}
