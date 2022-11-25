
export const CalendarEvent = ({event}) => {
    // console.log(props)
    const {title, user} = event;
  return (
    <>
        <strong>{title}</strong>
        <br></br>
        <span> - {user.name}</span>
    </>
  )
}
