import React, { useCallback, useEffect, useState, } from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';

import { withApollo } from 'hoc/withApollo';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';

const validationRules: ValidationRules = {
  label: {
    rule: ValidationRuleType.required,
  },
  shortDescription: {
    rule: ValidationRuleType.required && ValidationRuleType.maxLength,
    maxLimit: 90,
  },
};

const styles = {
  container: {
    textAlign: 'center',
  },
  field: {
    marginBottom: (theme) => theme.spacing(3),
  },
}

type AddRecipeFormProps = {

}

const AddRecipeForm = (props: AddRecipeFormProps) => {
  const { } = props;

  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    return (
      <Container component="main" sx={styles.container}>
        <Typography sx={styles.field} color="secondary" variant="h6">
          Ajouter une recette
        </Typography>
      </Container>
    )
  }

  return (
    <FormController render={Form} validationRules={validationRules} />
  )
};

export default withApollo()(AddRecipeForm);