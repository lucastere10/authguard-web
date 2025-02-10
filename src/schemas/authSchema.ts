
import * as yup from 'yup';

export const emailRequestSchema = yup.object().shape({
    email: yup
        .string()
        .required('Digite o email')
});
