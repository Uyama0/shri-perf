function Event(props) {
  return (
    <li className={"event" + (props.slim ? " event_slim" : "")}>
      <button className="event__button">
        <img
          src={`icon_${props.icon}.svg`}
          alt=""
          role="img"
          aria-label={props.iconLabel}
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
