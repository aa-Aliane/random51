import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFilters,
} from "@tanstack/react-query";
import { EventsFetcher, EventMutationFetcher } from "./events.fetchers";
import { useEventsStore } from "../../../context/events/events.context";
import { set } from "zod";

export const useEventsQuery = () => {
  const { fetch } = EventsFetcher();
  const { setEvents } = useEventsStore();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await fetch();
      setEvents(data);
      return data;
    },
  });
};

export const useEventMutation = () => {
  const { fetch } = EventMutationFetcher();

  const queryClient = useQueryClient();

  const { status, data, mutate } = useMutation({
    mutationKey: ["events"],
    mutationFn: (data: any) => fetch(data),
    onSuccess: () => {
      const filters: QueryFilters = {
        queryKey: ["events"],
      };
      queryClient.invalidateQueries(filters);
    },
  });

  return {
    data,
    status,
    mutate,
  };
};
