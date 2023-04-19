import { useProperty } from "@/src/contexts/PropertyContext";
import { Alert, Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { CardGalleryImage } from "../Cards/CardGalleryImage";
import { FormUploadImage } from "./styles";
import { useContracts } from "@/src/contexts/ContractsContext";

export function GalleryRentalContract() {
    const { images, setImages, uploadImages, orderImages, removeImage } = useContracts();

    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    const handleSort = async () => {
        let _images = [...images]
        const draggedItemContent = _images.splice(dragItem.current, 1)[0]
        _images.splice(dragOverItem.current, 0, draggedItemContent)
        dragItem.current = null
        dragOverItem.current = null
        await orderImages(_images);
        setImages(_images);
    }

    const handleUploadImage = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            uploadImages(file);
        }
    }

    const handleRemoveImage = async (path: string) => {
        await removeImage(path);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 720
        }}>
            <Box>
                <Typography sx={{ m: 0 }} variant="h6">Galeria de imagens</Typography>
                <Typography>Adicione fotos de alta qualidade!</Typography>
            </Box>
            <FormUploadImage>
                <input type="file" name="file" id="file" onChange={handleUploadImage} />
                <label htmlFor="file">Fazer upload</label>
            </FormUploadImage>
            {images.length === 0 && <Alert severity="info">Este contrato ainda não possui nenhuma imagem.</Alert>}
            {images.map((item, index) => (
                <div
                    key={index}
                    className="list-item"
                    draggable
                    onDragStart={(e) => (dragItem.current = index)}
                    onDragEnter={(e) => (dragOverItem.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}>
                    <CardGalleryImage path={item} handleRemove={handleRemoveImage} />
                </div>
            ))}
        </Box>
    )
}