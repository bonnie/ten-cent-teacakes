import { Typography } from "antd";
import { ReactElement } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { fetchEvents } from "../lib/api";
import { queryKeys } from "../lib/react-query/query-keys";
import { Event } from ".prisma/client";

type EventPropsType = { events: Array<Event> };

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.events, fetchEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const { Title } = Typography;

// TODO: when to use React.FC and when to use React.ReactElement?
export default function Events({ events }: EventPropsType): ReactElement {
  return (
    <div>
      <Title>Upcoming Events</Title>
    </div>
  );
}
