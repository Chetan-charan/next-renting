import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ListItemEach({name,pic,price}){

    return <ListItem alignItems="flex-start">
     
    <ListItemAvatar>
      <Avatar alt={name} src={pic}/>
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={
        <>
          
        <span style={{marginLeft: '223px'}}>₹{price}</span>  
        </>
      }
    />
    </ListItem>
    
    
    }