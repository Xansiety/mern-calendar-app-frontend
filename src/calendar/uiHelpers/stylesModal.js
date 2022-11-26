export const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export const eventStyleGetter = (event, start, end, isSelected) => {
  // console.log({ event, start, end, isSelected });

  const style = {
    backgroundColor: "#367cf7",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  };

  return {
    style,
  };
};

