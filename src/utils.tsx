const parseAndValidateProgress = (
  progressString: string
): { comic: string; key: string }[] => {
  try {
    const parsed = JSON.parse(progressString);

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.comic === "string" &&
          typeof item.key === "string"
      )
    ) {
      return parsed as { comic: string; key: string }[];
    }
  } catch (error) {
    console.error("Invalid JSON format:", error);
  }

  return []; // Palautetaan tyhjä progress, jos validointi epäonnistuu
};

export default {
  parseAndValidateProgress,
};
