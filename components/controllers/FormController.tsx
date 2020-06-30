import React, { ChangeEvent } from "react"
import { useCallback, useState, useEffect, useMemo } from "react"
import { useMutation } from "@apollo/react-hooks"
import { useSnackbar } from "notistack"
import omitTypename from "utils/omitTypename"
import validateEmailFormat from "utils/validateEmailFormat"
import validatePasswordFormat from "utils/validatePasswordFormat"
import { DocumentNode } from "graphql"

type FormValues = { [key: string]: string }

export type QueryOptions = {
  query: DocumentNode
  resultLabel: string
  mutationResultControl?:
    | ((formValues: FormValues, data: any, error: any) => boolean)
    | "builtin"
  clearFormvaluesAfterControl?: boolean
  afterResultControlCallback?: (
    formValues: FormValues,
    data: any,
    error: any
  ) => void
  snackbarSucceedMessage?: string
}

export enum ValidationRuleType {
  password = "password",
  equalTo = "equalTo",
  required = "required",
  email = "email",
  only = "only",
}

type Rule =
  | {
      rule: ValidationRuleType.password
    }
  | {
      rule: ValidationRuleType.equalTo
      field: string
    }
  | {
      rule: ValidationRuleType.required
    }
  | {
      rule: ValidationRuleType.email
    }
  | {
      rule: ValidationRuleType.only
      type: "number" | "string"
    }

export type ValidationRules = { [key: string]: Rule }

type ValidationResult = {
  result: { [key: string]: string[] }
  global: boolean
}

type WithMutationProps = {
  formValues: FormValues
  formChangeHandler: (event: ChangeEvent) => void
  validationResult?: ValidationResult
  setFormValue: (formValues: FormValues) => void
  queryOptions: QueryOptions
  setInitialFormValues: (formValues: FormValues) => void
  clearFormvalues: () => void
}

type RenderCallbackProps = {
  formValues: FormValues
  formChangeHandler: (event: ChangeEvent) => void
  clearFormvalues: () => void
  validationResult?: ValidationResult
  submitHandler?: () => void
  loading?: boolean
  isModified?: boolean
}

export type RenderCallback = (props: RenderCallbackProps) => JSX.Element

type FormControllerProps = {
  initValues?: FormValues
  render: RenderCallback
  withQuery?: boolean
  queryOptions?: QueryOptions
  validationRules?: ValidationRules
}

const withMutation = (FormComponent: RenderCallback) => (
  props: WithMutationProps
) => {
  const { formValues, setFormValue, queryOptions, setInitialFormValues } = props
  const scnackbar = useSnackbar()

  const [update, { data, loading, error }] = useMutation(queryOptions.query, {
    variables: {
      formValues,
    },
  })

  const submitHandler = useCallback(() => {
    update()
  }, [update])

  useEffect(() => {
    // if (!error) {
    let next = false
    if (queryOptions.mutationResultControl == "builtin") {
      if (data?.[queryOptions.resultLabel] && !error) next = true
    } else if (
      queryOptions.mutationResultControl &&
      queryOptions.mutationResultControl(formValues, data, error)
    )
      next = true

    if (next) {
      setInitialFormValues(omitTypename(data?.[queryOptions.resultLabel]))

      if (queryOptions.snackbarSucceedMessage)
        scnackbar.enqueueSnackbar(queryOptions.snackbarSucceedMessage)

      if (queryOptions.afterResultControlCallback)
        queryOptions.afterResultControlCallback(formValues, data, error)

      if (queryOptions.clearFormvaluesAfterControl) {
        const keys = Object.keys(formValues)
        let formValuesTemp = {}
        keys.forEach((key) => {
          formValuesTemp = { ...formValuesTemp, [key]: "" }
        })
        setFormValue(formValuesTemp)
      }
    } else if (data)
      throw new Error(
        `No data for the result label: ${queryOptions.resultLabel}`
      )
    // }
  }, [data, error])

  return (
    <FormComponent {...props} submitHandler={submitHandler} loading={loading} />
  )
}

