export const MovieDescription = ({ img, alt, description }) => {
  return (
    <div className="description-container">
      <img src={img} style={{ height: "50px" }} alt={alt}></img>
      {description}
    </div>
  );
};
