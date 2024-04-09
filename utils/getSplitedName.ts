const getSplitedName = (categoryName: string) => {
  return categoryName.replace(/\s+/g, "-").toLowerCase();
};

export default getSplitedName;
