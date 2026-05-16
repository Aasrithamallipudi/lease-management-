function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrap">
      <div className="loader"></div>
      <span>{text}</span>
    </div>
  );
}

export default Loader;