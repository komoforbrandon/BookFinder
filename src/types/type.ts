export type SearchProp ={
  OnSearch: (query: string) => void;
  initialValue?: string;
};

export type BookDetails = {
  title: string;
  authors: { name: string }[];
  cover: string;
  publish_date: string;
  description: string;
}