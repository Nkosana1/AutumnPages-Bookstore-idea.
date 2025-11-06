export interface Author {
  id: number;
  name: string;
  bio: string;
  image: string;
  books: number[];
  followers: number;
  website?: string;
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

