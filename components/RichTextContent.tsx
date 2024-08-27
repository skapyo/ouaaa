import React from 'react';
import { Box } from '@mui/material';
import Parser from 'html-react-parser';
import styles from './RichTextContent.module.css'

type Props = {
  content: string;
}

export const RichTextContent = ({ content }: Props) => (
  <Box className={styles.container}>
    {Parser(content)}
  </Box>
);

export default RichTextContent;
