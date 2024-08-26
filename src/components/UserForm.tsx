import React from 'react'

const UserForm: React.FC = () => {

  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          type="text"
        />
      </div>

      <div>
        <label>Gender:</label>
        <select>
          <option value="">Seleziona...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="female">Not specify</option>
        </select>
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
        />
      </div>

      <div>
        <label>Status:</label>
        <select>
          <option value="">Seleziona...</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
 
export default UserForm;