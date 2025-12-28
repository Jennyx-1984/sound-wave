export const checkEmailExists = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/accounts?email=${email}`);
    const data = await res.json();
    return data.length > 0;
  } catch (error) {
    return false;
  }
};
