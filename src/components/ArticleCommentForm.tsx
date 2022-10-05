import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useAddCommentMutation } from '../hooks'

type FormActions = {
  resetForm: () => void;
};

type FormValues = {
  body: string;
};

function ArticleCommentForm() {
  const { mutateAsync } = useAddCommentMutation()

  async function onSubmit(values: FormValues, actions: FormActions) {
    const { body } = values
    const { resetForm } = actions

    await mutateAsync({
      comment: {
        body,
      },
    })

    resetForm()
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{ body: '' }}>
      {({ isSubmitting }) => (
        <Form className="card comment-form">
          <div className="card-block">
            <Field
              name="body"
              as="textarea"
              required
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="card-footer">
            <img alt="avatar" src="https://api.realworld.io/images/demo-avatar.png" className="comment-author-img" />
            <button disabled={isSubmitting} type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ArticleCommentForm
