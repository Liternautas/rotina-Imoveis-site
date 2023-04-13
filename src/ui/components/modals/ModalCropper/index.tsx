import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { ButtonClose, ButtonSubmit, Container, CropperContainer, Modal, ModalBody, ModalFooter, ModalHeader, Title } from "./styles";
import { Close } from "@mui/icons-material";
import getCroppedImg from "@/src/helpers/cropper";

interface Props {
    image: string;
    show: boolean;
    width?: number;
    height?: number;
    close: () => void;
    onSubmit: (blob) => void;
}

export function ModalCropper({
    image,
    close,
    show,
    onSubmit,
    height,
    width
}: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [file, setFile] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const hanldeSubmit = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            );
            setCroppedImage(croppedImage);
            onSubmit(croppedImage);
            close();
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation]);

    if(!show) return null;

    return (
        <Container>
            <Modal>
                <ModalHeader>
                    <Title></Title>
                    <ButtonClose onClick={close}>
                        <Close />
                    </ButtonClose>
                </ModalHeader>
                <ModalBody>
                    <CropperContainer>
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={(width ?? 300) / (height ?? 300)}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </CropperContainer>
                </ModalBody>
                <ModalFooter>
                    <ButtonSubmit onClick={hanldeSubmit}>Confirmar</ButtonSubmit>
                </ModalFooter>
            </Modal>
        </Container>
    )
}