import { useOutletContext } from "react-router-dom";
import "./Profile.css";

export function Profile() {
  const { user } = useOutletContext();
  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-header-div">
          <img src={`/${user.profile_img}`} alt="" />
          <div className="profile-info">
            <p>{user.name}</p>
            <p>{`@${user.username}`}</p>
          </div>
        </div>
        <div className="infos-wrapper">
          <h2>Personal Info</h2>
          <div className="infos">
            <div>
              <h3>age</h3>
              <p>{user.age}</p>
            </div>
            <div>
              <h3>Height</h3>
              <p>{user.height}</p>
            </div>
            <div>
              <h3>Weight</h3>
              <p>{user.weight}</p>
            </div>
            <div>
              <h3>Gender</h3>
              <p>{user.gender}</p>
            </div>
            <div>
              <h3>BMI</h3>
              <p>{+(user.weight / ((user.height / 100) * (user.height / 100))).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
