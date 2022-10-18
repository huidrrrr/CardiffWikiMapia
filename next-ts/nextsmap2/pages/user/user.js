import React from "react";
import { getAllPatchs } from "../../components/helper/apiUtil";
import { ReactSession } from "react-client-session";
import PatchTimeline from "../../components/patchTimeline/patchTimeline";
export default function User(props) {
  const { patchs } = props;
  console.log(patchs);
  return (
    <div>
      <div>
        <div>News</div>
      </div>
      <PatchTimeline patchs={patchs} />
    </div>
  );
}
export async function getStaticProps() {
  const response = await getAllPatchs();
  return {
    props: {
      patchs: response,
      userType: "user",
    },
  };
}
