import { useState, useEffect, useRef } from "react";
import { useForm } from "@/src/hooks/useForm";
import { useSelect } from "@/src/hooks/useSelect";
import { ModalCropper } from "@/src/ui/components/modals/ModalCropper";
import Image from "next/image";
import { Container, Box, Typography, Autocomplete, TextField, Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useBanners } from "@/src/contexts/BannersContext";
import { IBannerType } from "@/src/interfaces";

export function CreateBanner({types}) {
    const {image, setImage, create} = useBanners();

    const type = useSelect();
    const name = useForm();
    const link = useForm();
    const [showCropper, setShowCropper] = useState(false);
    const [file, setFile] = useState();
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleOnChange = async (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async () => {
        await create({
            bannerType: type.value as IBannerType,
            name: name.value,
            link: link.value,
        });
    }

    useEffect(() => {
        if (file) {
            setShowCropper(true);
        }
    }, [file]);

    useEffect(() => {
        if(types) {
            console.log(types)
            type.setOptions(types);
        }
    }, [types]);

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={600}>Cadastrar banner</Typography>
            </Box>
            <Box>
                <ModalCropper
                    close={() => setShowCropper(false)}
                    image={file && URL.createObjectURL(file)}
                    show={showCropper}
                    onSubmit={(blob) => setImage(blob)}
                    height={type.value?.height ?? 300}
                    width={type.value?.width ?? 300}
                />
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3
                }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={type.options}
                        sx={{ width: 300 }}
                        value={type.value}
                        onChange={(e, value) => type.onChange(value)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Tipo" />}
                        renderOption={(props, option) => <Box component={'li'} {...props}>{option.name}</Box>}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nome"
                        variant="outlined"
                        sx={{ width: 300 }}
                        value={name.value}
                        onChange={(e) => name.onChange(e)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Link"
                        variant="outlined"
                        sx={{ width: 300 }}
                        value={link.value}
                        onChange={(e) => link.onChange(e)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2
                }}>
                    {image && <Image src={image} alt="" width={300} height={300} />}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleOnChange}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleButtonClick}
                        >
                            Selecionar foto
                        </Button>
                        {image &&
                            <IconButton onClick={() => setImage(null)}>
                                <Delete />
                            </IconButton>}
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        height: 48,
                        color: '#fff',
                        fontWeight: 600
                    }}
                    onClick={handleSubmit}
                >
                    Cadastrar banner
                </Button>
            </Box>
        </Container>
    )
}