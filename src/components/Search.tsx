import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';


type SearchProps = {
  search: string;
  setSearch: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}


const Search = ({ search, setSearch }: SearchProps) => (
  <TextField
    fullWidth
    size="small"
    value={search}
    placeholder="검색내용을 입력해주세요."
    onChange={ e => setSearch(e) }
    InputProps={{
      startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
    }}
    sx={{
      margin: '12px 0px',
      border: 'none',
      borderRadius: '50px',
      marginBottom: '1.5em',
      boxShadow: '0 0 11px rgba(33,33,33,.2)',
      '&:hover': {
        transform: 'scale(1.01)',
        transition: 'transform .3s'  
      },
      '& .MuiOutlinedInput-notchedOutline': { border: 'none' } 
    }}
  />
)

export default Search;
