import { useProperty } from "@/src/contexts/PropertyContext";
import { Alert, Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { CardGalleryImage } from "../Cards/CardGalleryImage";
import { FormUploadImage } from "./styles";

export function Gallery() {
    const { images, setImages, uploadImages, orderImages, removeImage } = useProperty();

    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    //const handle drag sorting
    const handleSort = async () => {
        //duplicate items
        let _images = [...images]

        //remove and save the dragged item content
        const draggedItemContent = _images.splice(dragItem.current, 1)[0]

        //switch the position
        _images.splice(dragOverItem.current, 0, draggedItemContent)

        //reset the position ref
        dragItem.current = null
        dragOverItem.current = null

        //update the actual array
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
                <Typography>Uma boa galeria de imagens é a chave para mostrar todo o potencial do seu imóvel! Adicione fotos de alta qualidade e em diferentes ângulos para permitir que os interessados tenham uma visão completa do espaço. Não deixe que uma oportunidade seja perdida por falta de imagens boas - mostre todo o potencial da sua propriedade!</Typography>
            </Box>
            <FormUploadImage>
                <input type="file" name="file" id="file" onChange={handleUploadImage} />
                <label htmlFor="file">Fazer upload</label>
            </FormUploadImage>
            {images.length === 0 && <Alert severity="info">Esta propriedade ainda não possui nenhuma imagem.</Alert>}
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