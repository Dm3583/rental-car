'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBookingCar } from '@/lib/api';
import CustomInput from '@/components/CustomInput/CustomInput';
import CustomTextarea from '@/components/CustomTextarea/CustomTextarea';
import Button from '@/components/Button/Button';
import type { RentForm as RentFormValues } from '@/types/car';
import { isValidEmail } from '@/lib/utils';
import css from './RentForm.module.css';

interface RentFormProps {
  carId: string;
}

type FormErrors = Partial<Record<keyof RentFormValues, string>>;

const EMPTY_FORM: RentFormValues = { name: '', email: '', comment: '' };

const validate = (values: RentFormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!isValidEmail(values.email)) {
    errors.email = 'Please enter your valid email.';
  }
  if (!values.comment?.trim()) errors.comment = 'Comment is required.';

  return errors;
};

export function RentForm({ carId }: RentFormProps) {
  const [form, setForm] = useState<RentFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate, isPending } = useMutation({
    mutationFn: (values: RentFormValues) => createBookingCar(carId, values),
    onSuccess: (data) => {
      toast.success(data.message || 'Your booking request has been sent.');
      setForm(EMPTY_FORM);
      setErrors({});
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    mutate(form);
  };

  return (
    <div className={css.rentalFormContainer}>
      <div>
        <h3 className={`${css.title} title3`}>Book your car now</h3>
        <p className={`${css.description} bodyMd`}>
          Stay connected! We are always ready to help you
        </p>
      </div>
      <form className={css.rentalForm} onSubmit={handleSubmit} noValidate>
        <CustomInput
          label='Name*'
          name='name'
          placeholder='Enter your name'
          value={form.name}
          onChange={handleChange}
          isError={Boolean(errors.name)}
          errorMessage={errors.name}
        />
        <CustomInput
          label='Email*'
          name='email'
          type='email'
          placeholder='Enter your email'
          value={form.email}
          onChange={handleChange}
          isError={Boolean(errors.email)}
          errorMessage={errors.email}
        />
        <CustomTextarea
          label='Comment*'
          name='comment'
          placeholder='Enter your comment'
          value={form.comment}
          onChange={handleChange}
          isError={Boolean(errors.comment)}
          errorMessage={errors.comment}
        />
        <Button
          type='submit'
          label={isPending ? 'Sending...' : 'Send'}
          disabled={isPending}
        />
      </form>
    </div>
  );
}
