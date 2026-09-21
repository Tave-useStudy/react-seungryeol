import { useState, useEffect } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const userData = data.results[0];
        
        setUser(userData);
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
    <div>
      <h2>랜덤 유저</h2>
      {user && (
        <div>
            <img src={user.picture.large} alt="user" />
            <p>{user.name.first} {user.name.last}</p>
            <p>{user.email}</p>
            <button onClick={fetchUser}>새로고침</button>
        </div>
    )}
    </div>
    );
}

export default UserProfile;