export type SearchProp ={
  OnSearch: (query: string) => void;
  initialValue?: string;
};

export type BookProps = {
  author_key: string[];
  author_name: string[];
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
  title: string;
  olid?: string;
  key?: string
  cover_edition_key?: string
  language?: string[]
}

// export type BookDetails = {

// }