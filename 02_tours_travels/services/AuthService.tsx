export const useAuthService = () => {
  const register = async (formData: User) => {
    try {

      const userResponse = await fetch(`/api/v1/users?email=${formData.email}`)
        .then(res => res.json())
        .then(data => data);

        console.log("user response ",userResponse);
        
      if (userResponse.status) {
        return {...userResponse, message: "User with this email already exists!",status: false};
      }

      // Use relative URL to avoid CORS/redirect issues between www and non-www
      const response = await fetch(`/api/v1/users`, { // https://iamandroid.in/api/v1/users
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration response:", data);

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      // Use relative URL for the same reason
      const response = await fetch(`/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const loginResponse = await response.json();

      console.log("Login response:", loginResponse);
      if (!loginResponse.status) {
        throw new Error(loginResponse.message || "Login failed");
      }

      // localStorage.setItem("token", loginResponse.token);
      // localStorage.setItem("user", JSON.stringify(loginResponse.data));

      return loginResponse.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const getCurrentUser = () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  };

  const getToken = () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("token");
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
    getToken,
  };
};