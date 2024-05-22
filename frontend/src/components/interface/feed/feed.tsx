import React, { useState } from "react";
import { Distance } from "../../advanced/distance";
import { card } from "../../advanced/card";
import { list } from "../../basic/list";
import {
  useEventsQuery,
  useEventMutation,
} from "../../queries/events/events.queries";
import { useEventsStore } from "../../../context/events/events.context";
import { useWindowSize } from "@uidotdev/usehooks";

const Tags = ({ tags }: any) => {
  return (
    <list.List className="list--hz">
      {tags?.map((tag: any, index: number) => (
        <list.Item
          key={tag.id}
          className={`list--hz__item clr-tags-${(index + 1) * 100}`}
        >
          {tag.name}
        </list.Item>
      ))}
    </list.List>
  );
};

const Feed = () => {
  const [distance, setDistance] = useState(45);

  const { data: events, status } = useEventsQuery();
  const { mutate: mutateEvent } = useEventMutation();

  const { filteredEvents } = useEventsStore();

  const ws = useWindowSize();

  const handleChangeDistance = (value: number) => {
    setDistance(value);
  };

  const handleEventUpVotes = (index: number) => {
    const event = events[index];
    const data = {
      eventId: event.id,
      event: {
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        lat: event.lat,
        lng: event.lng,
        votes: event.votes + 1,
      },
    };
    mutateEvent(data);
  };
  const handleEventDownVotes = (index: number) => {
    const event = events[index];
    const data = {
      eventId: event.id,
      event: {
        name: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        lat: event.lat,
        lng: event.lng,
        votes: event.votes - 1,
      },
    };
    mutateEvent(data);
  };

  const distanceProps = {
    distance,
    handleChangeDistance,
  };

  return (
    <div>
      {/* <Distance {...distanceProps} /> */}
      <div className="cards-container">
        {filteredEvents &&
          filteredEvents?.map((event: any, index: number) => (
            <card.Card
              key={index}
              className="card"
              containerClass="card-container"
              extraChildren={Tags({ tags: event.tags })}
            >
              <card.Header
                username={event.creator.username}
                avatar={event.creator.profile_picture}
                location={event.region.name}
                className="card__header"
              />
              <card.Content
                description={event.description}
                name={event.name}
                img={event.image}
                className="card__content"
              />
              <card.Footer
                votes={event.votes}
                handleUpVotes={() => handleEventUpVotes(index)}
                handleDownVotes={() => handleEventDownVotes(index)}
                className="card__footer"
                comments={event.comments}
                date={event.date}
              />
              {ws.width < 400 && (
                <card.Header
                  date={event.date}
                  username={event.creator.username}
                  avatar={event.creator.profile_picture}
                  location={event.region.name}
                  className="card__header"
                />
              )}
            </card.Card>
          ))}
        {!events && <div>{status}</div>}
      </div>
    </div>
  );
};

export default Feed;
