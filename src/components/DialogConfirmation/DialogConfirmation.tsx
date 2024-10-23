import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Trash2 } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName?: string; // Nombre del elemento a borrar (opcional)
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, onClose, onConfirm, entityName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-dialog-title"
      aria-describedby="confirm-delete-dialog-description"
    >
      <DialogTitle id="confirm-delete-dialog-title">
        Confirmar Borrado
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-delete-dialog-description">
          {`¿Estás seguro que deseas borrar ${entityName ? entityName : 'este elemento'}? Esta acción no se puede deshacer.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" startIcon={<Trash2 />} autoFocus>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
