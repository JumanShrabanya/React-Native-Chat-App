const getUsers = async () => {
  try {
    const response = await fetch(`http://192.168.153.21:3000/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users.");
    }

    return data.users;
  } catch (error) {
    console.error("Error in getUsers service:", error);
    return [];
  }
};

export default getUsers;
