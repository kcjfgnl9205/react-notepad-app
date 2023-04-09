import { Box, Typography } from '@mui/material';


type NoteFooterProp = {
  maxLengthText: string;
  children: JSX.Element;
}


//글자수, 날짜, 등록, 수정, 삭제 아이콘등을 표시
const NoteFooter = ({ maxLengthText, children }: NoteFooterProp) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}
  >
    <Typography variant="subtitle2">{maxLengthText}</Typography>
    <Box>{children}</Box>
  </Box>
)

export default NoteFooter;
