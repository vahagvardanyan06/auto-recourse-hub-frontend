import MobileDetect from "mobile-detect";
import { GetServerSidePropsContext } from "next";

const getIsSsrMobile = (context: GetServerSidePropsContext) => {
  const md = new MobileDetect(context.req.headers["user-agent"] as string);

  return Boolean(md.mobile());
};

export default getIsSsrMobile;
