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
  key: string;
  title: string;
  olid?: string;
  cover_edition_key?: string
  language?: string[]
}

export type BookDetails = {
  title: string;
  key: string;
  subjects?: string[];
  author_name: string[];
  cover_i?: number;
  covers?: string[];
  first_publish_year: number;
  description?: string
  last_modified_i?: number;
  number_of_pages?: number;
  language?: string[];
  isbn?: string[];
}