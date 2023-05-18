import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '../../customHooks/customHooks';
import { PixivAPI } from '../../api/api';
import { useAtom } from 'jotai';
import {
  worksAtom,
  searchWordAtom,
  searchQueryAtom,
  searchUrlAtom,
} from '../../atoms/atom';
import { Candidates, CandidatesEntity } from '../../types/type';
import BasicSelect from './search_option';
import createSearchURL from '../../utils/create_search_url';

const SearchForm = () => {
  const [inputText, setInputText] = useAtom(searchWordAtom);
  const [candidates, setCandidates] = useState<CandidatesEntity[]>([]);
  const [, setWorksData] = useAtom(worksAtom);
  const debouncedInputText = useDebounce(inputText, 1000);

  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const [searchQuery] = useAtom(searchQueryAtom);
  const [, setSearchURL] = useAtom(searchUrlAtom);

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
    const url = createSearchURL({
      searchWord: inputText,
      searchTarget: searchQuery.searchTarget,
      searchMethod: searchQuery.searchMethod,
      targetAge: searchQuery.targetAge,
    });
    console.log(url);
    setSearchURL(url);
    const worksData = await window.pixivAPI.requestWorks(url);
    if (!worksData) return;
    setWorksData(worksData);
  };

  useEffect(() => {
    console.log(debouncedInputText);
    // candidatesAPI(debouncedInputText);
  }, [debouncedInputText]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
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

      <BasicSelect />
    </div>
  );
};

export default SearchForm;
