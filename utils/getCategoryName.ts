const getCategoryName = (categoryName: string) => {
  return categoryName.replace(/\s+/g, "-").toLowerCase();
};

export default getCategoryName;
