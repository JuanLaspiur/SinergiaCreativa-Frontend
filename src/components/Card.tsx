interface CardProps {
  title: string
  text: string
  buttonText: string
}

function Card({ title, text, buttonText }: CardProps) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <a href="#" className="btn btn-primary">{buttonText}</a>
        </div>
      </div>
    </div>
  )
}

export default Card
