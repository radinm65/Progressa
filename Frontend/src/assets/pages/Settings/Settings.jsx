import { useEffect, useState } from "react";
import "./Settings.css";
import { useOutletContext } from "react-router-dom";
import { updateUser, updatePassword } from "../../api/usersData";

export function Settings() {
  const { user, setUser } = useOutletContext();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  async function handleSavePassword() {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password are not same");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await updatePassword(user.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      alert("Password updated Successfuly");
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSaveInfo() {
  try {
    const updated = await updateUser(user.id, userInfo);

    console.log("UPDATED USER:", updated);

    if (updated) {
      setUser(updated);
      alert("Infos updated Successfuly");
    }

  } catch (e) {
    console.log(e);
  }
}
  return (
    <>
      <div className="settings-div">
        <h2>Change Password</h2>
        <div className="change-div">
          <div>
            <label>Current password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>New password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Confirm new password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button onClick={handleSavePassword}>save Password</button>
        <h2>Manage Account</h2>
        <div className="change-div">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button onClick={handleSaveInfo}>save Info</button>
      </div>
    </>
  );
}
