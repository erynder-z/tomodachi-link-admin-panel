import { ImageType } from './ImageType';
import { FriendDataType } from './friendTypes';

export type OtherUserPageDataTypes = {
  _id: string;
  firstName: string;
  lastName: string;
  userpic: ImageType;
  cover?: string;
  joined: Date;
  lastSeen: Date;
  friends: FriendDataType[];
  mutualFriends: number;
  posts: string[];
};

export type MinimalUserTypes = {
  _id: string;
  firstName: string;
  lastName: string;
  userpic: ImageType;
};
