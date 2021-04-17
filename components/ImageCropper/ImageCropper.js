import React, { useCallback, useState } from 'react';
import { Grid, Modal } from '@material-ui/core';
import Image from 'material-ui-image';
import Cropper from 'react-easy-crop';
import Typography from '@material-ui/core/Typography';
// import ImgDialog from './ImgDialog'
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styles from './styles.module.css';
import getCroppedImg from './cropImage';

// const dogImg =
//   'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

const useStyles = makeStyles((theme) => ({
  popup: {
    padding: '4em',
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: '200',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: '2em',
    background: 'white',
  },
  cropImage: {
    align: 'center',
    height: '300px!important',
    width: 'inherit!important',
  },
}));

const ImageCropper = ({
  src,
  open,
  onClose,
  classes,
  croppedImg,
  updateKeyIndicator,
  id,
}) => {
  const [crop, setCrop] = useState(croppedImg.crop);
  const [rotation, setRotation] = useState(croppedImg.rotation);
  const [zoom, setZoom] = useState(croppedImg.zoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(croppedImg.img);

  const styles = useStyles();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const CONTAINER_HEIGHT = 300;
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation,
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, src]);

  const saveCroppedImage = () => {
    updateKeyIndicator(id, 'croppedImg', {
      crop,
      rotation,
      zoom,
      file: croppedImage.file,
      img: croppedImage.url,
      modified: true,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.popup}>
      {/* <Modal.Content> */}

      <div>
        <div className={styles.cropContainer}>
          <Grid>
            <Grid item xs={8}>
              <Cropper
                image={src}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 3}
                // cropSize={{width:1024,height:768}}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onMediaLoaded={(mediaSize) => {
                  // Adapt zoom based on media size to fit max height
                  // setZoom(CONTAINER_HEIGHT / mediaSize.naturalHeight)
                  // console.log(mediaSize);
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={styles.controls}>
          <Grid container>
            <Grid item xs={3}>
              <div className={styles.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: styles.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ container: styles.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={styles.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: styles.sliderLabel }}
                >
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  classes={{ container: styles.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: styles.cropButton }}
              >
                Visualiser
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={saveCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: styles.cropButton }}
                disabled={!croppedImage.url}
              >
                Sauvegarder
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {croppedImage.url && (
                <Image
                  src={croppedImage ? croppedImage.url : null}
                  className={styles.cropImage}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      {/* </div> */}

      {/* <div>

                <ImgDialog img={croppedImage} onClose={onClose} />
                </div> */}
      {/* </Modal.Content>         */}
    </Modal>
  );
};

const StyledImageCropper = withStyles(styles)(ImageCropper);
export default StyledImageCropper;
