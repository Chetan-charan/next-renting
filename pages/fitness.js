import Item from '../components/Item';
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import {updateOrderAmount} from '../actions';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import itemStyles from '../styles/items.module.css';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite'

export default function Fitness({data}){

    const dispatch = useDispatch();
    const router = useRouter();
    const count = useSelector(state => state.orderCountReducer);
    const items = useSelector(state => state.itemUpdateReducer);

    const fetcher = async (url) => {
        const res = await fetch(url);
        const data1 = await res.json();
        return data1;
        }
    
    const getKey = (pageIndex, previousPageData) => {    
        return `https://equipment-renting.herokuapp.com/funzone/${pageIndex}` 
    }

    const { data:funzone, size, setSize } = useSWRInfinite(getKey, fetcher,{initialData: data, revalidateOnMount: true});
    const [arr,setArr] = useState(null);

    useEffect(() => {
        if(funzone && funzone.length){
            setArr(funzone.flat()); 
        }
    },[funzone]);

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
       {arr ? arr.map((item) => <Item key={item._id}  name={item.name} pic={item.picUrl} price={item.price} />): <p>Loading...</p>}
    </div>
    {arr && <button style={{marginBottom: '30px', marginLeft: '700px'}} onClick={() => setSize(size + 1)}>Load More</button>}
    </>

}

Fitness.getInitialProps = async () => {

    const res = await fetch(`https://equipment-renting.herokuapp.com/funzone/0`);
    const data = await res.json();
    return {
        props: {
            data,
        }
    }

}


