import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Check as CheckIcon, ContentCopy as CopyIcon } from '@mui/icons-material';

import { MAX_LENGTH } from '../constants/index';
import { NoteFooter, Icon } from './';
import { NoteType } from '../types/index'


type NoteProps = {
  note: NoteType;
  handleAddNote?: (e:  React.MouseEvent<HTMLButtonElement>, value: string) => void;
  handleEditNote?: (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, value: string) => void;
  handleDeleteNote?: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  addFlg?: boolean;
  setAddFlg?: React.Dispatch<React.SetStateAction<boolean>>;
}


const Note = ({ note, handleAddNote, handleEditNote, handleDeleteNote, addFlg, setAddFlg }: NoteProps) => {
  const [ data, setData ] = useState<NoteType>(note);
  const [ onEdit, setOnEdit ] = useState<boolean>(false);

  const maxLengthText = `${data?.note.trim().length}자 / ${MAX_LENGTH}자`;
  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, value: string): void => {
    onEditHandler(e, id, value);
  }
  
  //메모 수정
  const onEditHandler = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, value: string) => {
    handleEditNote?.(e, id, value);
    setOnEdit(false);
  }

  //신규 메모 등록버튼
  const onAddHandler = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    if (value.length === 0) return;

    handleAddNote?.(e, value);
    setData({ ...data, note: "" });
    setAddFlg?.(false);
  }

  //클립보드 복사
  const [ copyTooltipTitle, setCopyTooltipTitle ] = useState<string>("복사");
  const onCopyHandler =  (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(data.note);
    setCopyTooltipTitle("클립보드에 복사되었습니다.");
    setTimeout(() => setCopyTooltipTitle("복사"), 1000);
  }

  return (
    <Box
      sx={{
        backgroundColor: addFlg ? '#44FAE4' : '#FFF8DD',
        borderRadius: '10px',
        minHeight: '170px',
        border: 'none',
        padding: '8px 12px',
        '&:hover': {
          boxShadow: '0 0 11px rgba(33,33,33,.2)',
          border: 'none'
        },
      }}
    >
    <TextField
      fullWidth
      multiline
      rows={6}
      value={data?.note}
      placeholder="새로운 메모를 입력해주세요."
      inputProps={{ maxLength: MAX_LENGTH }}
      sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' }  }}
      onChange={e => setData({ ...data, note: e.target.value })}
      onFocus={e => setOnEdit(true)}
      onBlur={e => onBlur(e, data.id, data.note)}
    />
    <NoteFooter maxLengthText={addFlg || onEdit ? maxLengthText : data?.date}>
      {
        addFlg
        ? <Icon
            tooltipTitle="추가"
            icon={<AddIcon />}
            onClick={e => onAddHandler(e, data.note)}
          />
        : onEdit
        ? <Icon
            tooltipTitle="수정"
            icon={<CheckIcon />}
            onClick={e => onEditHandler(e, data.id, data.note)}
          />
        : <Box>
            <Icon
              tooltipTitle={copyTooltipTitle}
              icon={<CopyIcon />}
              onClick={e => onCopyHandler(e)}
            />
            <Icon
              tooltipTitle="삭제"
              icon={<DeleteIcon />}
              onClick={e => handleDeleteNote?.(e, data.id)}
            />
          </Box>
      }
    </NoteFooter>
    </Box>
  )
}

export default React.memo(Note);
