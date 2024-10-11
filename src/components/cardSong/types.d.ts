interface Artist {
  id: string;
  name: string;
  url: string;
  pic_small: string;
  pic_medium: string;
}

export interface Music {
  id: string;
  name: string;
  url: string;
  uniques: string;
  views: string;
  rank: string;
  art: Artist;
}

interface Period {
  year: string;
  month: string;
}

interface Month {
  period: Period;
  all: Music[];
}

interface MusData {
  month: Month;
}

export interface IMusicData {
  success: boolean;
  data: {
    mus: MusData;
  };
}
