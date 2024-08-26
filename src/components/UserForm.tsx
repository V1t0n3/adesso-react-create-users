import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { User } from '../lib/types';
import STRINGS from '../lib/strings';
import CONST from '../lib/const';

const UserForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v2/users',
        {
          name: data.name,
          gender: data.gender,
          email: data.email,
          status: data.status,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONST.gorestAuthToken}`,
          },
        }
      );
      console.log(STRINGS.userSuccessful, response.data);
    } catch (error) {
      console.error(STRINGS.userError, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          {...register('name', { 
            required: STRINGS.nameRequired, 
            minLength: { value: 2, message: STRINGS.minName }, 
            maxLength: { value: 50, message: STRINGS.maxName } 
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Gender:</label>
        <select {...register('gender', { required: STRINGS.genderRequired })}>
          <option value="">Seleziona...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="female">Not specify</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { 
            required: STRINGS.emailRequired, 
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: STRINGS.emailInvalid } 
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Status:</label>
        <select {...register('status', { required: STRINGS.statusRequired })}>
          <option value="">Seleziona...</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
 
export default UserForm;