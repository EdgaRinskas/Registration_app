// Import necessary styles
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { addUser } from '../services/api';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => addUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label">Name:</label>
      <input className="form-input" {...register('name', { required: true })} />
      
      <label className="form-label">Email:</label>
      <input className="form-input" {...register('email', { required: true })} />
      
      <label className="form-label">Age:</label>
      <input className="form-input" {...register('age', { required: true })} />
      
      <button className="form-button" type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
