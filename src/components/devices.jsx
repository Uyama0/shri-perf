import { useEffect, useState, useRef } from "react";
import Event from "./event";
import data from "./data.json";

const TABS_KEYS = ["all", "kitchen", "hall", "lights", "cameras"];

const sizesMap = new Map([
  ["all", 102400],
  ["kitchen", 469],
  ["hall", 400],
  ["lights", 830],
  ["cameras", 200],
]);

const Devices = () => {
  const ref = useRef();
  const initedRef = useRef(false);
  const [activeTab, setActiveTab] = useState("");
  const [hasRightScroll, setHasRightScroll] = useState(false);
  const [TABS] = useState(data);

  useEffect(() => {
    if (!activeTab && !initedRef.current) {
      initedRef.current = true;
      setActiveTab(new URLSearchParams(location.search).get("tab") || "all");
    }
  });

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  useEffect(() => {
    const sumWidth = sizesMap.get(activeTab);
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
        {TABS_KEYS.map((key) => (
          <div
            key={key}
            role="tabpanel"
            className={
              "section__panel" +
              (key === activeTab ? "" : " section__panel_hidden")
            }
            aria-hidden={key === activeTab ? "false" : "true"}
            id={`panel_${key}`}
            aria-labelledby={`tab_${key}`}
          >
            <ul className="section__panel-list">
              {TABS[key].items.map((item, index) => (
                <Event key={index} {...item} />
              ))}
            </ul>
          </div>
        ))}
        {hasRightScroll && (
          <div className="section__arrow" onClick={onArrowCLick}></div>
        )}
      </div>
    </section>
  );
};

export default Devices;
