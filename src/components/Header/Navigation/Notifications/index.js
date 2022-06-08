import './style.css';

function Notifications(props) {

  console.log(props?.notis);
  return (

    <ul className="notifications">

      {props?.notis.map(noti => {
        return (
          <li className="notificationItem" key={noti.id}>
          <p>{noti.message}</p>
          </li>
        )
      })}

    </ul>

  )

};

export default Notifications;