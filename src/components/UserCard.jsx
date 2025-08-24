import React from 'react';
import { useEffect } from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="card bg-base-400 w-96 shadow-lg">
        <figure>
          <img
            src={photoUrl || "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
