export const renderComicPage = (
  pageArray: string[],
  page: number,
  directory: string
) => {
  const allPages = pageArray.length;

  if (0 < page && page <= allPages) {
    const comicPage = pageArray[page - 1];
    const address = `${directory}${comicPage}`;

    return <img src={address} alt="Sarjakuvasivu" className="comicPage" />;
  }
  return <></>;
};
