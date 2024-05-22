import React, { useState } from "react";
import { Button } from "../../basic/buttons";
import { search } from "../../advanced/search";
import { MobileFilters as Filters } from "../../mobile/nav";
import { useSubheaderStore } from "../subheader/subheader.context";


const NavMobile = () => {
  const [searchActivated, setSearchActivated] = useState(false);

  const { filtersToggle, setFiltersToggle } = useSubheaderStore();

  
  return (
    <nav className="nav-mb-container">
      <div className="nav--mobile">
        <div className="mb-filters-container">
          <Filters
            className="mobile-filters"
            open={filtersToggle}
            data-open={filtersToggle}
            handleCloseDialog={() => {
              setFiltersToggle(false);
            }}
          />
        </div>
        <search.Search className="mobile-search" data-active={searchActivated}>
          <Button
            className="btn btn--mb--menu nav-button"
            icon={<span className="material-symbols-outlined">search</span>}
            onClick={() => setSearchActivated(true)}
          ></Button>
          <search.Input
            className={`clr-neutral-150 w-100`}
            data-active={searchActivated}
            placeholder="chercher un évenement"
          />
          <Button
            className="btn btn--mb--menu nav-button mobile-search__close"
            icon={<span className="material-symbols-outlined">close</span>}
            onClick={() => setSearchActivated(false)}
            data-active={searchActivated}
          ></Button>
        </search.Search>
        <div className="mobile-search--label" data-active={!searchActivated}>
          trouver un évenment
        </div>
        <Button
          className="btn btn--mb--menu nav-button"
          icon={<span className="material-symbols-outlined">tune</span>}
          onClick={() => setFiltersToggle(true)}
        ></Button>
      </div>
    </nav>
  );
};

export default NavMobile;
