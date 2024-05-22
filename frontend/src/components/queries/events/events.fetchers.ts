import { useApi } from "../../../api/api";

export const EventsFetcher = () => {
  const { api } = useApi();
  const fetch = async () => {
    const response = await api.get(`api/events/`);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};

export const EventMutationFetcher = () => {
  const { api } = useApi();
  const fetch = async (data: any) => {
    const response = await api.put(`api/events/${data.eventId}/`, data.event);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};
