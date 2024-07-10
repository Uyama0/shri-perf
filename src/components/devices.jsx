import React from "react";
import Event from "./event";
import data from "./data.json";

const TABS_KEYS = ["all", "kitchen", "hall", "lights", "cameras"];

const Devices = () => {
  const ref = React.useRef();
  const initedRef = React.useRef(false);
  const [activeTab, setActiveTab] = React.useState("all");
  const [hasRightScroll, setHasRightScroll] = React.useState(false);
  const [TABS] = React.useState(data);

  React.useEffect(() => {
    if (!activeTab && !initedRef.current) {
      initedRef.current = true;
      setActiveTab(new URLSearchParams(location.search).get("tab") || "all");
    }
  });

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  let sizes = [];
  const onSize = (size) => {
    sizes = [...sizes, size];
  };

  React.useEffect(() => {
    const sumWidth = sizes.reduce((acc, item) => acc + item.width, 0);

    const newHasRightScroll = sumWidth > ref.current.offsetWidth;
    if (newHasRightScroll !== hasRightScroll) {
      setHasRightScroll(newHasRightScroll);
    }
  });

  const onArrowCLick = () => {
    const scroller = ref.current.querySelector(
      ".section__panel:not(.section__panel_hidden)"
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="section main__devices">
      <div className="section__title">
        <h2 className="section__title-header">Избранные устройства</h2>

        <select
          className="section__select"
          defaultValue="all"
          onInput={onSelectInput}
        >
          {TABS_KEYS.map((key) => (
            <option key={key} value={key}>
              {TABS[key].title}
            </option>
          ))}
        </select>

        <ul role="tablist" className="section__tabs">
          {TABS_KEYS.map((key) => (
            <li
              key={key}
              role="tab"
              aria-selected={key === activeTab ? "true" : "false"}
              tabIndex={key === activeTab ? "0" : undefined}
              className={
                "section__tab" +
                (key === activeTab ? " section__tab_active" : "")
              }
              id={`tab_${key}`}
              aria-controls={`panel_${key}`}
              onClick={() => setActiveTab(key)}
            >
              {TABS[key].title}
            </li>
          ))}
        </ul>
      </div>

      <div className="section__panel-wrapper" ref={ref}>
        <div
          role="tabpanel"
          className="section__panel"
          id={`panel_${activeTab}`}
          aria-labelledby={`tab_${activeTab}`}
        >
          <ul className="section__panel-list">
            {TABS[activeTab].items.map((item, index) => (
              <Event key={index} {...item} onSize={onSize} />
            ))}
          </ul>
        </div>
        {hasRightScroll && (
          <div className="section__arrow" onClick={onArrowCLick}></div>
        )}
      </div>
    </section>
  );
};

export default Devices;
