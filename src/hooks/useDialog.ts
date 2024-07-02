import { useState } from "react";

export const useDialog = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  };
};
