interface IArtist {
  id: string;
  name: string;
  url: string;
}

interface ITranslation {
  id: string;
  lang: number;
  url: string;
  text: string;
}

interface IMusic {
  id: string;
  name: string;
  url: string;
  lang: number;
  text: string;
  translate?: ITranslation[];
}

export interface ISearchDataType {
  type: string;
  art: IArtist;
  mus: IMusic[];
  badwords: boolean;
}

// Exemplo de uso:
const response: ISearchDataType = {
  type: "exact",
  art: {
    id: "3ade68b3gce86eda3",
    name: "The Beatles",
    url: "https://www.vagalume.com.br/the-beatles/",
  },
  mus: [
    {
      id: "3ade68b4g6596eda3",
      name: "Hey Jude",
      url: "https://www.vagalume.com.br/the-beatles/hey-jude.html",
      lang: 2,
      text: "Hey, Jude, don't make it bad\nTake a sad song and make it better...",
      translate: [
        {
          id: "3ade68b7gecfd3ea3",
          lang: 1,
          url: "https://www.vagalume.com.br/the-beatles/hey-jude-traducao.html",
          text: "[Ei Jude] \n\nEi, Jude, não piore as coisas...",
        },
      ],
    },
  ],
  badwords: false,
};
