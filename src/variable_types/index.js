// INavLink in JavaScript
export const INavLink = {
  imgURL: "",
  route: "",
  label: ""
};

// IUpdateUser in JavaScript
export const IUpdateUser = {
  userId: "",
  name: "",
  bio: "",
  imageId: "",
  imageUrl: "", // Could be a URL or string
  file: [] // Array of File objects
};

// INewPost in JavaScript
export const INewPost = {
  userId: "",
  caption: "",
  file: [], // Array of File objects
  location: "", // Optional property
  tags: "" // Optional property
};

// IUpdatePost in JavaScript
export const IUpdatePost = {
  postId: "",
  caption: "",
  imageId: "",
  imageUrl: "", // URL expected
  file: [], // Array of File objects
  location: "", // Optional property
  tags: "" // Optional property
};

// IUser in JavaScript
export const IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: ""
};

// INewUser in JavaScript
export const INewUser = {
  name: "",
  email: "",
  username: "",
  password: ""
};
