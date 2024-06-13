import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

const customCKEditorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'blockQuote',
      'insertTable',
      '|',
      'undo',
      'redo',
    ],
  },
  alignment: {
    options: ['left', 'right'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

const Label = styled(InputLabel)(({ theme }) => ({
  position: 'static',
  transform: 'none',
  marginBottom: theme.spacing(1),
  '&:focus': {
    color: theme.palette.primary.main,
  },
}));

type Props = {
  name: string;
  label: string;
  rules?: RegisterOptions;
  helperText?: string;
};

const RichTextEditorField = (props: Props) => {
  const { name, label, rules, helperText } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = React.useRef<{ CKEditor: any; ClassicEditor: any }>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    const importCKEditor = async () => {
      const { CKEditor } = await import('@ckeditor/ckeditor5-react');
      const { default: editor } = await import('@ckeditor/ckeditor5-build-classic');
      editorRef.current = { CKEditor, ClassicEditor: editor };
      setEditorLoaded(true);
    };

    importCKEditor();
  }, []);

  return (
    <FormControl
      variant="outlined"
      required={rules && Object.keys(rules).includes('required')}
      error={fieldState.invalid}
    >
      <Label variant="outlined">{label}</Label>
      {editorLoaded && (
        <CKEditor
          editor={ClassicEditor}
          config={customCKEditorConfig}
          data={field.value}
          onChange={(event, editor) =>
            field.onChange({
              target: {
                name: name || '',
                value: editor.getData(),
              },
              type: 'change',
            })
          }
          onBlur={(event, editor) => {
            field.onBlur();
          }}
        />
      )}
      <FormHelperText variant="outlined">{fieldState.error?.message || helperText}</FormHelperText>
    </FormControl>
  );
};

export default RichTextEditorField;
