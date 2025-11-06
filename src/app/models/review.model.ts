export interface Review {
  id: number;
  bookId: string | number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  helpful: number;
}

