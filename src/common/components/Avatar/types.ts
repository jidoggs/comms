export type AvatarData = {
  id: number;
  image_url?: string;
  last_name?: string;
  first_name?: string;
};

export type AvatarGroupProps = {
  maxCount: number;
  avatarData: AvatarData[];
};