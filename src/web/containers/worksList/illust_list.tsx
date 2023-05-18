import React, { useEffect } from 'react';
import './illust_list.css';
import { Box } from '@mui/material/';

import Grid from '@mui/material/Unstable_Grid2';
import { useAtom } from 'jotai';
import {
  blockTagsAtom,
  blockUsersAtom,
  viewedWorksAtom,
  worksAtom,
} from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';

export default function IllustList() {
  const [illustData] = useAtom(worksAtom);
  const [blockUsers] = useAtom(blockUsersAtom);
  const [blockTags] = useAtom(blockTagsAtom);
  const [viewedWorks] = useAtom(viewedWorksAtom);

  const hideElements = () => {
    const elements = document.querySelectorAll<HTMLLIElement>('.hidden');
    elements.forEach((element) => (element.style.display = 'none'));
  };

  useEffect(() => {
    // hideElements();
    console.log(illustData, blockUsers, blockTags);
    const viewedElements = document.querySelectorAll('.viewed');
    viewedElements.forEach((element) => {
      element.classList.add('hidden');
    });
  }, [blockUsers, blockTags, illustData]);

  return (
    <Box>
      <Grid container spacing={2}>
        {illustData.map((data) => {
          const userId = data.userId!;
          const tags = data.tags!;

          if (!(userId || tags)) return;

          const hasDuplicateElements = (
            arr1: string[],
            arr2: string[]
          ): boolean => arr1.some((element) => arr2.includes(element));

          const url = document.location.href;
          const watchWorkId = url.split('/').at(-1) ?? '';
          return (
            <div key={data.id}>
              {
                <Grid
                  className={classNames(
                    {
                      block:
                        hasDuplicateElements(tags, blockTags) ||
                        hasDuplicateElements([userId!], blockUsers),
                    },
                    {
                      hidden:
                        hasDuplicateElements(tags, blockTags) ||
                        hasDuplicateElements([userId!], blockUsers),
                    },
                    {
                      viewed: (viewedWorks[watchWorkId] ?? ['']).includes(
                        data.id
                      ),
                    }
                  )}
                  maxWidth={'fit-content'}
                >
                  <WorkCard {...data}></WorkCard>
                </Grid>
              }
            </div>
          );
        })}
      </Grid>
    </Box>
  );
}
