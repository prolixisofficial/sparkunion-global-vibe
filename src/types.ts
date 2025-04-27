
export interface Profile {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  likes_count: number;
  profile?: Profile;
  tags?: Tag[];
}

export interface Moment {
  id: string;
  user_id: string;
  image_url: string;
  created_at: string;
  expires_at: string;
  profile?: Profile;
}

export interface Glime {
  id: string;
  user_id: string;
  video_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  created_at: string;
  likes_count: number;
  profile?: Profile;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string | null;
  glime_id: string | null;
  created_at: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}
