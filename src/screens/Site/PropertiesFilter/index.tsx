import { CardPropertyH } from "@/src/components/Cards/CardPropertyH";
import { Filter } from "@/src/components/Filter";
import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { Results } from "./styles";

export function PropertiesFilter() {
    const [page, setPage] = useState(1);
    return (
        <Box sx={{
            mt: '64px',
            pt: 3,
            minHeight: '100vh',
            background: `#fafafa`
        }}>
            <Container>
                <Grid container spacing={{ md: 3 }}>
                    <Grid item md={3.5}>
                        <Filter />
                    </Grid>
                    <Grid item md={8.5}>
                        <Results>
                            <CardPropertyH />
                            <CardPropertyH />
                            <CardPropertyH />
                        </Results>
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={(e, page) => setPage(page)} />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}