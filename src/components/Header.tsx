import { Typography } from '@mui/material';


type HeaderProps = {
  title?: string;
}


const Header = ({title}: HeaderProps) => (
  <Typography variant="h4">
    { title ?? "Notepad App" }
  </Typography>
)

export default Header;
