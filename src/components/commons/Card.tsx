import React from 'react';

interface CardProps {
  title: string;
  text: string;
  buttonText?: string; 
  children?: React.ReactNode;  
}

function Card({ title, text, buttonText, children }: CardProps) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          {buttonText && ( 
            <a href="#" className="btn btn-primary">{buttonText}</a>
          )}
          <div className="mt-3">{children}</div>  
        </div>
      </div>
    </div>
  );
}

export default Card;

