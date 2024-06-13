import React, { useCallback, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { withApollo } from '../../../hoc/withApollo';
import AdminPageLayout from '../../../containers/layouts/AdminPageLayout';
import useGraphQLErrorDisplay from '../../../hooks/useGraphQLErrorDisplay';

const GET_ARTICLES = gql`
  query articles {
    articles(sort: "createdAt", way: "DESC") {
      id
      label
      createdAt
      updatedAt
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: Int!) {
    deleteArticle(articleId: $articleId)
  }
`;

const ArticleAdminPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, error: getError, refetch } = useQuery(GET_ARTICLES);
  const [deleteArticle, { loading: deleteLoading, data: deleteData, error: deleteError }] = useMutation(DELETE_ARTICLE);

  const [deletionPendingArticleId, setDeletionPendingArticleId] = useState<null | string>(null);

  useGraphQLErrorDisplay(getError);

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteArticle) {
      refetch();
      enqueueSnackbar('Actualité supprimée.', {
        preventDuplicate: true,
      });
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'actualité a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const handleDeletion = useCallback(() => {
    if (deletionPendingArticleId) {
      deleteArticle({
        variables: {
          articleId: parseInt(deletionPendingArticleId, 10),
        },
      });
      setDeletionPendingArticleId(null);
    }
  }, [deletionPendingArticleId]);

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10));
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <AdminPageLayout authorizedRoles={['admin']}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{mb: { xs: 3, md: 1 }}}>
        <Typography color="secondary" variant="h2">
          Liste des actualités
        </Typography>

        <Button component={Link} href="/admin/news/add" variant="contained" size="small">
          Ajouter une nouvelle actualité
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="center" sx={{ width: '20%' }}>
                Date de création
              </TableCell>
              <TableCell align="center" sx={{ width: '20%' }}>
                Date de modification
              </TableCell>
              <TableCell align="center" sx={{ width: '10%' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.articles.map((article) => (
                <TableRow key={article.id} hover>
                  <TableCell component="th" scope="row">
                    <Link href={`/article/${article.id}`}>{article.label}</Link>
                  </TableCell>
                  <TableCell align="center">{formatDate(article.createdAt)}</TableCell>
                  <TableCell align="center">{formatDate(article.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" component={Link} href={`/admin/news/${article.id}`}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => setDeletionPendingArticleId(article.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deletionPendingArticleId !== null}
        onClose={() => setDeletionPendingArticleId(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Êtes-vous sûr(e) de vouloir supprimer cette actualité ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Une fois supprimée, cette actualité sera définitivement supprimée. Elle ne sera plus visible sur notre
            plateforme, ni pour vous, ni pour les visiteurs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletionPendingArticleId(null)} color="primary" variant="contained">
            Annuler
          </Button>
          <Button onClick={() => handleDeletion()} variant="outlined" color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </AdminPageLayout>
  );
};

export default withApollo()(ArticleAdminPage);
