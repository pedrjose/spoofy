// Define o tipo para o artista
interface Artist {
 id: string;
 name: string;
 url: string;
 pic_small: string;
 pic_medium: string;
}

// Define o tipo para a música
interface Song {
 id: string;
 name: string;
 url: string;
 uniques: string;
 views: string;
 rank: string;
 art: Artist; // A propriedade art é do tipo Artist
}

// Define o tipo para o período
interface Period {
 year: string;
 month: string;
}

// Define o tipo para o mês
interface Month {
 period: Period;
 all: Song[]; // A propriedade all é um array de músicas
}

// Define o tipo para o objeto de resposta
interface MusicResponse {
 success: boolean;
 data: {
   mus: {
     month: Month;
   };
 };
}

// Exemplo de uso
const exampleData: MusicResponse = {
 success: true,
 data: {
   mus: {
     month: {
       period: {
         year: "2024",
         month: "10",
       },
       all: [
         {
           id: "3ade68b8g7154e0b3",
           name: "Yummy (tradução)",
           url: "https://www.vagalume.com.br/justin-bieber/yummy-traducao.html",
           uniques: "7943",
           views: "8526",
           rank: "0.0",
           art: {
             id: "3ade68b7g840e0ea3",
             name: "Justin Bieber",
             url: "https://www.vagalume.com.br/justin-bieber/",
             pic_small: "https://s2.vagalume.com/justin-bieber/images/profile.jpg",
             pic_medium: "https://s2.vagalume.com/justin-bieber/images/justin-bieber.jpg",
           },
         },
       ],
     },
   },
 },
};
