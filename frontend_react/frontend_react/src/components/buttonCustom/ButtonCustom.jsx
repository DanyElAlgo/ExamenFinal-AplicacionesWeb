import "./buttonCustom.css";

function ButtonCustom({ title, onClick, focus }) {
  return (
    <button className="button" onClick={onClick}>
        { title }
    </button>
  )
}

export default ButtonCustom