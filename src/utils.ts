const parseAndValidateProgress = (
  progressString: string | null
): { comic: string; key: string }[] => {
  if (progressString) {
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
  }
  return [];
};

export default {
  parseAndValidateProgress,
};
