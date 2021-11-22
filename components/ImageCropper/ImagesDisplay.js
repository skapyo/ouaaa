import React, { useCallback, useState } from 'react';
import { Grid, Card } from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import ImageCropper from 'components/ImageCropper/ImageCropper';
import DeleteIcon from '@material-ui/icons/Delete';
import HeightIcon from '@material-ui/icons/Height';
import { red } from '@material-ui/core/colors';
import styles from './styles.module.css';

const ImagesDisplay = ({
  cards,
  moveCard,
  findCard,
  updateDeletedIndicator,
  updateKeyIndicator,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      // justify='center'
      spacing={3}
    >
      {cards.map((file) => (
        <ImagePrev
          id={file.id}
          key={`image${file.id}`}
          originalImg={file.img}
          moveCard={moveCard}
          findCard={findCard}
          deletedIconClickHandler={updateDeletedIndicator}
          updateKeyIndicator={updateKeyIndicator}
          deleted={file.deleted}
          file={file}
        />
      ))}
    </Grid>
  );
};
const ItemTypes = {
  PIC: 'pic',
};
const ImagePrev = ({
  file,
  originalImg,
  croppedImg,
  moveCard,
  findCard,
  id,
  deletedIconClickHandler,
  deleted,
  updateKeyIndicator,
}) => {
  const originalIndex = findCard(id).index;

  const [, drag] = useDrag({
    item: { type: ItemTypes.PIC, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  {
    /* @ts-ignore */
  }
  const [, drop] = useDrop({
    accept: ItemTypes.PIC,
    canDrop: () => false,
    // @ts-ignore
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });

  const opacity = 1;

  // gestion de la modal du cropper
  const [modalOpened, setOpenedInd] = useState(false);
  const openModal = () => {
    setOpenedInd(true);
  };

  if (deleted) return (<></>);

  return (
    <Grid item>
      <div
        className="card"
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
      >
        <Card>
          <img src={originalImg} className="image" />
        </Card>
        <Card>
          <Grid container spacing={3}>
            {/* <Grid item>
              <HeightIcon onClick={() => openModal()} />
            </Grid>*/}
            <Grid item>
              <DeleteIcon
                color={deleted ? 'secondary' : 'action'}
                onClick={() => deletedIconClickHandler(id)}
              />
            </Grid>
          </Grid>
        </Card>
      </div>
    </Grid>
  );
};

const StyledImageCropper = withStyles(styles)(ImagesDisplay);
export default StyledImageCropper;
