import { useFilter } from "@/src/contexts/FilterContext";
import { IProperty } from "@/src/interfaces";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { Filter } from "@/src/ui/components/Filter";
import { Filter1Outlined, FilterAltOutlined, FilterOutlined } from "@mui/icons-material";
import { Box, Button, Container, Grid, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DrawerMobile, Results } from "./styles";
import { useRouter } from "next/router";
import { normalize } from "@/src/helpers/functions";

interface Props {
    properties: IProperty[];
    total: number;
}

export function PropertiesFilter({ properties }: Props) {
    const {results, total, page, setPage, type, adType, address} = useFilter();
    const {city, district} = address;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (page?: number) => {
        let path = `/imoveis/filter?`;
        path = path + `adType=${+adType.value.id <= 1 ? 'venda' : 'aluguel'}`;
        {type.value ? path = path + `&type=${normalize(type.value.name)}` : null}
        {city.value ? path = path + `&cityId=${city.value.id}` : null}
        {district.value ? path = path + `&districtId=${district.value.id}` : null}
        {district.value ? path = path + `&districtId=${district.value.id}` : null}
        {page ? path = path + `&page=${page}` : null}
        router.push(path);
    }

    return (
        <Box sx={{
            mt: '64px',
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Grid container spacing={{ md: 3 }}>
                    <Grid item md={3.5} sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        }
                    }}>
                        <Filter />
                    </Grid>
                    <Grid item xs={12} md={8.5} sx={{
                        mb: 2
                    }}>
                        <Box sx={{
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "#fff",
                            padding: 2,
                            borderRadius: 1,
                            boxShadow: '0 0 4px rgba(0, 0, 0, .15)',
                            mb: 3
                        }}>
                            <Typography sx={{
                                fontSize: 14,
                                fontWeight: 600
                            }}>Exibindo {total} resultados</Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    display: {
                                        xs: 'flex',
                                        md: 'none',
                                    },
                                    minWidth: 'fit-content',
                                    padding: .5
                                }}
                                onClick={() => setOpen(true)}
                            >
                                <FilterAltOutlined />
                            </Button>
                        </Box>
                        <Stack spacing={2} sx={{ my: 3 }}>
                            <Pagination count={Math.ceil(total / 15)} variant="outlined" shape="rounded" page={page} onChange={(e, page) => handleSubmit(page)} />
                        </Stack>
                        <Results>
                            {results.map(property => <CardPropertyH property={property} />)}
                        </Results>
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Pagination count={Math.ceil(total / 15)} variant="outlined" shape="rounded" page={page} onChange={(e, page) => handleSubmit(page)} />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <DrawerMobile
                anchor="left"
                variant="temporary"
                open={open}
                ModalProps={{
                    style: {
                        zIndex: 9999
                    }
                }}
                PaperProps={{
                    style: {
                        width: 300
                    }
                }}
                onClose={() => setOpen(false)}>
                <Filter />
            </DrawerMobile>
        </Box>
    )
}