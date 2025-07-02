import React from "react";
import { useSelector } from "react-redux";

function RecommendJob() {
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      hello
      {user._id}
      {user.profile?.resume}
    </div>
  );
}

export default RecommendJob;
