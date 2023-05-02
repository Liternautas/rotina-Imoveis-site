import { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Pagination, Stack, Typography, Avatar } from "@mui/material";
import { api } from "@/src/services/api";
import useSWR from 'swr';
import CollaboratorsSection from "@/src/ui/components/Sections/CollaboratorsSection";
import { Filter } from "@/src/ui/components/Filter";
import { FilterAltOutlined } from "@mui/icons-material";
import { CardPropertyH } from "@/src/ui/components/Cards/CardPropertyH";
import { Aside, DrawerMobile, Results } from "./styles";
import { getImageUrl, normalize } from "@/src/helpers/functions";
import { ModalContact } from "@/src/ui/components/modals/ModalContact";
import { useFilter } from "@/src/contexts/FilterContext";
import { useRouter } from "next/router";
import { adTypes } from "@/src/utils/data";

export function OurTeam() {
    const realtors = useSWR('users', async () => await api.get('users').then(res => res.data));
    const { results, total, page, setPage, type, adType, address, users } = useFilter();
    const [pickup, setPickup] = useState(null);
    const { city, district } = address;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleSubmit = async (page?: number) => {
        let path = `/nossa-equipe?`;
        path = path + `adType=${+adType.value.id <= 1 ? 'venda' : 'aluguel'}`;
        { type.value ? path = path + `&type=${normalize(type.value.name)}` : null }
        { city.value ? path = path + `&cityId=${city.value.id}` : null }
        { district.value ? path = path + `&districtId=${district.value.id}` : null }
        { district.value ? path = path + `&districtId=${district.value.id}` : null }
        { page ? path = path + `&page=${page}` : null }
        router.push(path);
    }

    useEffect(() => {
        adType.onChange(adTypes[0]);
    }, []);
    
    useEffect(() => {
        const {pickup} = router.query;
        if(realtors?.data?.results) {
            setPickup(realtors?.data?.results.find(item => item.id === pickup));
            users.setOptions(realtors?.data?.results);
        }
    }, [realtors]);

    return (
        <Container sx={{
            mt: '64px',
            py: 6,
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        }}>
            <CollaboratorsSection realtors={realtors?.data?.results ?? []} />
            <Box>
                <Grid container spacing={{ md: 3 }}>
                    <Grid item md={3.5} sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        },
                        flexDirection: 'column',
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'sticky',
                                top: 88,
                                gap: 3,
                            }}
                        >
                            <Aside>
                                <Box sx={{
                                    display: "flex",
                                    gap: 1,
                                }}>
                                    <Avatar src={getImageUrl(pickup?.avatar)}>{pickup?.name.substring(0, 1)}</Avatar>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: 600
                                        }}>{pickup?.name}</Typography>
                                        <Typography sx={{
                                            fontSize: 14
                                        }}>{pickup?.email}</Typography>
                                        <Typography sx={{
                                            fontSize: 14
                                        }}>{pickup?.creci}</Typography>
                                    </Box>
                                </Box>
                                <ModalContact />
                            </Aside>
                            <Filter close={() => setOpen(false)} />
                        </Box>
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
            </Box>
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
                <Filter close={() => setOpen(false)} />
            </DrawerMobile>
        </Container>
    )
}