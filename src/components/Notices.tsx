import { Grid } from '@mui/material';

import { Note } from './';
import { NoteType } from '../types/index'


type NotesProps = {
  search: string;
  addFlg: boolean;
  setAddFlg: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Array<NoteType>;
  handleAddNote: (e:  React.MouseEvent<HTMLButtonElement>, value: string) => void;
  handleEditNote: (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, value: string) => void;
  handleDeleteNote: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

const defaultNote: NoteType = { id: -1, note: "", date: new Date().toLocaleDateString() };

const Notices = ({search, addFlg, setAddFlg, notes, handleAddNote, handleEditNote, handleDeleteNote }: NotesProps) => (
  <Grid container spacing={2}>
    {
      addFlg &&
      <Grid item xs={4}>
        <Note note={defaultNote} handleAddNote={handleAddNote} addFlg={addFlg} setAddFlg={setAddFlg} />
      </Grid>
    }
    {
      notes?.filter(el => el.note.includes(search))
            .sort((a, b) => b.id - a.id)
            .map(note => <Grid item xs={4} key={note.id}>
                           <Note
                            note={note}
                            handleEditNote={handleEditNote}
                            handleDeleteNote={handleDeleteNote}
                            />
                         </Grid>
                )
    }
  </Grid>
)

export default Notices;
