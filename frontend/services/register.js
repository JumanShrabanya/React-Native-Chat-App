const registerUser = async ({ name, email, password }) => {
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return { error: "All fields are required", user: null };
  }

  try {
    const response = await fetch(
      "http://192.168.153.21:3000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { user: data.user, error: null };
    } else {
      return {
        user: null,
        error:
          data.message || `Registration failed with status ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error during registration:", error);

    return {
      user: null,
      error: error.message || "Failed to connect to the server",
    };
  }
};

export default registerUser;
