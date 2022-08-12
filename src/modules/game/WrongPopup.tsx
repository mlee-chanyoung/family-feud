import "./wrong.scss";

export const WrongPopup = ({ onClick }: { onClick: (event: React.MouseEvent) => void }) => (
  <div className="wrong" onClick={onClick}>
    <img className="wrong-image" src="/img/x.png" />
  </div>
);
