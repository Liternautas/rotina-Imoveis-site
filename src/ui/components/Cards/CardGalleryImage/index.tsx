import { getImageUrl } from "@/src/helpers/functions";
import { Delete, DeleteOutline, Download } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { DialogIcon } from "../../DialogIcon";
import { Container } from "./styles";
import { downloadFile, downloadFileToPath } from "@/src/helpers/file";

interface Props {
    path: string;
    handleRemove: (path: string) => Promise<void>;
}

export function CardGalleryImage({ path, handleRemove }: Props) {
    return (
        <Container>
            <IconButton sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: '#00000050',
                backdropFilter: 'blur(24px)'
            }}>
                <DialogIcon
                    title="Remover imagem"
                    description="Deseja mesmo remover essa imagem?"
                    onSubmit={() => handleRemove(path)}
                >
                    <DeleteOutline sx={{color: "#fff"}}/>
                </DialogIcon>
            </IconButton>
            <IconButton sx={{
                position: 'absolute',
                top: 76,
                left: 12,
                background: '#00000050',
                backdropFilter: 'blur(24px)'
            }}>
                <DialogIcon
                    title="Baixar imagem"
                    description="Deseja mesmo baixar essa imagem?"
                    onSubmit={() => downloadFileToPath(path)}
                >
                    <Download sx={{color: "#fff"}}/>
                </DialogIcon>
            </IconButton>
            <img src={getImageUrl(path)} />
        </Container>
    )
}