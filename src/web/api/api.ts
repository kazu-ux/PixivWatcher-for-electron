import { WorksData } from '../types/type';

interface NestedObject {
  [key: string]: any;
}

function getPropertiesWithKey(obj: NestedObject, key: string): WorksData {
  let result: any[] = [];

  for (let prop in obj) {
    if (prop === key) {
      result.push(obj[prop]);
    } else if (typeof obj[prop] === 'object') {
      result = result.concat(getPropertiesWithKey(obj[prop], key));
    }
  }

  return result.flat();
}

const updateWatchWorks = async (key: string, url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    try {
      const rawJson: WorksData = await response.json();

      const worksDataJsonArray = getPropertiesWithKey(rawJson, 'data');
      console.log(worksDataJsonArray);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(response.status);
  }
};

const fetchWorks = async (keyword: string) => {
  const url = `https://www.pixiv.net/ajax/search/illustrations/${keyword}?word=${keyword}&order=date_d&mode=all&p=1&s_mode=s_tag&type=illust_and_ugoira&lang=ja`;
  const response = await fetch(url);
  if (response.ok) {
    try {
      const rawJson: WorksData = await response.json();

      const worksDataJsonArray = getPropertiesWithKey(rawJson, 'data');

      // 広告を除外
      const newArray = worksDataJsonArray.filter((workData) => workData.id);
      return newArray;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(response.status);
  }
};

export const PixivAPI = {
  fetchWorks,
  updateWatchWorks,
};
