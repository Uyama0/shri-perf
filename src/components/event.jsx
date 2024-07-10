function Event(props) {
  return (
    <li className={"event" + (props.slim ? " event_slim" : "")}>
      <button className="event__button">
        <img
          src={`./icon_${props.icon}.svg`}
          alt={`${props.label}`}
          className={`event__icon`}
          aria-label={props.iconLabel}
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
