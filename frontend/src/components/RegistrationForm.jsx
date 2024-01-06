import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { addUser } from '../services/api';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const mutation = useMutation((data) => addUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      reset();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const dateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      setValue('age', age);
    }
  }, [dateOfBirth, setValue]);

  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            {...register('name', { required: true })}
            placeholder="Enter your name"
          />
        </label>

        <label className="form-label">
          Email:
          <input
            className="form-input"
            {...register('email', { required: true })}
            placeholder="Enter your email"
          />
        </label>

        <label className="form-label">
          Age:
          <input
            className="form-input"
            type="number"
            {...register('age', { required: true })}
            placeholder="Enter your age"
            readOnly
          />
        </label>

        <label className="form-label">
          Date of Birth:
          <input
            className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
            type="date"
            {...register('dateOfBirth', {
              required: 'Date of Birth is required',
              validate: (value) => {
                const birthDate = new Date(value);
                const currentDate = new Date();
                return birthDate < currentDate || 'Invalid Date of Birth';
              },
            })}
          />
        </label>

        <label className="form-label">
          Gender:
          <div className="gender-inputs">
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                {...register('gender')}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                {...register('gender')}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </label>

        <button
          className="form-button"
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Submit
        </button>
      </form>
      {isSubmitted && (
        <div className="caption">
          <span>Welcome </span>
          {selectedGender === 'male' ? 'Mr. ' : selectedGender === 'female' ? 'Ms. ' : ''}
          {isSubmitted && mutation.data && mutation.data.name && (
            <span>{mutation.data.name}</span>
          )}
          !
        </div>
      )}
      {isHovered && !isSubmitted && <div className="caption">Do not miss!</div>}
    </div>
  );
};

export default RegistrationForm;
