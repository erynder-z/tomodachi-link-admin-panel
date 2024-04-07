import { ImageType } from './ImageType';
import { CoverType } from './coverType';
import { RetrievedPollDataType } from './pollTypes';
import { PostType } from './postTypes';

export type CurrentUser = {
  _id: string;
  username: string;
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  about?: string;
  userpic: {
    data: unknown;
    contentType: string;
  };
  cover: CoverType;
  email: string;
  password: string;
  friends: UserType[];
  posts: PostType[];
  polls: RetrievedPollDataType[];
  joined: Date;
  lastSeen: Date;
  pendingFriendRequests: UserType[];
  accountType: 'regularUser' | 'guest' | 'fake';
  provider: {
    name: 'tomodachi' | 'github' | 'google' | 'discord';
    profileId: string;
  };

  createdAt: Date;
  updatedAt: Date;
};

export type MinimalUserTypes = {
  _id: string;
  firstName: string;
  lastName: string;
  about?: string;
  userpic: ImageType;
};
