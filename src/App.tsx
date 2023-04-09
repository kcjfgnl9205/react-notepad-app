import React, { useState, useEffect, useCallback } from 'react';
import { Container, Box } from '@mui/material';

import { Header, Search, Notices } from './components';
import useLocalStorage from './hooks/useLocalStorage';
import { NoteType } from './types/index';
import { AddIcon } from './components/Icon';


//메모장 제목
const APP_TITLE_NAME = "Notepad App";

function App() {
  //노트추가 버튼
  const [ addFlg, setAddFlg ] = useState<boolean>(false);
  const onChangeAddFlg = () => setAddFlg(true);

  //검색할 내용
  const [ search, setSearch ] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch(e.target.value);

  //메모장 리스트(로컬스토리지에 저장)
  const [ notes, setNotes ] = useState<Array<NoteType>>([]);
  const [ localStorageItem, setLocalStorageItem ] = useLocalStorage("notes-data", JSON.stringify(notes));
  useEffect(() => {
    setLocalStorageItem(JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    if(localStorageItem) {
      setNotes([...JSON.parse(localStorageItem)])
    }
  }, [])

  //노트추가
  const handleAddNote = useCallback((e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    const maxId = notes.reduce((acc, el, index) => { return Math.max(acc, el.id) + 1; }, 1);
    setNotes(notes => [ ...notes, { id: maxId, note: value, date: new Date().toLocaleDateString() } ]);
  }, [notes])

  //노트수정
  const handleEditNote = useCallback((e: React.MouseEvent<HTMLButtonElement> |  React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, value: string) => {
    setNotes(notes => notes.map(el => el.id === id ? { ...el, note: value } : el));
  }, [])

  //노트삭제
  const handleDeleteNote = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setNotes(notes => notes.filter(el => el.id !== id));
  }, [])


  return (
    <Container>

      {/* 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header title={APP_TITLE_NAME} />
        <AddIcon onClick={onChangeAddFlg} />
      </Box>

      {/* 검색창 */}
      <Search search={search} setSearch={onChange} />

      {/* 메모 리스트 */}
      <Notices
        search={search}
        notes={notes}
        addFlg={addFlg}
        setAddFlg={setAddFlg}
        handleAddNote={handleAddNote}
        handleEditNote={handleEditNote}
        handleDeleteNote={handleDeleteNote}
      />

    </Container>
  );
}

export default App;
