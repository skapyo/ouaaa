import React, {useState,useCallback} from 'react';
import getCroppedImg from './cropImage'
import {Modal, Grid, Segment,Image} from 'semantic-ui-react';
import Cropper from 'react-easy-crop'
import Typography from '@material-ui/core/Typography'
// import ImgDialog from './ImgDialog'
import Slider from '@material-ui/lab/Slider'
import Button from '@material-ui/core/Button'
import styles from './styles.module.css'
import { withStyles } from '@material-ui/core/styles'

// const dogImg =
//   'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

const inlineStyle = {
    modal : {
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      height:'60vh',
    }
      
};

const ImageCropper = ({src, open, onClose, classes,croppedImg,updateKeyIndicator,id}) => {

    const [crop, setCrop] = useState(croppedImg.crop)
    const [rotation, setRotation] = useState(croppedImg.rotation)
    const [zoom, setZoom] = useState(croppedImg.zoom)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(croppedImg.img)


    console.log('Crop values');
    console.log(crop);
    console.log(rotation);
    console.log(zoom);
    console.log(croppedAreaPixels);
    console.log('--Crop values--');

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }, [])
  
    const showCroppedImage = useCallback(async () => {
      try {
        const croppedImage = await getCroppedImg(
          src,
          croppedAreaPixels,
          rotation
        )
        console.log('donee', { croppedImage })
        setCroppedImage(croppedImage)
      } catch (e) {
        console.error(e)
      }
    }, [croppedAreaPixels, rotation])

    const saveCroppedImage = () => {
      updateKeyIndicator(
        id,
        "croppedImg",
        {
          crop : crop,
          rotation : rotation,
          zoom : zoom,
          file : croppedImage.file,
          img : croppedImage.url,
          modified : true
        }
      );
    
    }
      
    return(
        <Modal 
            size='fullscreen'
            open={open}
            onClose={onClose}
            style={inlineStyle.modal}
            // dimmer='inverted'
            // closeIcon
        >
            {/* <Modal.Content> */}
            <Segment>
            <Grid>
              <Grid.Row style={{height:'60vh'}}>
                <Grid.Column width='10'>

                  <div className={classes.cropContainer}>
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
                      onMediaLoaded={mediaSize => {
                        // Adapt zoom based on media size to fit max height
                        // setZoom(CONTAINER_HEIGHT / mediaSize.naturalHeight)
                        console.log(mediaSize);
                      }}
                      />
                  </div>
                </Grid.Column>
                <Grid.Column width='6'>
                  <Image src={croppedImage?croppedImage.url:null} size='big'></Image>

                </Grid.Column>
              </Grid.Row>
              <Grid.Row>

              {/* <div className={classes.controls}> */}

                <Grid.Column width='4'>
                  <div className={classes.sliderContainer}>
                      <Typography
                          variant="overline"
                          classes={{ root: classes.sliderLabel }}
                      >
                          Zoom
                      </Typography>
                      <Slider
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          classes={{ container: classes.slider }}
                          onChange={(e, zoom) => setZoom(zoom)}
                      />
                    </div>

                </Grid.Column>
                <Grid.Column width='4'>

                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        classes={{ container: classes.slider }}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                    </div>

                </Grid.Column>
                <Grid.Column width='4'>
                  <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.cropButton }}
                    >
                    Visualiser
                  </Button>
                </Grid.Column>
                <Grid.Column width='4'>
                  <Button
                    onClick={saveCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.cropButton }}
                    disabled={croppedImage?false:true}
                    >
                    Sauvegarder
                  </Button>
                </Grid.Column>

                {/* </div> */}
              </Grid.Row>
            </Grid>
            </Segment>

            {/* <div>
                
                
                <ImgDialog img={croppedImage} onClose={onClose} />
                </div> */}
            {/* </Modal.Content>         */}
        </Modal>
    )
};

const StyledImageCropper = withStyles(styles)(ImageCropper)
export default StyledImageCropper;