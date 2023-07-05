export const getAllPhotosService = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/photos`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getSinglePhotoService = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const searchPhotosService = async (searchTerm) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos?search=${searchTerm}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const registerUserService = async ({ data }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user`, {
    method: "POST",
    body: data,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const logInUserService = async ({ email, password }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserDataService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deleteUserService = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const likePhotoService = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
};

export const commentPhotoService = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}/comment`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
};

export const commentPhotoServices = async (token, id, comment) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}/comment`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deleteCommentServices = async ({ token, id, idComment }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}/uncomment/${idComment}`,
    {
      method: "DELETE",

      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const sendPhotoService = async ({ data, token }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/photos`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
};

export const deletePhotoService = async ({ id, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const editUserServices = async ({ token, data }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user`, {
    method: "PATCH",
    body: data,

    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
};

export const recoverUserServices = async ({ email }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/recover-password`,
    {
      method: "POST",
      body: JSON.stringify({ email }),

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export const resetUserServices = async ({ recoverCode, newPassword }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/user/reset-password`,
    {
      method: "POST",
      body: JSON.stringify({ recoverCode, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.message;
};

export const editPostService = async ({ photoID, data, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/photos/${photoID}`,
    {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
};
