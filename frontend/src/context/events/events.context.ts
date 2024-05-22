import { create } from "zustand";

interface IFilter {
  cats: string[];
  tags: string[];
}

type FilterKeyType = "cats" | "tags";

interface IEvents {
  filter: IFilter;
  events: any[];
  filteredEvents: any[];
  addFilter: (filter: FilterKeyType, value: string) => void;
  removeFilter: (filterName: FilterKeyType, value: string) => void;
  setEvents: (events: any[]) => void;
}

const applyFilter = (events: any[], filter: IFilter, filterName: string) => {
  const { cats, tags } = filter;

  console.log("filter", filter);

  switch (filterName) {
    case "cats":
      if (cats.length === 0) return events;
      return events.filter((event: any) =>
        cats.some((cat: string) => event.cat.name === cat)
      );
    case "tags":
      return events.filter((event: any) =>
        tags.some((tag: string) => event.tags.includes(tag))
      );
    default:
      return events;
  }
};

export const useEventsStore = create<IEvents>((set) => ({
  filter: { cats: [], tags: [] },
  events: [],
  filteredEvents: [],
  addFilter: (filterName: FilterKeyType, value: string) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        [filterName]: [...state.filter[filterName], value],
      };
      return {
        filter: newFilter,
        filteredEvents: applyFilter(state.events, newFilter, filterName),
      };
    }),
  removeFilter: (filterName: FilterKeyType, value: string) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        [filterName]: state.filter[filterName].filter(
          (item: string) => item !== value
        ),
      };
      return {
        filter: {
          ...state.filter,
          [filterName]: state.filter[filterName].filter(
            (item: string) => item !== value
          ),
        },
        filteredEvents: applyFilter(state.events, newFilter, filterName),
      };
    }),
  setEvents: (events: any[]) => set({ events, filteredEvents: events }),
}));
