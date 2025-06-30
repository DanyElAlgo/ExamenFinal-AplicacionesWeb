import "./badgeIcon.css";

function BadgeIcon( { src, width, height } ) {
  return (
    <div className="badge">
        <img alt="icon" className="badge__icon" src={src} width={width} height={height}/>
    </div>
  )
}

export default BadgeIcon