export const fileInputToLines = async (path: string) => {
  const file = Bun.file(path);
  return (await file.text()).split("\n");
};
