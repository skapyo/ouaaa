import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const ActorDeletionModal: React.FC<Props> = ({ open, onClose, onSubmit }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Êtes-vous sûr(e) de vouloir supprimer cette page acteur ?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Une fois supprimée, cette page acteur ainsi que ses événements associées seront définitivement supprimés
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="contained">
        Annuler
      </Button>
      <Button onClick={onSubmit} variant="outlined" color="primary" autoFocus>
        Supprimer
      </Button>
    </DialogActions>
  </Dialog>
);

export default ActorDeletionModal;
