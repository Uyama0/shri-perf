import { useRef, useEffect } from "react";

function Event(props) {
  const ref = useRef();

  const { onSize } = props;

  useEffect(() => {
    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    if (onSize) {
      onSize({ width, height });
    }
  });
  return (
    <li ref={ref} className={"event" + (props.slim ? " event_slim" : "")}>
      <button className="event__button">
        <img
          src={`assets/icon_${props.icon}.svg`}
          alt={`${props.label}`}
          className={`event__icon`}
        />
        <h4 className="event__title">{props.title}</h4>
        {props.subtitle && (
          <span className="event__subtitle">{props.subtitle}</span>
        )}
      </button>
    </li>
  );
}

export default Event;
