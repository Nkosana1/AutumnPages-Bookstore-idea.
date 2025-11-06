export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  readingLists: ReadingList[];
  followedAuthors: number[];
  readingChallenge?: ReadingChallenge;
}

export interface ReadingList {
  id: number;
  name: string;
  description?: string;
  bookIds: number[];
  isPublic: boolean;
}

export interface ReadingChallenge {
  year: number;
  target: number;
  completed: number;
  books: number[];
}

