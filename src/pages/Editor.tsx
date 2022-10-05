import React from 'react'

import axios from 'axios'
import { Form, Formik, Field } from 'formik'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { FormErrors, TagsInput } from '../components'
import { useArticleQuery } from '../hooks'

type FormFields = {
  body: string;
  description: string;
  tagList: string[];
  title: string;
};

function Editor() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const articleQuery = useArticleQuery()
  const article = articleQuery?.data?.article || {}
  const { slug } = article

  async function onSubmit(values, { setErrors }) {
    try {
      const requestMethod = slug ? 'put' : 'post'
      const queryParam = slug ? `/${slug}` : ''
      const { data } = await axios[requestMethod](`/articles${queryParam}`, { article: values })

      if (slug) {
        await queryClient.invalidateQueries(`/articles/${slug}`)
      } else {
        await queryClient.invalidateQueries('/articles')
      }

      navigate(`/article/${data?.article?.slug}`)
    } catch (error) {
      const { status, data } = error.response

      if (status === 422) {
        setErrors(data.errors)
      }
    }
  }

  const initialValues: Partial<FormFields> = {
    body: article?.body || '',
    description: article?.description || '',
    tagList: article?.tagList || [],
    title: article?.title || '',
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <>
                  <FormErrors />
                  <Form>
                    <fieldset disabled={isSubmitting}>
                      <fieldset className="form-group">
                        <Field
                          name="title"
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Article Title"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="description"
                          type="text"
                          className="form-control"
                          placeholder="What's this article about?"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="body"
                          as="textarea"
                          className="form-control"
                          rows={8}
                          placeholder="Write your article (in markdown)"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field name="tagList" component={TagsInput} />
                      </fieldset>

                      <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                        Publish Article
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
