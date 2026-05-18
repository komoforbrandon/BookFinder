export type SearchProp ={
  OnSearch: (query: string) => void;
  initialValue?: string;
};

export type BookProps = {
  author_key: string[];
  author_name: string[];
  cover_i?: number;
  edition_count: number;
  first_publish_year?: string;
  key: string;
  title: string;
  olid?: string;
  cover_edition_key?: string
  language?: string[]
  covers?: string[];
}

export type BookCardProps = {
  book: BookProps;
  isFavorite?: boolean;
  onToggleFavorite?: (book: BookProps) => void;
}

export type BookDetails = {
  title: string;
  key: string;
  subjects?: string[];
  author_name: string[];
  cover_i?: string;
  covers?: string[];
  first_publish_date: string;
  description?: string | { value: string };
  last_modified_i?: number;
  number_of_pages?: number;
  language?: string[];
  authors?: { author: { key: string } }[];
  number_of_pages_median?: number;
  publishers?: string[];
  isbn?: string[];
}

export type AuthorDetails = {
  personal_name: string | string[];
  birth_date?: string;
  death_date?: string;
  bio?: string | { value: string };
  top_work?: string;
  work_count?: number;
  name?: string;
}

export type EditionDetails = {
  title: string;
  key: string;
  number_of_pages?: number;
  publish_date?: string;
  publishers?: string[];
  isbn_10?: string[];
  isbn_13?: string[];
}