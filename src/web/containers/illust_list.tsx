import React, { useEffect } from 'react';
import { Box } from '@mui/material/';

import Grid from '@mui/material/Unstable_Grid2';
import { useAtom } from 'jotai';
import { blockTagsAtom, blockUsersAtom, worksAtom } from '../atoms/atom';
import IllustCard from '../conponents/illust';
import { DRAWERWIDTH } from '../consts/const';

export default function IllustList() {
  const [illustData] = useAtom(worksAtom);
  const [blockUsers] = useAtom(blockUsersAtom);
  const [blockTags] = useAtom(blockTagsAtom);

  const hideElements = () => {
    const elements = document.querySelectorAll<HTMLLIElement>('.hidden');
    elements.forEach((element) => (element.style.display = 'none'));
  };

  useEffect(() => {
    // hideElements();
    console.log(illustData, blockUsers, blockTags);
  }, [blockUsers, blockTags, illustData]);

  return (
    <Box>
      <Grid container spacing={2}>
        {illustData.map((data, index) => {
          const userId = data.userId!;
          const tags = data.tags!;

          if (!(userId || tags)) return;

          const hasDuplicateElements = (
            arr1: string[],
            arr2: string[]
          ): boolean => arr1.some((element) => arr2.includes(element));
          return (
            <div key={index}>
              {
                <Grid
                  className={
                    hasDuplicateElements(tags, blockTags) ||
                    hasDuplicateElements([userId!], blockUsers)
                      ? 'hidden'
                      : ''
                  }
                  key={index}
                  maxWidth={'fit-content'}
                >
                  <IllustCard {...data}></IllustCard>
                </Grid>
              }
            </div>
          );
        })}
      </Grid>
    </Box>
  );
}
