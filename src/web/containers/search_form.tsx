import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '../customHooks/customHooks';
import { PixivAPI } from '../api/api';
import { useAtom } from 'jotai';
import { worksAtom, searchWordAtom } from '../atoms/atom';
import { Candidates, CandidatesEntity } from '../types/type';

const SearchForm = () => {
  const [inputText, setInputText] = useState('');
  const [candidates, setCandidates] = useState<CandidatesEntity[]>([]);
  const [, setWorksData] = useAtom(worksAtom);
  const debouncedInputText = useDebounce(inputText, 1000);

  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const [, setSearchWord] = useAtom(searchWordAtom);

  const candidatesAPI = async (keyword: string) => {
    if (!keyword) return;
    const response = await fetch(
      `https://www.pixiv.net/rpc/cps.php?keyword=${keyword}&lang=ja`
    );
    if (response.ok) {
      try {
        const rawJson: Candidates = await response.json();
        setCandidates(rawJson.candidates ?? []);
        console.log(rawJson);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(response.status);
    }
  };

  const handleChange = async (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    return setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(inputText);
    setSearchWord(inputText);
    const worksData = await window.pixivAPI.requestWorks(inputText);
    if (!worksData) return;
    setWorksData(worksData);
  };

  useEffect(() => {
    console.log(debouncedInputText);
    // candidatesAPI(debouncedInputText);
  }, [debouncedInputText]);
  return (
    <Stack
      direction={'row'}
      margin={'50px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <TextField
        variant='standard'
        // label='Multiple values'
        placeholder='入力してください'
        onChange={handleChange}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        onKeyDown={(event) => {
          if (composing) return;
          if (event.code !== 'Enter') return;
          handleSubmit();
        }}
      />
      <Button onClick={handleSubmit}>検索!</Button>
    </Stack>
  );
};

export default SearchForm;
