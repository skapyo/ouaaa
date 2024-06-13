/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  BoxProps,
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  IconButton,
  InputLabel,
  Stack,
} from '@mui/material';
import { styled, createTheme, ThemeProvider, adaptV4Theme } from '@mui/material/styles';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
import { DropzoneAreaBase, FileObject } from 'react-mui-dropzone';
import { Delete } from '@mui/icons-material';
import theme from 'src/theme';

type NewFile = FileObject;
type ExistingFile = {
  id: number;
  src: string;
  deleted: boolean;
};

export type FileType = NewFile | ExistingFile;

// Helpers
export const isNewFile = (f: FileType): f is NewFile => (f as NewFile).file !== undefined;
export const isExistingFile = (f: FileType): f is ExistingFile => (f as ExistingFile).src !== undefined;

export const uploadPictures = (pictures: FileType[]) => {
  return Promise.all(
    pictures.map((picture) => {
      if (isNewFile(picture)) {
        const newFiles = new FormData();
        newFiles.append('files', picture.file);
        return fetch('/api/files', {
          method: 'POST',
          body: newFiles,
        });
      }
      return true;
    }),
  );
};

export const formatPicture = (picture: FileType) => ({
  newpic: isNewFile(picture),
  deleted: isExistingFile(picture) && picture.deleted,
  file: isNewFile(picture) ? { filename: picture.file.name } : {},
  id: isExistingFile(picture) ? picture.id : 0,
});

// Component
const Label = styled(InputLabel)(({ theme }) => ({
  position: 'static',
  transform: 'none',
  marginBottom: theme.spacing(1),
  '&:focus': {
    color: theme.palette.primary.main,
  },
}));

const dropzoneTheme = createTheme(
  theme,
  {
    typography: {
      h5: {
        fontSize: '1.2rem',
        margin: theme.spacing(3),
      },
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            width: '51px',
            height: '51px',
          },
        },
      },
    },
  },
  adaptV4Theme({
    overrides: {
      MuiDropzoneArea: {
        root: {
          minHeight: 'none',
        },
        text: {
          fontSize: '1.2rem',
          margin: theme.spacing(3),
        },
      },
    },
  }),
);

type Props = {
  maxFileSize?: number;
  filesLimit?: number;
  previewGridProps?: GridProps;
  dropzoneText?: string;
  name: string;
  label: string;
  helperText?: string;
  rules?: RegisterOptions;
};

const ImageUploadField = (props: Props & BoxProps) => {
  const {
    name,
    label,
    helperText,
    filesLimit,
    maxFileSize = 4 * 1024 * 1024,
    previewGridProps = { xs: 3 },
    dropzoneText,
    rules,
  } = props;

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const [internalError, setInternalError] = useState<string>();
  const [pictureFiles, setPictureFiles] = useState<FileType[]>((field.value || []) as unknown as ExistingFile[]);

  const onAdd = useCallback((newFiles: NewFile[]) => {
    setPictureFiles((currentFiles) => [...currentFiles, ...newFiles]);
    setInternalError(undefined);
  }, []);

  const onDelete = useCallback(
    (index: number) => {
      if (isNewFile(pictureFiles[index])) {
        setPictureFiles((files) => files.filter((f, i) => i !== index));
      } else {
        setPictureFiles((files) =>
          files.map((f, i) => {
            return i === index ? { ...f, deleted: true } : f;
          }),
        );
      }
    },
    [pictureFiles],
  );

  useEffect(() => {
    field.onChange?.({
      target: {
        name: name || '',
        value: pictureFiles,
      },
      type: 'change',
    });
  }, [pictureFiles, name]);

  const isUploaded = (file) => !(isExistingFile(file) && file.deleted);
  const uploadedFiles = pictureFiles.filter(isUploaded);

  return (
    <FormControl
      variant="outlined"
      required={rules?.validate?.required}
      error={fieldState.invalid || internalError ? true : false}
      sx={props.sx}
    >
      <Label variant="outlined">{label}</Label>

      <Grid container spacing={2} mb={2}>
        {pictureFiles.map((file, i) => {
          if (!isUploaded(file)) return null;
          return (
            <Grid item {...previewGridProps}>
              <Card>
                <CardActionArea>
                  <Stack justifyContent="center" alignItems="center" width="100%" height="100%" position="absolute">
                    <Avatar>
                      <IconButton onClick={() => onDelete(i)}>
                        <Delete />
                      </IconButton>
                    </Avatar>
                  </Stack>
                  <CardMedia
                    component="img"
                    image={isNewFile(file) ? file.data : `${process.env.NEXT_PUBLIC_URI}${file.src}`}
                    title={props.label}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ThemeProvider theme={dropzoneTheme}>
        {(filesLimit === undefined || uploadedFiles.length < filesLimit) && (
          <DropzoneAreaBase
            fileObjects={[]}
            acceptedFiles={['image/jpeg']}
            dropzoneText={dropzoneText ?? 'Ajouter une image (au format jpg et inférieure à 4Mo)'}
            filesLimit={filesLimit}
            maxFileSize={maxFileSize}
            showAlerts={false}
            onAdd={onAdd}
            inputProps={{ onBlur: field.onBlur }}
            getDropRejectMessage={(rejectedFile, acceptedFiles, maxSize) => {
              if (!acceptedFiles.includes(rejectedFile.type)) {
                return 'Type de fichier non supporté';
              }
              if (rejectedFile.size > maxSize) {
                return 'Le fichier est trop volumineux';
              }
              return '';
            }}
            onAlert={(message, errorVariant) => {
              if (errorVariant === 'error') {
                setInternalError(message);
              }
            }}
          />
        )}
      </ThemeProvider>
      <FormHelperText variant="outlined">{fieldState.error?.message || internalError || helperText}</FormHelperText>
    </FormControl>
  );
};

export default ImageUploadField;
