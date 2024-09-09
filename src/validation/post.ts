import * as Yup from 'yup';

const postValidation = Yup.object().shape({
    description: Yup.string().required("Description is required").min(3, "Description").trim(),
});
const commentValidation = Yup.object().shape({
    comments: Yup.string().required().min(3).trim(),
})

export {postValidation, commentValidation}