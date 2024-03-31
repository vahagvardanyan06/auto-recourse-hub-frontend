export const getServerSideProps = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
