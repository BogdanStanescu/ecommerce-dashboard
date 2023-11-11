"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import APIAlert from "@/components/ui/api-alert";

interface IAPIListProps {
  id: string;
  name: string;
}

const APIList = ({ id, name }: IAPIListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseURL = `${origin}/api/${params.storeId}`;

  return (
    <>
      <APIAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${name}`}
      />

      <APIAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${name}/{${id}}`}
      />

      <APIAlert
        title="POST"
        variant="admin"
        description={`${baseURL}/${name}`}
      />

      <APIAlert
        title="PATCH"
        variant="admin"
        description={`${baseURL}/${name}/{${id}}`}
      />

      <APIAlert
        title="DELETE"
        variant="admin"
        description={`${baseURL}/${name}/{${id}}`}
      />
    </>
  );
};

export default APIList;
