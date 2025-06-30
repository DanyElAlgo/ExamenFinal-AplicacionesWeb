import "./formButton.css";

function FormButton({ title, onClick, disabled = false }) {
  return (
    <button className="form-button" onClick={onClick} disabled={disabled}>
        { title }
    </button>
  )
}

export default FormButton