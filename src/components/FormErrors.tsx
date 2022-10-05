import React from 'react'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash-es'

function FormErrors() {
  const { errors } = useFormikContext()

  if (isEmpty(errors)) return null

  return (
    <ul className="error-messages">
      {Object.entries(errors).map(([key, messages]) => {
        if (!Array.isArray(messages)) {
          return null;
        }

        return messages.map((message: string) => (
          <li key={`${key} ${message}`}>
            {key} {message}
          </li>
        ))
      })}
    </ul>
  )
}

export default FormErrors
