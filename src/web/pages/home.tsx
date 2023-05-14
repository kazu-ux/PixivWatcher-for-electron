import { Stack } from '@mui/material';
import SaveButton from '../conponents/save_button';
import { DRAWERWIDTH } from '../consts/const';
import IllustList from '../containers/illust_list';
import SearchForm from '../containers/search_form/search_form';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { worksAtom } from '../atoms/atom';

export default function Home() {
  const [worksData, setWorksData] = useAtom(worksAtom);

  useEffect(() => {
    setWorksData([]);
    console.log('home画面');
  }, []);
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <SearchForm></SearchForm>
      <SaveButton></SaveButton>
      <IllustList></IllustList>
    </Stack>
  );
}
