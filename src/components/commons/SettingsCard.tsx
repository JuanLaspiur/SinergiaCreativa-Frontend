import React, { ElementType } from "react";

interface SettingsCardProps {
  icon?: ElementType; 
  title: string;
  text: string;
  buttonLabel?: string;
  buttonIcon?: ElementType;
  onClick?: () => void;
  bgColor?: string;
  btnClass?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  icon: Icon,
  title,
  text,
  buttonLabel,
  buttonIcon: ButtonIcon,
  onClick,
  bgColor = '#f8f9fa',
  btnClass = 'btn btn-primary'
}) => {
  return (
    <div className="card mb-4" style={{ backgroundColor: bgColor }}>
      <div className="card-body">
        <h4 className="card-title">
          {Icon && <Icon className="me-2" />} {title}
        </h4>
        <p className="card-text">{text}</p>
        {buttonLabel && (
          <button className={btnClass} onClick={onClick}>
            {ButtonIcon && <ButtonIcon className="me-2" />} {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsCard;
