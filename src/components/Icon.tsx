import { IconButton, Tooltip } from '@mui/material';


type ButtonProp = {
  tooltipTitle?: string;
  onClick?: (e:  React.MouseEvent<HTMLButtonElement>) => void;
  icon?: JSX.Element;
}


const Icon = ({ tooltipTitle, onClick, icon }: ButtonProp) => (
  <Tooltip title={ tooltipTitle } placement="top" followCursor={true} describeChild={true}>
    <IconButton size="large" onClick={onClick} >
      {icon}
    </IconButton>
  </Tooltip>
)

export default Icon;
