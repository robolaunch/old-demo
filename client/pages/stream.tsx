import { NextPage } from "next";
import withAuth from "../components/auth/withAuth";
import Stream from "../components/stream/Stream";

const StreamPage: NextPage = () => {
  return (
    <>
      <Stream />
    </>
  );
};

export default withAuth(StreamPage);
