import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

import { MAX_LENGTH } from '../constants/index';
import { NoteFooter } from './';
import { AddIcon, ConfirmIcon, DeleteIcon } from './Icon';
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
        ? <AddIcon onClick={e => onAddHandler(e, data.note)} />
        : onEdit
        ? <ConfirmIcon onClick={e => onEditHandler(e, data.id, data.note)} />
        : <DeleteIcon onClick={e => handleDeleteNote?.(e, data.id)} />
      }
    </NoteFooter>
    </Box>
  )
}

export default React.memo(Note);
