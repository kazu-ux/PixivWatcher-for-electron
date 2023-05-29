import SaveButton from '../conponents/save_button';
import SearchForm from '../containers/search_form/search_form';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { updateWorksAtom } from '../atoms/atom';
import WorkList from '../containers/worksList/work_list';

export default function Home() {
  const [, setWorksData] = useAtom(updateWorksAtom);

  useEffect(() => {
    setWorksData([]);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SearchForm></SearchForm>
      <SaveButton></SaveButton>
      <WorkList></WorkList>
    </div>
  );
}
