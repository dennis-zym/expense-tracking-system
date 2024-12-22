export const useGetUserInfo = () => {
  const { userID, isAuth, email } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { userID, isAuth, email };
};
