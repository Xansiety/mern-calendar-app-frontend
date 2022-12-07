export const CalendarEvent = ({ event }) => {
  // console.log(props)
  const { title, user } = event; 
  return (
    <>
      <p>
        <i className="far fa-clock"></i>
      <strong>{title}</strong>
      </p>  
        <span> - {user.nombre}</span> 
    </>
  );
};
