import SaveButton from '../conponents/save_button';
import SearchForm from '../containers/search_form/search_form';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { worksAtom } from '../atoms/atom';
import WorkList from '../containers/worksList/work_list';

export default function Home() {
  const [worksData, setWorksData] = useAtom(worksAtom);

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
      {worksData.length ? <WorkList></WorkList> : <></>}
    </div>
  );
}
