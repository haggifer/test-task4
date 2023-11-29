import React, { ReactElement } from 'react';
import useSWR from "swr";
import { fetcher } from "../../../api/api";

export default function Currencies(): ReactElement {
  const {data, error, isLoading} = useSWR('/pubinfo?json&exchange&coursid=4', fetcher)

  console.log(isLoading)
  console.log(data)

  return (
    <></>
  );
}
