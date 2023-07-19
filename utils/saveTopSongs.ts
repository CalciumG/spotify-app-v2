export const saveTopSongs = async () => {
  try {
    const response = await fetch("/api/saveTopSongs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("An error occurred while saving top songs: ", error);
  }
};
