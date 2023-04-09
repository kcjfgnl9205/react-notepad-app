import { IconButton } from '@mui/material';
import { Add as MuiAddIcon, Delete as MuiDeleteIcon, Check as CheckIcon } from '@mui/icons-material';


type ButtonProp = {
  onClick?: (e:  React.MouseEvent<HTMLButtonElement>) => void;
}

//추가아이콘
export const AddIcon = ({ onClick }: ButtonProp) => (
  <IconButton size="large" onClick={onClick} >
    <MuiAddIcon />
  </IconButton>
)

//삭제아이콘
export const DeleteIcon = ({ onClick }: ButtonProp) => (
  <IconButton size="large" onClick={onClick} >
    <MuiDeleteIcon />
  </IconButton>
)

//확인아이콘
export const ConfirmIcon = ({ onClick }: ButtonProp) => (
  <IconButton size="large" onClick={onClick} >
    <CheckIcon />
  </IconButton>
)