const FormController = (props: FormControllerProps, ...otherprops: any[]) => {
  const {
    initValues,
    render,
    withQuery = false,
    queryOptions,
    validationRules = null,
  } = props

  const [formValues, setFormValue] = useState({ ...initValues })
  const [initialFormValues, setInitialFormValues] = useState({ ...initValues })
  const [validationResult, setValidationResult] = useState<ValidationResult>()

  const formChangeHandler = useCallback(
    (e) => {
      // if there an only rule on the field
      const rule = validationRules?.[e.target.name]
      if (rule?.rule === ValidationRuleType.only) {
        if (rule.type === "number") {
          const isnum = /^\d+$/.test(e.target.value)

          if (isnum)
            setFormValue({ ...formValues, [e.target.name]: e.target.value })
        }
        if (rule.type === "string") {
          const ischar = /^[a-zA-Z]+$/.test(e.target.value)
          if (ischar)
            setFormValue({ ...formValues, [e.target.name]: e.target.value })
        }
      } else {
        setFormValue({ ...formValues, [e.target.name]: e.target.value })
      }
    },
    [setFormValue, formValues, validationRules]
  )

  /* a revoir */
  const isModified = useMemo(() => {
    if (JSON.stringify(formValues) == JSON.stringify(initialFormValues))
      return false
    return true
  }, [formValues, initialFormValues])

  const clearFormvalues = useCallback(() => {
    setFormValue({})
    setInitialFormValues({})
  }, [setFormValue])

  /* validation : a revoir / compléter .. */
  useEffect(() => {
    if (validationRules) {
      let validationResultTemp: ValidationResult = { global: true, result: {} }

      const keys = Object.keys(validationRules)

      keys.forEach((key) => {
        const field = validationRules[key]

        /* password rule handler */
        if (field.rule == ValidationRuleType.password) {
          const result = validatePasswordFormat(formValues?.[key])

          /* if the password format is validated, update the result for the concerned field */
          if (result.length !== 0) {
            const newKeyValue = validationResultTemp.result[key]
              ? validationResultTemp.result[key].concat(result)
              : result
            validationResultTemp = {
              result: {
                ...validationResultTemp.result,
                [key]: newKeyValue,
              },
              global: false,
            }
          }
        }

        /* equalTo rule handler */
        if (field.rule == ValidationRuleType.equalTo) {
          /* test if the 2 fields are equals */
          const result = formValues[key] == formValues[field.field]

          /* if the test result is false, update the result for the concerned field */
          if (!result) {
            const newKeyValue = validationResultTemp.result[key]
              ? validationResultTemp.result[key].concat("equalTo")
              : ["equalTo"]
            validationResultTemp = {
              result: {
                ...validationResultTemp.result,
                [key]: newKeyValue,
              },
              global: false,
            }
          }
        }

        /* required rule handler */
        if (field.rule == ValidationRuleType.required) {
          /* test if there is a value in the formValues array */
          const result = formValues[key]?.length == 0

          /* if the test result is true, update the result for the concerned field */
          if (result) {
            const newKeyValue = validationResultTemp.result[key]
              ? validationResultTemp.result[key].concat("required")
              : ["required"]
            validationResultTemp = {
              result: {
                ...validationResultTemp.result,
                [key]: newKeyValue,
              },
              global: false,
            }
          }
        }

        /* email rule handler */
        if (field.rule == ValidationRuleType.email) {
          const result = validateEmailFormat(formValues?.[key])

          /* if the email format is validated, update the result for the concerned field */
          if (!result) {
            const newKeyValue = validationResultTemp.result[key]
              ? validationResultTemp.result[key].concat("email")
              : ["email"]
            validationResultTemp = {
              result: {
                ...validationResultTemp.result,
                [key]: newKeyValue,
              },
              global: false,
            }
          }
        }
      })

      setValidationResult(validationResultTemp)
    }
  }, [formValues, validationRules])

  const withMutationProps = useMemo(() => {
    return {
      formChangeHandler: formChangeHandler,
      isModified,
      formValues,
      validationResult,
      queryOptions,
      setInitialFormValues,
      setFormValue,
      clearFormvalues,
    }
  }, [
    formChangeHandler,
    isModified,
    formValues,
    validationResult,
    queryOptions,
    withQuery,
    setInitialFormValues,
    setFormValue,
  ])

  const renderProps = useMemo(() => {
    return {
      formChangeHandler: formChangeHandler,
      isModified,
      formValues,
      validationResult,
      clearFormvalues,
      ...otherprops,
      // queryOptions: queryOptions,
    }
  }, [
    formChangeHandler,
    isModified,
    formValues,
    validationResult,
    // queryOptions,
  ])

  if (withQuery) {
    if (!queryOptions)
      throw new Error(
        "queryOption prop must be provided when withQuery prop is true."
      )
    // @ts-ignore
    return withMutation(render)(withMutationProps)
  }

  return render(renderProps)
}

export default FormController
