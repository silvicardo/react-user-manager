export type AppUser = {
  name: string;
  createdAt: number;
  updatedAt: number;
  id: number;
};

export type Friendship = {
  ownerId: Pick<AppUser, "id">;
  userId: Pick<AppUser, "id">;
  createdAt: number;
};
