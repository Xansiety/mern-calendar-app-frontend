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


export const eventStyleGetter = (event, start, end, isSelected, user) => {
  // console.log({ event, start, end, isSelected });

  const isMyEvent = event.user._id === user._id ;

  console.log(isMyEvent)

  const style = {
    backgroundColor: isMyEvent ? "#367cf7" : "#465660",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  };

  return {
    style,
  };
};

