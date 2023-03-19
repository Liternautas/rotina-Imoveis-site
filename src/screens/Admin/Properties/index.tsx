import { CardAdmin } from "@/src/components/Cards/CardAdmin";
import { IProperty } from "@/src/interfaces";
import { FilterListOutlined, Search } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, IconButton, InputBase, Pagination, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";

interface Props {
    properties: IProperty[];
}

export function Properties({ properties }: Props) {
    const [page, setPage] = useState(1);
    const router = useRouter();
    const GlobalStyles = createGlobalStyle`
        body {
            overflow-y: auto !important;
        }
    `

    return (
        <Container>
            <GlobalStyles />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Código do imóvel"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton sx={{ p: '10px' }} aria-label="directions">
                        <FilterListOutlined />
                    </IconButton>
                </Paper>
                <Button
                    variant="contained"
                    onClick={() => router.push('/admin/properties/create')}
                    sx={{ color: '#fff', fontWeight: 600 }}
                >
                    Cadastrar
                </Button>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {properties?.map(property => (
                    <Grid item xs={12} sm={6} md={4}>
                        <CardAdmin property={property}/>
                    </Grid>
                ))
                }
            </Grid>
            <Stack spacing={2} sx={{ mt: 3 }}>
                <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={(e, page) => setPage(page)} />
            </Stack>
        </Container>
    )
}