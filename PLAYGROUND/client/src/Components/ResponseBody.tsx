import React from "react";

type ResponseBodyProps = {
  response: string;
};

function ResponseBody(props: ResponseBodyProps) {
  return (
    <div>
      <textarea
        value={props.response}
        name="response"
        id="res"
        cols={86}
        rows={20}
        readOnly={true}
      ></textarea>
    </div>
  );
}

export default ResponseBody;
